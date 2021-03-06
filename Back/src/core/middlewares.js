const express = require('express');
const { DateTime } = require('luxon');
const cors = require('cors');
const jwt = require('express-jwt');
const jwtToken = require('jsonwebtoken');

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initCorsMiddlware = (app) => app.use(cors());

const initLoggerMiddlware = (app) => {
  app.use((req, res, next) => {
    const begin = new DateTime(new Date());

    res.on('finish', () => {
      const requestDate = begin.toString();
      const remoteIP = `IP: ${req.connection.remoteAddress}`;
      const httpInfo = `${req.method} ${req.baseUrl || req.path}`;

      const end = new DateTime(new Date());
      const requestDurationMs = end.diff(begin).toMillis();
      const requestDuration = `Duration: ${requestDurationMs}ms`;

      console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
    })
    next();
  });
};

exports.authMiddleware = async (req,res,next) => {
    const token = req.headers['authorization']
    
    if (!token) {
        res.status(401).send('A Token must b provided')
    } else {
        const check = await jwtToken.verify(token,process.env.JWT_SECRET)

    if (!check) {
        res.status(401).send()
    }
    next()
    }
}

exports.initializeConfigMiddlewares = (app) => {
  initJsonHandlerMiddlware(app);
  initCorsMiddlware(app);
  initLoggerMiddlware(app);
}

exports.initializeErrorMiddlwares = (app) => {
  app.use((err, req, res, next) => {
    res.status(500).send(err.message);
  });
}
