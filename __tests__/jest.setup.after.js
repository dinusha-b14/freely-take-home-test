const { startDb, stopDb, createTables, deleteTables } = require('jest-dynalite');

beforeAll(startDb);

beforeEach(createTables);

afterEach(deleteTables);

afterAll(stopDb);
