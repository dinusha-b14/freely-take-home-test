'use strict';

import { SNSClient } from '@aws-sdk/client-sns';

export default new SNSClient({ region: process.env.DEPLOYED_AWS_REGION });
