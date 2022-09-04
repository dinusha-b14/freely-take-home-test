'use strict';

const uuid = require('uuid');
const { GetItemCommand } = require('@aws-sdk/client-dynamodb');
const { registerNewUser } = require('../../dist/services/usersService');
const { dbClient } = require('../../dist/config/dbClient');

beforeEach(() => {
    jest.resetAllMocks();
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('registerNewUser', () => {
    it('creates a new user in the database with the name and email provided', async () => {
        uuid.v4.mockReturnValue('71174767-cb39-47c4-9765-a95d161a63e7');

        await registerNewUser({ name: 'Amy Santiago', email: 'amy.santiago@theninenine.com' });

        const getItemCommand = new GetItemCommand({
            TableName: process.env.USERS_TABLE,
            Key: { userId: '71174767-cb39-47c4-9765-a95d161a63e7' }
        });

        const { Item: createdUser } = await dbClient.send(getItemCommand);

        expect(createdUser).toEqual({
            userId: '71174767-cb39-47c4-9765-a95d161a63e7',
            name: 'Amy Santiago',
            email: 'amy.santiago@theninenine.com'
        });
    });
});
