/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

module.exports = {
  db   : {
    host    : 'localhost',
    port    : '3306',
    dialect : 'mysql',
    database: 'ledayin',
    username: 'youdar',
    password: 'syncpass0'
  },
  redis: {
    host: 'localhost',
    port: '6379',
    pass: 'syncpass0'
  }
};
