#!/usr/bin/env node

const Koa     = require('koa'),
      app     = new Koa(),
      co      = require('co'),
      cors    = require('koa-cors'),
      onerror = require('koa-onerror');

const config     = require('./platform/config'),
      db         = require('./platform/db'),
      middleware = require('./middlewares'),
      services   = require('./services');

const all = compose([
  middleware.favicon,
  middleware.logger,
  middleware.responseTime,
  middleware.compress,
  middleware.httpStatus,
  cors()
]);

app.use(all);

app.use(middleware.mount('/v1', services.v1));

app.use(middleware.httpNotFound);

co(function *() {
  var connection = yield db.sequelize.client.sync();
  if (connection) {
    app.listen(config.server.port);
    console.log(`Connected to database and listening on port ${config.server.port}`);
  }
});

module.exports = app;
