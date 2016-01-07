/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

const db    = require('../db'),
      mw    = require('../db/sequelize/tools/makeWhere'),
      User  = db.sequelize['User'],
      debug = require('debug')('user-persistence');

module.exports.getUser = function* (id) {
  debug(`getting user ${id}`);

  id               = Number(id);
  const cachedUser = yield db.redis.get(`/users/${id}`);
  if (cachedUser) return JSON.parse(cachedUser);

  const user = yield User.findById(id);
  if (user) yield db.redis.set(`/users/${id}`, JSON.stringify(user));

  return user;
};

module.exports.getUserList = function* (where) {
  debug(`getting user list where ${where}`);

  const param = mw(
    'phone', where.phone,
    'password', where.password
  );

  return yield User.findAll({
    where: param
  });
};

module.exports.saveUser = function* (user) {
  debug(`saving user ${user}`);

  const newUser = yield User.create(user);

  if (newUser) yield db.redis.set(`/users/${newUser.id}`, JSON.stringify(newUser));

  return newUser;
};

module.exports.delUser = function* (id) {
  log.warn(`function not implemented`);
};
