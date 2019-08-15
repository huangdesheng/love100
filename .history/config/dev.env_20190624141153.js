'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://tonyleung.natapp1.cc"'
  // BASE_API: '"http://192.168.18.128:8080/"',
  // BASE_API: 'http://love100,qxiao.net'
});
