'use strict';

import * as uuid from 'uuid';
import { ValidationResult } from 'joi';
import { PutCommandOutput, QueryCommandOutput } from '@aws-sdk/lib-dynamodb';
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
};

const getAllMessageBoards = async () => {
    const { Items: messageBoards } = await dbDocClient.scan({
        TableName: process.env.MESSAGE_BOARDS_TABLE
    });

    // Should of course be paginated in real life but for this exercise I decided to go with a simple scan.
    return messageBoards;
}

export {
    registerNewMessageBoard,
    createNewMessageBoard,
    getAllMessageBoards
};
