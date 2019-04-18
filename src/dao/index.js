"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const AWS = require("aws-sdk");
exports.AWS = AWS;
let awsConfig = {
    "region": 'us-east-1',
    "endpoint": 'http://dynamodb.us-east-1.amazonaws.com',
    "accessKeyId": 'AKIARSUODZUM43LMWTP4',
    "secretAccessKey": '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',
};
AWS.config.update(awsConfig);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR2hCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQVd0QixrQkFBRztBQVRaLElBQUksU0FBUyxHQUFHO0lBQ1osUUFBUSxFQUFFLFdBQVc7SUFDckIsVUFBVSxFQUFFLHlDQUF5QztJQUNyRCxhQUFhLEVBQUUsc0JBQXNCO0lBQ3JDLGlCQUFpQixFQUFFLDBDQUEwQztDQUNoRSxDQUFDO0FBRUYsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMifQ==