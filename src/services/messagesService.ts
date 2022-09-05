'use strict';

import * as uuid from 'uuid';
import { ValidationResult } from 'joi';
import { PublishCommand, PublishCommandOutput } from '@aws-sdk/client-sns';
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import FreelyError from '../errors/freelyError';
import dbDocClient from '../config/dbDocClient';
import snsClient from '../config/snsClient';
import { createMessageSchema } from '../schemas/messagesSchema';

interface NewMessageParameters {
    messageBoardId: string,
    userId: string,
    messageText: string
};

const registerMessage = ({ messageBoardId, userId, messageText }: NewMessageParameters): Promise<PutCommandOutput> => dbDocClient.put({
    TableName: process.env.MESSAGES_TABLE,
    Item: {
        messageBoardId,
        userAndMessageId: `${userId}#${uuid.v4()}`,
        messageText
    }
});

const createNewMessage = (createNewMessageParameters: NewMessageParameters): Promise<PublishCommandOutput> => {
    const { value, error }: ValidationResult = createMessageSchema.validate(createNewMessageParameters);

    if (error) {
        throw new FreelyError(400, JSON.stringify(error.details));
    }

    return snsClient.send(new PublishCommand({
        Message: JSON.stringify(value),
        TopicArn: process.env.MESSAGE_REGISTRATIONS_SNS_TOPIC_ARN
    }));
};

export {
    registerMessage,
    createNewMessage
};
