'use strict';

import { SQSClient } from '@aws-sdk/client-sqs';

export default new SQSClient({ region: process.env.DEPLOYED_AWS_REGION });
