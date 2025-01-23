import boto3
import json

# Initialize AWS services
dynamodb = boto3.resource("dynamodb")
sns_client = boto3.client("sns")

# Table and SNS topic configuration
ADS_TABLE_NAME = "Ads"
SNS_TOPIC_ARN = "arn:aws:sns:us-east-1:841616955426:EmailReport"

# Define the categories
CATEGORIES = ["רכב", "יד שניה", "נדלן", "חיות מחמד"]

def lambda_handler(event, context):
    try:
        # Reference to the Ads DynamoDB table
        ads_table = dynamodb.Table(ADS_TABLE_NAME)

        # Initialize a dictionary to count ads by category
        category_counts = {category: 0 for category in CATEGORIES}

        # Scan the table to get all ads
        response = ads_table.scan()
        items = response.get("Items", [])

        # Count ads by category
        for item in items:
            category = item.get("category")
            if category in category_counts:
                category_counts[category] += 1

        # Generate the message to be sent
        message_lines = ["דוח מספר מודעות לפי קטגוריה:"]
        for category, count in category_counts.items():
            message_lines.append(f"{category}: {count} מודעות")

        message = "\n".join(message_lines)

        # Publish the message to the SNS topic
        sns_response = sns_client.publish(
            TopicArn=SNS_TOPIC_ARN,
            Message=message,
            Subject="דוח מודעות לפי קטגוריה"
        )

        # Return a success response
        return {
            "statusCode": 200,
            "body": json.dumps(
                {"message": "Report sent successfully", "snsResponse": sns_response},
            ),
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type,Authorization"
                }
        }

    except Exception as e:
        print(f"Error: {str(e)}")
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
