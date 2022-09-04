const path = require('path');

module.exports = {
    preset: 'jest-dynalite',
    testMatch: [
        '**/__tests__/**/*.spec.js'
    ],
    setupFiles: [
        path.join(__dirname, '__tests__', 'jest.setup.js')
    ]
};
