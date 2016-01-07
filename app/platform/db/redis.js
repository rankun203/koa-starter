/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

var redis  = require('redis');
var config = require('../config');

var options = {
  host     : config.redis.host,
  port     : config.redis.port,
  auth_pass: config.redis.pass
};

module.exports = require('co-redis')(redis.createClient(options));
