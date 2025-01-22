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
table = dynamodb.Table(TABLE_NAME)

# Helper function to validate Base64
def is_valid_base64(data):
    try:
        base64.b64decode(data, validate=True)
        return True
    except Exception:
        return False

# Helper function to convert Decimal to JSON-serializable format
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def lambda_handler(event, context):
    try:
        # Log the incoming event
        print("Event: ", event)

        if event.get("httpMethod", "").upper() != "POST":
            return {
                "statusCode": 405,
                "body": json.dumps({"error": "Method not allowed"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Parse the JSON body
        body = json.loads(event.get('body', '{}'))

        # Validate and decode images
        images = body.get('images', [])
        if not isinstance(images, list):
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "'images' must be a list"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Process images
        image_urls = []
        for image_data in images:
            if image_data.startswith("http://") or image_data.startswith("https://"):
                image_urls.append(image_data)
            else:
                image = image_data[image_data.find(",") + 1:]
                if not is_valid_base64(image):
                    return {
                        "statusCode": 400,
                        "body": json.dumps({"error": "Invalid base64 image"}),
                        "headers": {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "POST,OPTIONS",
                            "Access-Control-Allow-Headers": "Content-Type,Authorization"
                        }
                    }
                file_name = f"{uuid.uuid4()}.jpg"
                s3.put_object(
                    Bucket=BUCKET_NAME,
                    Key=file_name,
                    Body=base64.b64decode(image),
                    ContentType="image/jpeg",
                    ACL="public-read"
                )
                image_urls.append(f"https://{BUCKET_NAME}.s3.amazonaws.com/{file_name}")

        # Create a new ad
        new_id = str(uuid.uuid4())
        item = {
            "id": new_id,
            "title": body.get('title'),
            "price": Decimal(body.get('price', 0)),
            "category": body.get('category', 'Uncategorized'),
            "description": body.get('description', ''),
            "images": image_urls,
            "condition": body.get('condition', 'Unknown'),
            "city": body.get('city', ''),
            "street": body.get('street', ''),
            "houseNumber": body.get('houseNumber', 0),
            "sellerContact": body.get('sellerContact', ''),
            "sellerName": body.get('sellerName', '')
        }
        table.put_item(Item=item)

        # Update user's MYADS
        user_id = body.get('userId')
        if user_id:
            users_table.update_item(
                Key={"id": user_id},
                UpdateExpression="SET myAds = list_append(if_not_exists(myAds, :empty_list), :new_ad_id)",
                ExpressionAttributeValues={
                    ":new_ad_id": [new_id],
                    ":empty_list": []
                }
            )

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
