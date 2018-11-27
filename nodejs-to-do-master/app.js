// Execute the mongoDB file to create, define the collections and connect to the database
require('./api/config/mongoDB');

var express = require('express');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
var compression = require('compression');
var bodyParser = require('body-parser');
var routes = require('./api/routes');
var config = require('./api/config');

var app = express();

// Set the secret of the app that will be used in authentication
app.set('secret', config.SECRET);

// Middleware to log all of the requests that comes to the server
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Middleware to allow requests from any frontend that is not hosted on the same machine as the server's
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);

// Middleware to protect the server against common known security vulnerabilities
app.use(helmet());

// Middleware to compress the server json responses to be smaller in size
app.use(compression());

/* 
  Middleware to parse the request body that is in format "application/json" or
  "application/x-www-form-urlencoded" as json and make it available as a key on the req 
  object as req.body
*/
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

/*
  Middleware to match the request with one of our defined routes to do a certain function,
  All requests should have /api before writing the route as a convention for api servers
*/
app.use('/api', routes);

/* 
  Middleware to handle any (404 Not Found) error that may occur if the request didn't find
  a matching route on our server, or the requested data could not be found in the database
*/
app.use(function(req, res) {
  res.status(404).json({
    err: null,
    msg: '404 Not Found',
    data: null
  });
});

// Middleware to handle any (500 Internal server error) that may occur while doing database related functions
app.use(function(err, req, res, next) {
  res.status(500).json({
    // Never leak the stack trace of the err if running in production mode
    err: process.env.NODE_ENV === 'production' ? null : err,
    msg: '500 Internal Server Error',
    data: null
  });
});

module.exports = app;
