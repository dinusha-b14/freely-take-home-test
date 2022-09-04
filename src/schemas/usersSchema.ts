'use strict';

import * as Joi from 'joi';

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

export {
    createUserSchema
};
