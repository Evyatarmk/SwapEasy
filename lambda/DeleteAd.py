import json
import boto3
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

        # Parse the JSON body from the request
        body = json.loads(event.get('body', '{}'))
        ad_id = body.get('id')

        if not ad_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "'id' field is required"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Get the ad details from DynamoDB
        response = table.get_item(Key={"id": ad_id})
        item = response.get('Item')

        if not item:
            return {
                "statusCode": 404,
                "body": json.dumps({"error": "Ad not found"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Delete images from S3
        images = item.get('images', [])
        for image_url in images:
            try:
                # Extract the file name from the URL
                file_name = image_url.split("/")[-1]
                s3.delete_object(Bucket=BUCKET_NAME, Key=file_name)
            except Exception as s3_error:
                print(f"Error deleting image {image_url}: {s3_error}")

        # Delete the ad from DynamoDB
        table.delete_item(Key={"id": ad_id})

        # Return success response
        return {
            "statusCode": 200,
            "body": json.dumps(
                {"message": "Ad deleted successfully", "deletedAd": item},
                default=decimal_default
            ),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "DELETE,OPTIONS",
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
                "Access-Control-Allow-Methods": "DELETE,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }
