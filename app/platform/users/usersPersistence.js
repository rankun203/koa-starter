/**
 * Created on 1/6/16.
 * @author rankun203
 */

var db    = require('../db');
var User  = db.sequelize['User'];
var debug = require('debug')('userPersistence');

module.exports.getUser = function* (id) {
  debug(`getting user ${id}`);

  id               = Number(id);
  const cachedUser = yield db.redis.get(`/users/${id}`);
  if (cachedUser) return JSON.parse(cachedUser);

  const user = yield User.find(id);
  if (user) yield db.redis.set(`/users/${id}`, JSON.stringify(user));

  return user;
};

module.exports.getUserList = function* (where) {
  debug(`getting user list where ${where}`);

  return yield User.findAll({
    where: where
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
