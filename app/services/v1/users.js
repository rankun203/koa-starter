/**
 * Created on 1/6/16.
 * @author rankun203
 */

const platform = require('../../platform'),
      parse    = require('co-body');

const get = exports.get = function* (next) {
  const id   = this.params.id,
        user = yield platform.users.getUser(id);

  if (!user) return this.throw(404, 'No user found');
  this.body = user;
};

const list = exports.list = function* (next) {
  const where = this.params;
  this.body   = yield platform.users.getUserList(where);
};

const create = exports.create = function* (next) {
  const body = yield parse(this);
  this.body  = yield platform.users.saveUser(body);
};

module.exports.register = function (router) {
  router.get('/users', list);
  router.get('/users/:id', get);
  router.post('/users', create);
};
