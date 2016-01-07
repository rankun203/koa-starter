#!/usr/bin/env node

const Koa          = require('koa'),
      app          = new Koa(),
      co           = require('co'),
      cors         = require('koa-cors'),
      mount        = require('koa-mount'),
      logger       = require('koa-logger'),
      onerror      = require('koa-onerror'),
      favicon      = require('koa-favicon'),
      compress     = require('koa-compress'),
      responseTime = require('koa-response-time');

const db           = require('./platform/db'),
      config       = require('./platform/config'),
      routes       = require('./routes'),
      httpStatus   = require('./middlewares/http-status'),
      httpNotFound = require('./middlewares/404');

app.use(favicon());
app.use(logger());
app.use(responseTime());
app.use(compress());
app.use(cors());

app.use(httpStatus);

app.use(mount('/v1', routes.v1));

app.use(httpNotFound);

co(function *() {
  // Dev Only, 将代码中的 Schema 同步到数据库
  const connection = yield db.sequelize.client.sync(/*{force: true}*/);
  if (connection) {
    app.listen(config.server.port);
    console.log(`Connected to database and listening on port ${config.server.port}`);
  }
});

module.exports = app;
