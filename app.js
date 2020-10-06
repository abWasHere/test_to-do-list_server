var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();

var indexRouter = require('./routes/index');

var app = express();

// frontend access to server
const cors = require("cors");
const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };
app.use(cors(corsOptions));

// base config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

module.exports = app;
