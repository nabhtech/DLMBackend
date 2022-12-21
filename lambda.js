'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')
const { leaderBoard } = require('./controllers/studentTestController');
const server = awsServerlessExpress.createServer(app)

exports.getLeaderboard = async (event, context, callback) => {
    const leaderboard = await leaderBoard(event)

    const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
            leaderboard: leaderboard
        }),
      };
     
      awsServerlessExpress.proxy(server, event, context)
      callback(null, response);
}

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)