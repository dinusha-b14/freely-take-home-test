'use strict';

import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';

interface RegisterNewUserParameters {
    name: String,
    email: String
};

const registerNewUser = async ({ name, email }: RegisterNewUserParameters): Promise<Object> => {
    const dynamoDb = new DynamoDB.DocumentClient();
    const dbParams = {
        TableName: process.env.USERS_TABLE,
        Item: {
            userId: uuid.v4(),
            name,
            email
        }
    };

    return dynamoDb.put(dbParams).promise();
};

export {
    registerNewUser
};
