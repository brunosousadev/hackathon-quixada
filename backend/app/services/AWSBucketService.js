// Load the SDK and UUID
const AWS = require("aws-sdk");
const uuid = require("uuid");

AWS.config.apiVersions = {
  s3: "2006-03-01"
  // other service API versions
};

let s3 = new AWS.S3();

// var bucketName = 'node-sdk-sample-8ab6c65b-586e-41ff-9d74-a8c336dd3212';
// Create name for uploaded object key
// var keyName = 'hello_world.json';

// Create a promise on S3 service object
// var bucketPromise = s3.createBucket({Bucket: bucketName}).promise();

// // Handle promise fulfilled/rejected states
// bucketPromise.then(
//   function(data) {
//     // Create params for putObject call
//     var objectParams = {Bucket: bucketName, Key: keyName, Body: '{ \"hello\": \"Hello World!\" }'};
//     var getObjectParams = { Bucket: bucketName, Key: keyName };
//     // Create object upload promise
//     var uploadPromise = s3.putObject(objectParams).promise();

//     uploadPromise.then(
//       function(data) {
//         console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//         s3.getObject(getObjectParams, function(err, data) {
//           if (err) console.log(err, err.stack); // an error occurred
//           else {
//             // console.log(typeof data.Body)
//             // console.log(hex2a(data.Body));           // successful response);
//             console.log(JSON.parse(data.Body.toString()).hello);
//           }
//       });
//     });

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
    await s3.putObject(params).promise();
  }
}

module.exports = AWSBucketService;
