import json
import boto3
import time

s3 = boto3.client('s3')
transcribe = boto3.client('transcribe')

def lambda_handler(event, context):
    # Informações do arquivo adicionar no bucket
    objectName = event['Records'][0]['s3']['object']['key']
    bucketName = event['Records'][0]['s3']['bucket']['name']
    print("O arquivo %s foi adicionado no bucket %s" % (objectName, bucketName))

    # Fazendo o transcribe
    jobNameTranscribe = objectName.split('.')[0] + str(time.time()).split('.')[0]
    jobUri = "s3://" + bucketName + "/" + objectName
    outputBucket = "transcricaoaudiosvoo"
    print("jobUri: %s, outputBucket: %s" % (jobUri, outputBucket))

    print("Creating Transcrition Job %s" % jobNameTranscribe)
    transcribe.start_transcription_job(
      TranscriptionJobName=jobNameTranscribe,
      Media={'MediaFileUri': jobUri},
      MediaFormat='mp3',
      OutputBucketName = outputBucket,
      LanguageCode='pt-BR'
    )

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
