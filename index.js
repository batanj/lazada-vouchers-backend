const express = require('express');
const { configure } = require('./startup/config');
const app = express();

console.log("Loading startup files...");

console.log("Initializing routes...");
require('./startup/routes')(app, express);

console.log("Setting configuration...");
const config = require('./startup/config');
config.configure();

console.log("Connecting to database...");
require('./startup/database')();

let port = process.env.PORT;
if (!port)
    port = 5000;

const listener = app.listen(port, () => console.log(`Listening on port ${listener.address().port}...`));