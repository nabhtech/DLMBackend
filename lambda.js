'use strict'
const awsServerlessExpress = require('aws-serverless-express')
// const serverless= require('serverless-http')
const app = require('./app')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)
// exports.handler = serverless(app)