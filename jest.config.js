const path = require('path');

module.exports = {
    testMatch: [
        '**/__tests__/**/*.spec.js'
    ],
    setupFiles: [
        path.join(__dirname, '__tests__', 'jest.setup.js')
    ],
    setupFilesAfterEnv: [
        path.join(__dirname, '__tests__', 'jest.setup.after.js')
    ]
};
