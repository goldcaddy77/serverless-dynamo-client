'use strict'

const test = require('ava')

test('region is required', function (t) {
  const error = t.throws(() => {
    getOptionsWithEnv()
  }, TypeError)

  t.is(error.message, 'region is required')
})

test('region is taken from options if available', function (t) {
  const env = {
    AWS_REGION: 'aws_region',
    AWS_DDB_REGION: 'aws_ddb_region'
  }

  const options = getOptionsWithEnv(env, {region: 'option_region'})

  t.is(options.region, 'option_region')
})

test('region is taken from AWS_REGION by default', function (t) {
  const env = {
    AWS_REGION: 'aws_region'
  }

  const options = getOptionsWithEnv(env)

  t.is(options.region, 'aws_region')
})

test('region prefers envPrefix variable', function (t) {
  const env = {
    AWS_REGION: 'aws_region',
    AWS_DDB_REGION: 'aws_ddb_region'
  }

  const options = getOptionsWithEnv(env, {envPrefix: 'AWS_DDB'})

  t.is(options.region, 'aws_ddb_region')
})

test('region defaulted in offline mode', function (t) {
  const env = {
    IS_OFFLINE: true
  }

  const options = getOptionsWithEnv(env)

  t.is(options.region, 'localhost')
})

test('endpoint defaulted in offline mode', function (t) {
  const env = {
    IS_OFFLINE: true
  }

  const options = getOptionsWithEnv(env)

  t.is(options.endpoint, 'http://localhost:8000')
})

test('sslEnabled defaulted in offline mode', function (t) {
  const env = {
    IS_OFFLINE: true
  }

  const options = getOptionsWithEnv(env)

  t.is(options.sslEnabled, false)
})

function getOptionsWithEnv (env, options) {
  process.env = env || {}
  options = options || {}

  return require('./index').getOptions(options)
}
