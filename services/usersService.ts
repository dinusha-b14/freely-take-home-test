'use strict';

interface RegisterNewUserParameters {
    name: String,
    email: String
};

const registerNewUser = async ({ name, email }: RegisterNewUserParameters): Promise<Object> => {
    return {
        name,
        email
    };
};

export {
    registerNewUser
};
