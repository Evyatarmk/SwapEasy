import json
import boto3
import base64
import uuid
from decimal import Decimal

# Initialize AWS services
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

# Replace with your S3 bucket name and DynamoDB table names
BUCKET_NAME = "swap-easy-images"
ADS_TABLE_NAME = "Ads"
USERS_TABLE_NAME = "Users"

# DynamoDB table references
ads_table = dynamodb.Table(ADS_TABLE_NAME)
users_table = dynamodb.Table(USERS_TABLE_NAME)

# Helper function to convert Decimal to JSON-serializable format
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def lambda_handler(event, context):
    try:
        # Log the incoming event
        print("Event: ", event)

        # Parse the JSON body from the request
        body = json.loads(event.get('body', '{}'))

        # Extract the ad ID and user ID
        ad_id = body.get("id")
        user_id = body.get("userId")

        if not ad_id or not user_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'id' or 'userId' field for PUT request"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Check if the user exists and if the ad belongs to them
        user_response = users_table.get_item(Key={"id": user_id})
        user = user_response.get("Item")
        if not user:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "User not found"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Check if the ad ID exists in the user's "MyAds" array
        my_ads = user.get("myAds", [])
        if ad_id not in my_ads:
            return {
                "statusCode": 403,
                "body": json.dumps({"error": "You are not authorized to update this ad"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Validate and process images
        images = body.get('images', [])
        if not isinstance(images, list):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "'images' field must be a list"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Process images: upload only base64 images to S3
        image_urls = []
        for image_data in images:
            if image_data.startswith("https") or image_data.startswith("http"):
                # Keep the existing URL
                image_urls.append(image_data)
            else:
                # Process base64 image
                try:
                    image = image_data[image_data.find(",") + 1:]  # get the image data from input
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

        # Check if the ad exists
        existing_item = ads_table.get_item(Key={"id": ad_id}).get("Item")
        if not existing_item:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Ad not found"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Prepare the updated item
        updated_item = {
            "id": ad_id,
            "title": body.get('title', existing_item.get("title")),
            "price": Decimal(body.get('price', existing_item.get("price", 0))),
            "category": body.get('category', existing_item.get("category", 'ללא קטגוריה')),
            "description": body.get('description', existing_item.get("description", '')),
            "images": image_urls or existing_item.get("images", []),
            "condition": body.get('condition', existing_item.get("condition", 'לא רלוואנטי')),
            "city": body.get('city', existing_item.get("city", '')),
            "street": body.get('street', existing_item.get("street", '')),
            "houseNumber": body.get('houseNumber', existing_item.get("houseNumber", 0)),
            "sellerContact": body.get('sellerContact', existing_item.get("sellerContact", '')),
            "sellerName": body.get('sellerName', existing_item.get("sellerName", ''))
        }

        # Update the item in the DynamoDB table
        ads_table.put_item(Item=updated_item)

        # Return success response
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Ad updated successfully", "item": updated_item}, default=decimal_default),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PUT,OPTIONS",
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
                "Access-Control-Allow-Methods": "PUT,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }
