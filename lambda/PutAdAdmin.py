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

# DynamoDB table reference
table = dynamodb.Table(TABLE_NAME)

# Helper function to convert Decimal to JSON-serializable format
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError


def lambda_handler(event, context):
    try:
        # Log the incoming event
        print("Event: ", event)

        # Extract user group information from Cognito claims
        user_groups = event.get("requestContext", {}).get("authorizer", {}).get("claims", {}).get("cognito:groups", "")
        if "Admins" not in user_groups.split(","):
            return {
                "statusCode": 403,
                "body": json.dumps({"error": "User is not authorized to update ads"}),
                 "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PUT,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"}
            }

        # Parse the JSON body from the request
        body = json.loads(event.get('body', '{}'))

        # Extract the ID from the body (required for PUT)
        ad_id = body.get("id")
        if not ad_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'id' field for the request"}),
                   "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PUT,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"}
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
                "Access-Control-Allow-Headers": "Content-Type,Authorization"}
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
                    image = image_data[image_data.find(",") + 1:]  # Extract base64 content
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
                "Access-Control-Allow-Headers": "Content-Type,Authorization"}
                    }

        # Check if the item exists
        existing_item = table.get_item(Key={"id": ad_id}).get("Item")
        if not existing_item:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Ad not found"})
            }

        # Prepare the updated item
        updated_item = {
            "id": ad_id,
            "title": body.get('title', existing_item.get("title")),
            "price": Decimal(body.get('price', existing_item.get("price", 0))),
            "category": body.get('category', existing_item.get("category", 'Uncategorized')),
            "description": body.get('description', existing_item.get("description", '')),
            "images": image_urls or existing_item.get("images", []),
            "condition": body.get('condition', existing_item.get("condition", 'N/A')),
            "city": body.get('city', existing_item.get("city", '')),
            "street": body.get('street', existing_item.get("street", '')),
            "houseNumber": body.get('houseNumber', existing_item.get("houseNumber", 0)),
            "sellerContact": body.get('sellerContact', existing_item.get("sellerContact", '')),
            "sellerName": body.get('sellerName', existing_item.get("sellerName", ''))
        }

        # Update the item in the DynamoDB table
        table.put_item(Item=updated_item)

        # Return success response
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Ad updated successfully", "item": updated_item}, default=decimal_default),
               "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PUT,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"}
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
                "Access-Control-Allow-Headers": "Content-Type,Authorization"}
        }
