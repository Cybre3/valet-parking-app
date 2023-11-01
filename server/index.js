require('dotenv').config();
const config = require('config');
const express = require('express');
const Winston = require('winston');

const app = express();

require('./startup/logging')(app);
require('./startup/cors')(app);
require('./startup/config')();
require('./startup/db')(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => Winston.info(`Listening on port ${port}...`));

// module.exports = server;