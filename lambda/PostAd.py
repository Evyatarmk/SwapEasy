import json
import boto3
import base64
import uuid
from decimal import Decimal

# Initialize AWS services
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

# Replace with your S3 bucket name and DynamoDB table name
BUCKET_NAME = "swap-easy-images"
TABLE_NAME = "Ads"
users_table = dynamodb.Table("Users")

# DynamoDB table reference
table = dynamodb.Table(TABLE_NAME)

# Helper function to convert Decimal to JSON-serializable format
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

# Helper function to get the next ID
def get_next_id():
    try:
        # Scan the entire table and get the IDs
        response = table.scan(ProjectionExpression="id")
        items = response.get("Items", [])
        # Find the highest current ID
        max_id = max([item["id"] for item in items], default=0)  # Default to 0 if no items
        return max_id + 1
    except Exception as e:
        print("Error while scanning for max id: ", str(e))
        return 1  # Return 1 if there's an error or no items

def lambda_handler(event, context):
    try:
        # Log the incoming event
        print("Event: ", event)

        # Parse the JSON body from the request
        body = json.loads(event.get('body', '{}'))

        # Validate and decode images
        images = body.get('images', [])
        if not isinstance(images, list):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "'images' field must be a list of base64-encoded strings"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

          # Process images: upload only base64 images to S3
        image_urls = []
        for image_data in images:
            if image_data.startswith("http://") or image_data.startswith("https://"):
                # Keep the existing URL
                image_urls.append(image_data)
            else:
                # Validate and decode base64 image
                image = image_data[image_data.find(",") + 1:]  # Extract base64 content
                if not is_valid_base64(image):
                    return {
                        "statusCode": 400,
                        "body": json.dumps({"error": f"Invalid base64-encoded image: {image_data[:30]}..."}),  # Show a snippet of the invalid image
                        "headers": {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "PUT,OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type,Authorization"
                        }
                    }
                try:
                    image_bytes = base64.b64decode(image)
                    file_name = f"{uuid.uuid4()}.jpg"
                    s3.put_object(
                        Bucket=BUCKET_NAME,
                        Key=file_name,
                        Body=image_bytes,
                        ContentType="image/jpeg",
                        ACL="public-read"
                    )
                    image_url = f"https://{BUCKET_NAME}.s3.us-east-1.amazonaws.com/{file_name}"
                    image_urls.append(image_url)
                except Exception as img_error:
                    print(f"Error uploading image: {img_error}")
                    return {
                        "statusCode": 500,
                        "body": json.dumps({"error": f"Failed to upload image: {str(img_error)}"}),  
                        "headers": {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "PUT,OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type,Authorization"
                        }
                    }

        # Get the next available ID for the ad
        new_id = str(uuid.uuid4())

        # Prepare the item to save in the DynamoDB table
        item = {
            "id": new_id,
            "title": body.get('title'),
            "price": Decimal(body.get('price', 0)),
            "category": body.get('category', 'ללא קטגוריה'),
            "description": body.get('description', ''),
            "images": image_urls,
            "condition": body.get('condition', 'לא רלוואנטי'),
            "city": body.get('city', ''),
            "street": body.get('street', ''),
            "houseNumber": body.get('houseNumber', 0),
            "sellerContact": body.get('sellerContact', ''),
            "sellerName": body.get('sellerName', '')
        }

        # Save the item to the DynamoDB table
        table.put_item(Item=item)

       # Update the user's MYADS array in the Users table
        user_id = body.get('userId')  # Assuming the userId is provided in the request body
        if user_id:
            try:
                users_table.update_item(
                    Key={"id": user_id},  # Assuming 'id' is the partition key for Users table
                    UpdateExpression="SET myAds = list_append(if_not_exists(myAds, :empty_list), :new_ad_id)",
                    ExpressionAttributeValues={
                        ":new_ad_id": [new_id],
                        ":empty_list": []
                    }
                )
            except Exception as user_update_error:
                print(f"Error updating user's MYADS: {user_update_error}")
                return {
                    "statusCode": 500,
                    "body": json.dumps({"error": f"Failed to update user's MYADS: {str(user_update_error)}"}), 
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST,OPTIONS",
                        "Access-Control-Allow-Headers": "Content-Type,Authorization"
                    }
                }
        # Return success response
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Ad created successfully", "item": item}, default=decimal_default),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }

    except Exception as e:
        # Handle and log exceptions
        print("Error: ", str(e))
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }