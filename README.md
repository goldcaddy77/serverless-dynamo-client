# serverless-dynamo-client

This is a wrapper around the official AWS.DynamoDB SDK that:

- Plays nicely with `serverless-offline`
- Looks for the AWS region in the AWS_REGION environment variable
- Uses `debug` (key `serverless-dynamo-client`) to log out the config passed to AWS.DynamoDB