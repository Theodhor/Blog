// 3rd-party packages
const express = require('express');
// IMPORTANT - used for getting form data from the client
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const errorHandler = require('./lib/errorHandler');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); // add bluebird promises to mongoose

// create the app
const app = express();
// { dbURI: 'mongodb://localhost:27017/classic-cocktails' }
const { port, dbURI } = require('./config/environment');

// connect to the database
mongoose.connect(dbURI);

// use 3rd-party packages -- app.use()
app.use(express.static(`${__dirname}/public`));

// add body-parser BEFORE the routes
app.use(bodyParser.json()); // set up to handle JSON

// routes
app.use('/api', routes);


// add custom error handler AFTER routes
app.use(errorHandler);

// listen for incoming traffic -- app.listen()
app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
