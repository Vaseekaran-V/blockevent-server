import * as dotenv from "dotenv";
dotenv.config();


const AWS = require("aws-sdk");

let awsConfig = {
    "region": 'us-east-1',
    "endpoint": 'http://dynamodb.us-east-1.amazonaws.com',
    "accessKeyId": 'AKIARSUODZUM43LMWTP4',
    "secretAccessKey": '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',
};

AWS.config.update(awsConfig);

export { AWS };