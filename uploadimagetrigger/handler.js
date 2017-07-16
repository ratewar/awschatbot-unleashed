'use strict';

/*var AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "bidimagemaster";*/

module.exports.s3UploadTriggered = (event, context, callback) => {

  var bucket = event.Records[0].s3.bucket.name;
  var filename = event.Records[0].s3.object.key;
  var UniqueRef = filename.substring(0,filename.indexOf("%24"));
  const response = {message: 'A new file Named' + filename + ' was uploaded to the bucket ' + bucket + ' with unique ref ' + UniqueRef,event};
  console.log('A new file named:'+filename +' was created' + ' and the unique ref is ' + UniqueRef);
  callback(null, response);
};
