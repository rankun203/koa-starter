#!/usr/bin/env node

const Koa        = require('koa'),
      app        = new Koa(),
      views      = require('koa-views'),
      co         = require('co'),
      json       = require('koa-json'),
      onerror    = require('koa-onerror'),
      bodyparser = require('koa-bodyparser')();

const config     = require('./platform/config'),
      db         = require('./platform/db'),
      middleware = require('./middlewares'),
      services   = require('./services');

app.use(middleware.favicon());
app.use(middleware.logger());
app.use(middleware.responseTime());
app.use(middleware.compress());

app.use(middleware.mount('/v1', services.v1));

co(function *() {
  var connection = yield db.sequelize.client.sync();
  if (connection) {
    app.listen(config.server.port);
    console.log(`Connected to database and listening on port ${config.server.port}`);
  }
});

module.exports = app;
