'use strict';

import { APIGatewayEvent, Context, SNSEvent } from 'aws-lambda';
import * as messagesService from '../services/messagesService';

const registerMessage = async (event: SNSEvent, _context: Context) => {
    const [{ Sns: { Message: snsMessage }}] = event.Records;

    try {
        await messagesService.registerMessage(JSON.parse(snsMessage));
    } catch (err) {
        console.log(err);
    }
};

const createMessage = async (event: APIGatewayEvent, _context: Context) => {
    try {
        const { userId, messageText } = JSON.parse(event.body);
        const { messageBoardId } = event.pathParameters;

        await messagesService.createNewMessage({ messageBoardId, userId, messageText });

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

export {
    registerMessage,
    createMessage
};
