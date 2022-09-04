'use strict';

import * as uuid from 'uuid';
import { ValidationResult } from 'joi';
import { PutItemCommand, PutItemOutput } from '@aws-sdk/client-dynamodb';
import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns';
import FreelyError from '../errors/freelyError';
import dbClient from '../config/dbClient';
import snsClient from '../config/snsClient';
import { createUserSchema } from '../schemas/usersSchema';

interface NewUserParameters {
    name: string,
    email: string
};

const registerNewUser = ({ name, email }: NewUserParameters): Promise<PutItemOutput> => {
    const dbParams = {
        TableName: process.env.USERS_TABLE,
        Item: {
            userId: { S: uuid.v4() },
            name: { S: name },
            email: { S: email }
        }
    };
    
    return dbClient.send(new PutItemCommand(dbParams));
};

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

export {
    registerNewUser,
    createNewUser
};
