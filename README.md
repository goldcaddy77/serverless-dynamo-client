# serverless-dynamo-client

[![serverless](https://img.shields.io/badge/serverless-1.0-dda415.svg)](http://www.serverless.com)
[![npm version](https://img.shields.io/npm/v/serverless-dynamo-client.svg)](https://www.npmjs.org/package/serverless-dynamo-client)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-dbb30b.svg)](https://standardjs.com)

## AWS DynamoDB client

This is a wrapper around the official AWS.DynamoDB SDK that:

- Plays nicely with [serverless-offline](https://github.com/dherault/serverless-offline) by providing sane defaults based on `IS_OFFLINE` environment variable.
- Looks for AWS region in configurable environment variable (details below)

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
npm install --save serverless-dynamo-client
```

## Usage

```javascript
var dynamo = require('serverless-dynamo-client')

const client = dynamo.getClient({
  envPrefix: 'AWS_DDB',
  maxRetries: 3
})

const docClient = dynamo.getDocumentClient({
  convertEmptyValues: true
})
```

## API

### Shared [options]

The following options are shared between the two methods below.

* `envPrefix` {string} if this is set, DDB will look for config in environment variables prefixed by `envPrefix`.
* `region` {string} if not set, DDB will look in `${envPrefix}_REGION`.  If `envPrefix` is not set, it looks at 
  `AWS_REGION`.  If still not found, when in `serverless-offline` mode, it will fall back to `localhost`
* `endpoint` {string} if in `serverless-offline` mode, this defaults to `http://localhost:8000`
* `sslEnabled` {boolean} defaults to `true`, if in `serverless-offline` mode, it is set to false

### getClient([options])

* `options` {Object - shared options above or [AWS.DynamoDB standard options](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#constructor-property)}

### Method: dynamo.getClient

Creates an `AWS.DynamoDB` with provided options.

```javascript
var dynamo = require('serverless-dynamo-client')

const docClient = dynamo.getClient({
  envPrefix: 'AWS_DDB',
  maxRetries: 3
})
```

### getDocumentClient([options])

* `options` {Object - shared options above or [AWS.DynamoDB.DocumentClient standard options](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#constructor-property)}

### Method: dynamo.getDocumentClient

Creates an `AWS.DynamoDB.DocumentClient` with provided options.

```javascript
var dynamo = require('serverless-dynamo-client')

const docClient = dynamo.getDocumentClient({
  convertEmptyValues: true
})
```

## Contribute

PRs accepted.  Note that code uses [standard](https://github.com/feross/standard) styling.

## License

MIT © Dan Caddigan
