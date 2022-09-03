'use strict';

import * as usersService from '../services/usersService';

const registerUser = async (event, _context) => {
    const [{ Sns: { Message: snsMessage }}] = event.Records;
    console.log(snsMessage);
    const { name, email } = JSON.parse(snsMessage);
    console.log(`name: ${name}`);
    console.log(`email: ${email}`);

    const registeredUser = await usersService.registerNewUser({ name, email });
    console.log(`registeredUser: ${JSON.stringify(registeredUser)}`);
};

export {
    registerUser
};
