var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');


var index = require('./routes/index');
var credentials = require('./routes/credentials');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable CORS for all requests (not a secure setting)
app.use(cors());

app.use('/', index);
app.use('/credentials', credentials);

module.exports = app;
