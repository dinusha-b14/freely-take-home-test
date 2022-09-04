'use strict';

import * as uuid from 'uuid';
import { dbClient } from '../config/dbClient';

interface RegisterNewUserParameters {
    name: String,
    email: String
};

const registerNewUser = ({ name, email }: RegisterNewUserParameters) => {
    const dbParams = {
        TableName: process.env.USERS_TABLE,
        Item: {
            userId: uuid.v4(),
            name,
            email
        }
    };

    return dbClient.put(dbParams).promise();
};

export {
    registerNewUser
};
