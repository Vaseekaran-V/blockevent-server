import * as dotenv from "dotenv";
dotenv.config();


const AWS = require("aws-sdk");

let awsConfig = {
    "region": process.env.AWS_REGION,
    "endpoint": process.env.AWS_ENDPOINT,
    "accessKeyId": process.env.AWS_ACCESSKEYID,
    "secretAccessKey":process.env.AWS_SECRETACCESSKEY,
};

AWS.config.update(awsConfig);

export { AWS };