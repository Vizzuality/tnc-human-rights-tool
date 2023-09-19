require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { PORT = 8443 } = process.env;

// create express app
const app = express();

// set cors and json boday parser middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logger function (optional for dev)
app.use(morgan('dev'));

app.get('/v1', (req, res, next) => {
  res.status(200).json({ msg: 'Human Rights Screening Tool API Version 1' });
});

// all api routes go through here
const router = require('./router/router.js');
app.use('/v1', router);

// error handling *********************************************************************
// to prevent the get favicon error
app.get('/favicon.ico', (req, res) => res.status(204));
// if a user makes request to a route that doesnt exist, they will be directed here (Catch all route)
app.use((req, res, next) => {
  const error = new Error('Resource Not Found.');
  error.status = 500;
  next(error);
});

// everytime an error is thrown throughout the app, it will run through this middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log({ error: error.message });
  res.json({ error: error.message });
});

module.exports = app;

// app.listen(PORT, () =>
//   console.log(`Listening on PORT: http://localhost:${PORT}`)
// );
