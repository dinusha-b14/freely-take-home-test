'use strict';

import * as Joi from 'joi';

const messageBoardsSchema = Joi.object({
    topic: Joi.string().required()
});

export {
    messageBoardsSchema
};
