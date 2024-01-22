const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();
let requestCount = 0;

function countMiddleware(req, res, next){
  requestCount += 1;
  next();
}

// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// maintain a count of the number of requests made to the server in the global
// requestCount variable

app.get('/user', countMiddleware,function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user',countMiddleware ,function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/requestCount', countMiddleware,function(req, res) {
  res.status(200).json({ requestCount });
});

module.exports = app;