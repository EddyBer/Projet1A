const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/router/user.routes');
const tachesRoutes = require('../controllers/router/taches.route')
const { sequelize } = require('../models/db');

class WebServer {
  app = undefined;
  port = 5500;
  server = undefined;

  constructor() {
    this.app = express();
    this.syncDb();

    initializeConfigMiddlewares(this.app);
    this._initializeRoutes();
    initializeErrorMiddlwares(this.app);
  }

  async syncDb() {
    await sequelize.sync();
  }

  start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  stop() {
    this.server.close();
  }

  _initializeRoutes() {
    this.app.use('/', userRoutes.initializeRoutes());
    this.app.use('/taches', tachesRoutes.initializeRoutesTaches());
  }
}

module.exports = WebServer;