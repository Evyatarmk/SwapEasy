import json
import boto3
from decimal import Decimal

# Initialize DynamoDB resource
dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table("Users")

# Helper function to convert Decimal to a JSON-serializable format
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

        # Validate the required fields
        user_id = body.get("userId")
        ad_id = body.get("adId")

        if not user_id or not ad_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'userId' or 'adId'"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "PUT,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # Get the user from the DynamoDB table
        response = users_table.get_item(Key={"id": user_id})
        user = response.get("Item")

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

        # Check and update the 'savedAds' array
        saved_ads = user.get("savedAds", [])
        if ad_id in saved_ads:
            # Remove the ad if it exists
            updated_saved_ads = [ad for ad in saved_ads if ad != ad_id]
        else:
            # Add the ad if it doesn't exist
            updated_saved_ads = saved_ads + [ad_id]

        # Update the user's 'savedAds' in the DynamoDB table
        users_table.update_item(
            Key={"id": user_id},
            UpdateExpression="SET savedAds = :updated_saved_ads",
            ExpressionAttributeValues={":updated_saved_ads": updated_saved_ads}
        )

        # Update the user object to return
        user["savedAds"] = updated_saved_ads

        # Return the updated user object
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "User updated successfully", "user": user}, default=decimal_default),
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
