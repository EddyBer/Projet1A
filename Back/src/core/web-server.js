const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const userRoutes = require('../controllers/router/user.routes');
const personneRoutes = require('../controllers/router/personne.route');
const rencontresRoutes = require('../controllers/router/rencontres.router');
const partagesRoutes = require('../controllers/router/partages.route');
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
    this.app.use('/personne', personneRoutes.initializeRoutesPersonne());
    this.app.use('/rencontre', rencontresRoutes.initializeRoutesRencontre());
    this.app.use('/partage', partagesRoutes.initializeRoutesPartage());
  }
}

module.exports = WebServer;