/**
 * Created on 1/6/16.
 * @author rankun203
 */

exports.responseTime = require('koa-response-time');
exports.logger       = require('koa-logger');
exports.compress     = require('koa-compress');
exports.mount        = require('koa-mount');
exports.favicon      = require('koa-favicon');

exports.httpNotFound = require('./404');
exports.httpStatus = require('./http-status');
