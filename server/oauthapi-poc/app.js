var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');


var index = require('./routes/index');
var credentials = require('./routes/credentials');
var implicitGrant = require("./routes/implicitgrant");
var protected = require('./routes/protected');


var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Enable CORS for all requests (not a secure setting)
app.use(cors());

app.use('/', index);
app.use('/credentials', credentials);
app.use('/implicitgrant', implicitGrant);
app.use('/protected', protected);

module.exports = app;
