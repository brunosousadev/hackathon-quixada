import json
import request

def lambda_handler(event, context):
    
    url = 'ec2-54-167-213-131.compute-1.amazonaws.com'
    response = request.post(url)
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

