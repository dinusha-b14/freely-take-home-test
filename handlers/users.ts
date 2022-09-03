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

export {
    registerUser
};
