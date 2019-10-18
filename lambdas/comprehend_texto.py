import json
import boto3

s3 = boto3.client('s3')
comprehend = boto3.client('comprehend')

def lambda_handler(event, context):
    # recupera informações do arquivo
    object_name = event['Records'][0]['s3']['object']['key']
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    print("Arquivo %s adicionado em %s" % (object_name, bucket_name))
    
    jobNameComprehend = object_name.split('.')[0]
    jobUri = "s3://" + bucket_name + "/" + object_name
    outputBucket = "compreendetexto"
    print("jobUri: %s, outputBucket: %s, jobNameComprehend: %s" % (jobUri, outputBucket, jobNameComprehend))
    
    with open('/tmp/temp.json', 'wb') as f:
        s3.download_fileobj(bucket_name, object_name, f)
    f.close
    
    with open('/tmp/temp.json', 'r') as f:
        transcription = json.load(f)
        text = transcription['results']['transcripts'][0]['transcript']
    
    entidades = comprehend.detect_entities(
        Text = text,
        LanguageCode='pt'
    )
    print("Entities: %s" % entidades)
    
    output = open('/tmp/summary.output', 'w')
    output.write('Entities: %s' % entidades)
    output.close()
    
    s3.upload_file('/tmp/summary.output', outputBucket, "comprehend.txt")
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

