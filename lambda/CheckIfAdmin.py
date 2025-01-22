import json
import boto3

# Initialize the Cognito Identity Provider client
cognito_client = boto3.client('cognito-idp')

# Your Cognito User Pool ID
USER_POOL_ID = "us-east-1_Ox3pH0c5M"  # Replace with your actual User Pool ID
ADMIN_GROUP_NAME = "Admins"

def lambda_handler(event, context):
    try:
        # Parse the JSON body from the request
        body = json.loads(event.get('body', '{}'))

        # Validate the "user_id" field
        user_id = body.get("Username")
        if not user_id:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Missing 'user_id' field"}),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "POST,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
            }

        # List groups for the user
        response = cognito_client.admin_list_groups_for_user(
            UserPoolId=USER_POOL_ID,
            Username=user_id
        )

        # Extract the groups
        groups = response.get('Groups', [])

        # Check if the user is part of the Admins group
        is_admin = any(group['GroupName'] == ADMIN_GROUP_NAME for group in groups)

        # Return the result
        return {
            "statusCode": 200,
            "body": json.dumps({"isAdmin": is_admin}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }

    except cognito_client.exceptions.UserNotFoundException:
        # Handle case where user is not found
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "User not found"}),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type,Authorization"
            }
        }
    except Exception as e:
        # Handle other exceptions
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
