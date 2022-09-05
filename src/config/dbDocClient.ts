'use strict';

import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import dbClient from './dbClient';

export default DynamoDBDocument.from(dbClient);
