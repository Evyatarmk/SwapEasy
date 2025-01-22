#!/usr/bin/env python3.9
import json
import boto3
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table("Users")

# Helper function to convert Decimal to a JSON-serializable format
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError

def lambda_handler(event, context):
    try:
        # Log the incoming event for debugging
        print("Event: ", event)

        # Parse the JSON body from the request
        body = json.loads(event.get('body', '{}'))

        # Validate the "id" field
        user_id = body.get("id")
        if not user_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'id' field"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",  # Allow any origin
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",  # Allowed methods
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"  # Allowed headers
                }
            }

        # Check if the user exists in the table
        response = table.get_item(Key={"id": user_id})
        user = response.get("Item")

        if user:
            # If the user exists, update the fields with new values
            update_expression = "SET "
            expression_attribute_values = {}
            for key, value in body.items():
                # Skip fields that cannot be updated
                if key not in ["id", "email", "myAds", "savedAd"]:
                    update_expression += f"{key} = :{key}, "
                    expression_attribute_values[f":{key}"] = value

            # Check if there are fields to update
            if not expression_attribute_values:
                return {
                    "statusCode": 400,
                    "body": json.dumps({"error": "No valid fields to update"}),
                    "headers": {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",  # Allow any origin
                        "Access-Control-Allow-Methods": "PUT,OPTIONS",  # Allowed methods
                        "Access-Control-Allow-Headers": "Content-Type,Authorization"  # Allowed headers
                    }
                }

            # Remove trailing comma and space
            update_expression = update_expression.rstrip(", ")

            # Update the user in the table
            table.update_item(
                Key={"id": user_id},
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_attribute_values
            )

            # Fetch the updated user data
            updated_user_response = table.get_item(Key={"id": user_id})
            updated_user = updated_user_response.get("Item")

            # Return success response with updated user data
            return {
                "statusCode": 200,
                "body": json.dumps({
                    "message": "User updated successfully",
                    "updatedUser": updated_user
                }, default=decimal_default),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",  # Allow any origin
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",  # Allowed methods
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"  # Allowed headers
                }
            }

        # If the user does not exist, return an error
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "User not found"}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",  # Allow any origin
                "Access-Control-Allow-Methods": "PUT,OPTIONS",  # Allowed methods
                "Access-Control-Allow-Headers": "Content-Type,Authorization"  # Allowed headers
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
                "Access-Control-Allow-Origin": "*",  # Allow any origin
                "Access-Control-Allow-Methods": "PUT,OPTIONS",  # Allowed methods
                "Access-Control-Allow-Headers": "Content-Type,Authorization"  # Allowed headers
            }
        }
