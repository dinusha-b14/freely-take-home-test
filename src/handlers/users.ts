'use strict';

import * as usersService from '../services/usersService';

const registerUser = async (event, _context) => {
    const [{ Sns: { Message: snsMessage }}] = event.Records;
    const { name, email } = JSON.parse(snsMessage);

    try {
        await usersService.registerNewUser({ name, email });
    } catch (err) {
        console.log(err);
    }
};

const createUser = async (event, _context) => {
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

export {
    registerUser,
    createUser
};
