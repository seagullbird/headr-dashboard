'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // Minikube apigateway Service address
  BASE_API: '"http://192.168.96.151:30308"',
  BASE_URL: '"http://localhost:9528"'
})
