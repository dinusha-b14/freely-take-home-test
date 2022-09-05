'use strict';

import { APIGatewayEvent, Context, SQSEvent } from 'aws-lambda';
import * as messageBoardsService from '../services/messageBoardsService';

const registerMessageBoard = async (event: SQSEvent, _context: Context) => {
    const [{ body: messageBoardAttributes }] = event.Records;
    const { topic } = JSON.parse(messageBoardAttributes);

    try {
        await messageBoardsService.registerNewMessageBoard({ topic });
    } catch (err) {
        console.log(err);
    }
};

const createMessageBoard = async (event: APIGatewayEvent, _context: Context) => {
    try {
        const { topic } = JSON.parse(event.body);

        await messageBoardsService.createNewMessageBoard({ topic });

        return {
            statusCode: 201
        };
    } catch (err) {
        const { statusCode, message } = err;
        switch(statusCode) {
            case 400:
                return { statusCode: 400, body: message };
            default:
                return { statusCode: 500, body: message };
        }
    }
};

const getMessageBoards = async (_event: APIGatewayEvent, _context: Context) => {
    try {
        const messageBoards = await messageBoardsService.getAllMessageBoards();

        return {
            statusCode: 200,
            body: JSON.stringify(messageBoards)
        };
    } catch (err) {
        return { statusCode: 500, body: err.message };
    }
};

export {
    registerMessageBoard,
    createMessageBoard,
    getMessageBoards
};
