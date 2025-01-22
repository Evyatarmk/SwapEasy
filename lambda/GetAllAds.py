import json
import boto3
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')

# DynamoDB table reference
TABLE_NAME = "Ads"  # Replace with your actual Ads table name
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

        # Check if the method is GET
        if event.get("httpMethod", "").upper() != "GET":
            return {
                "statusCode": 405,
                "body": json.dumps({"error": "Method not allowed"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Fetch all ads from the DynamoDB table
        response = table.scan()
        ads = response.get("Items", [])

        # Return the ads in the response
        return {
            "statusCode": 200,
            "body": json.dumps({"ads": ads}, default=decimal_default),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,OPTIONS",
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
                "Access-Control-Allow-Methods": "GET,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }
