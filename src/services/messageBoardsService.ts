'use strict';

import * as uuid from 'uuid';
import { ValidationResult } from 'joi';
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { SendMessageCommand, SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import FreelyError from '../errors/freelyError';
import dbDocClient from '../config/dbDocClient';
import sqsClient from '../config/sqsClient';
import { messageBoardsSchema } from '../schemas/messageBoardsSchema';

interface NewMessageBoardParameters {
    topic: string
};

const registerNewMessageBoard = ({ topic }: NewMessageBoardParameters): Promise<PutCommandOutput> => dbDocClient.put({
    TableName: process.env.MESSAGE_BOARDS_TABLE,
    Item: {
        messageBoardId: uuid.v4(),
        topic
    }
});

const createNewMessageBoard = ({ topic }: NewMessageBoardParameters): Promise<SendMessageCommandOutput> => {
    const { value, error }: ValidationResult = messageBoardsSchema.validate({ topic });

    if (error) {
        throw new FreelyError(400, JSON.stringify(error.details));
    }

    return sqsClient.send(new SendMessageCommand({
        MessageBody: JSON.stringify(value),
        QueueUrl: process.env.SQS_MESSAGE_BOARD_URL
    }));
}

export {
    registerNewMessageBoard,
    createNewMessageBoard
};
