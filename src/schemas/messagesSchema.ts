'use strict';

import * as Joi from 'joi';

const createMessageSchema = Joi.object({
    messageBoardId: Joi.string().required(),
    userId: Joi.string().required(),
    messageText: Joi.string().required()
});

export {
    createMessageSchema
};
