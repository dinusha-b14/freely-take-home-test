module.exports = {
    tables: [
        {
            TableName: 'usersTable',
            KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
            AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
            ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 }
        }
    ],
    basePort: 8000
};
