/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

const secret = require('./secret');

const config = {
  db    : {
    host    : secret.db.host,
    port    : secret.db.port,
    dialect : secret.db.dialect,
    database: secret.db.database,
    username: secret.db.username,
    password: secret.db.password
  },
  redis : {
    host: secret.redis.host,
    port: secret.redis.port,
    pass: secret.redis.pass
  },
  server: {
    port: process.env.PORT || 3000
  },
  jwt   : {
    secret          : 'ledayin-jwt-pub',
    algorithm       : 'RS256',
    expiresInMinutes: 60 * 24 * 100
  }
};

module.exports = config;
