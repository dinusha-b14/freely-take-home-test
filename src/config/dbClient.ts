'use strict';

import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dbClient = new DocumentClient({
    ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        convertEmptyValues: true,
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: 'local'
    })
});

export {
    dbClient
};
