require('dotenv').config();
const WebServer = require('./Back/src/core/web-server');

const webServer = new WebServer();
webServer.start();
