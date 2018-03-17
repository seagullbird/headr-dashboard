'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://67125b45-891c-4939-bc5c-78e36ffd16d0.mock.pstmn.io"',
  BASE_URL: '"http://localhost:9528"'
})
