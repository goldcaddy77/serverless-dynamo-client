'use strict'

const AWS = require('aws-sdk')
const debug = require('debug')('serverless-dynamo-client')

module.exports = {
  getClient: getClient,
  getDocumentClient: getDocumentClient,
  getOptions: getOptions
}

function getClient (options) {
  return new AWS.DynamoDB(getOptions(options))
}

function getDocumentClient (options) {
  return new AWS.DynamoDB.DocumentClient(getOptions(options))
}

function getOptions (options) {
  options = options || {}

  // serverless-offline will set IS_OFFLINE based on whether we're offline
  const devMode = Boolean(process.env.IS_OFFLINE)
  const defaultOptions = devMode
    ? {endpoint: 'http://localhost:8000', region: 'localhost', sslEnabled: false}
    : {sslEnabled: true}

  const prefix = options.envPrefix || 'AWS'
  const envOptions = process.env[`${prefix}_REGION`] ? {region: process.env[`${prefix}_REGION`]} : {}
  const result = Object.assign(
    {},
    defaultOptions,
    envOptions,
    options
  )

  debug('options: ', result)

  if (!result.region) { throw new TypeError('region is required') }

  return result
}
