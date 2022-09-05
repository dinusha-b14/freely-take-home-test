'use strict';

import * as uuid from 'uuid';
import { ValidationResult } from 'joi';
import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns';
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import FreelyError from '../errors/freelyError';
import dbDocClient from '../config/dbDocClient';
import snsClient from '../config/snsClient';
import { createUserSchema } from '../schemas/usersSchema';

interface NewUserParameters {
    name: string,
    email: string
};

interface GetUserParameters {
    email: string
};

const registerNewUser = ({ name, email }: NewUserParameters): Promise<PutCommandOutput> => dbDocClient.put({
    TableName: process.env.USERS_TABLE,
    Item: {
        userId: uuid.v4(),
        name,
        email
    }
});

const createNewUser = ({ name, email }: NewUserParameters): Promise<PublishCommandOutput> => {
    const { value, error }: ValidationResult = createUserSchema.validate({ name, email });

    if (error) {
        throw new FreelyError(400, JSON.stringify(error.details));
    }

    return snsClient.send(new PublishCommand({
        Message: JSON.stringify(value),
        TopicArn: process.env.SNS_TOPIC_ARN
    }));
};

const getUsersByEmail = async ({ email }: GetUserParameters) => {
    const { Items: [userForEmail] } = await dbDocClient.query({
        TableName: process.env.USERS_TABLE,
        IndexName: 'UserEmailIndex',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': email
        }
    });

    if (!userForEmail) {
        throw new FreelyError(404, 'User not found for email');
    }

    return userForEmail;
};

export {
    registerNewUser,
    createNewUser,
    getUsersByEmail
};
