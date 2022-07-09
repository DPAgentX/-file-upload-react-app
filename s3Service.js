const { S3 } = require('aws-sdk');
require('dotenv').config();
var AWS = require("aws-sdk");
AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        // console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log('connected to amazon s3');
    }
});
exports.s3Upload = async (file) => {
    const s3 = new S3();
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${file.originalname}`,
        Body: file.buffer
    }
    return await s3.upload(param).promise();
}