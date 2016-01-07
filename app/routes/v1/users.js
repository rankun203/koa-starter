/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

const log      = require('log4js').getLogger('routes/users'),
      rbac     = require('koa-rbac'),
      parse    = require('co-body'),
      platform = require('../../platform');

const get = exports.get = function* (next) {
  const id   = this.params.id,
        user = yield platform.users.getUser(id);

  if (!user) return this.throw(404, 'No user found');
  this.body = user;
};

const list = exports.list = function* (next) {
  const where = this.params;

  this.body = yield platform.users.getUserList(where);
};

const create = exports.create = function* (next) {
  const body = yield parse(this);
  this.body  = yield platform.users.saveUser(body);
};

module.exports.register = function (router) {
  router.get('/users', rbac.allow(['read']), list);
  router.get('/users/:id', rbac.allow(['read']), get);
  router.post('/users', rbac.allow(['create']), create);
};
