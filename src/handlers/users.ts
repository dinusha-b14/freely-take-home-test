'use strict';

import * as usersService from '../services/usersService';
import { APIGatewayEvent, Context, SNSEvent } from 'aws-lambda';

const registerUser = async (event: SNSEvent, _context: Context) => {
    const [{ Sns: { Message: snsMessage }}] = event.Records;
    const { name, email } = JSON.parse(snsMessage);

    try {
        await usersService.registerNewUser({ name, email });
    } catch (err) {
        console.log(err);
    }
};

const createUser = async (event: APIGatewayEvent, _context: Context) => {
    try {
        const { name, email } = JSON.parse(event.body);

        await usersService.createNewUser({ name, email });

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

const getUser = async (event: APIGatewayEvent, _context: Context) => {
    try {
        const { email } = event.queryStringParameters;

        const userForEmail = await usersService.getUsersByEmail({ email });

        return {
            statusCode: 200,
            body: JSON.stringify(userForEmail)
        };
    } catch (err) {
        const { statusCode, message } = err;
        switch(statusCode) {
            case 404:
                return { statusCode: 404, body: message };
            default:
                return { statusCode: 500, body: message };
        }
    }
};

export {
    registerUser,
    createUser,
    getUser
};
