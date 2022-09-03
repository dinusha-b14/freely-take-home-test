'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewUser = void 0;
const aws_sdk_1 = require("aws-sdk");
const uuid = require("uuid");
;
const registerNewUser = ({ name, email }) => __awaiter(void 0, void 0, void 0, function* () {
    const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
    const dbParams = {
        TableName: process.env.USERS_TABLE,
        Item: {
            userId: uuid.v4(),
            name,
            email
        }
    };
    return dynamoDb.put(dbParams).promise();
});
exports.registerNewUser = registerNewUser;
