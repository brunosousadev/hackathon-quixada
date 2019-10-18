// Load the SDK and UUID
const AWS = require("aws-sdk");


AWS.config.apiVersions = {
  s3: "2006-03-01"
  // other service API versions
};

let s3 = new AWS.S3();

class AWSBucketService {
  async createBucket(bucketName) {
    await s3.createBucket({ Bucket: bucketName }).promise();
  }

  async sendTextFileToBucket(bucketName, fileName, fileContent) {
    await s3
      .putObject({
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
      })
      .promise();
  }

  async getTextFileFromBucket(bucketName, fileName, callback) {
    await s3.getObject(
      {
        Bucket: bucketName,
        Key: fileName
      },
      function(err, data) {
        if (err) callback(null);
        else callback(JSON.parse(data.Body.toString()));
      }
    );
  }

  async sendAudioFileToBucket(bucketName, fileName, audioFile) {
    var params = {
      Bucket: bucketName,
      Key: fileName,
      Body: audioFile,
      ACL: "private",
      ContentType: "audio/wav"
    };
    return await s3.putObject(params).promise();
  }
}

module.exports = AWSBucketService;
