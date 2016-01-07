/**
 * Created on 1/6/16.
 * @author rankun203
 */

const log      = require('log4js').getLogger('auth'),
      jwt      = require('koa-jwt'),
      parse    = require('co-body'),
      config   = require('../../platform/config'),
      platform = require('../../platform');

const register = exports.register = function* () {
  log.debug('register');

  const body = this.request.body = yield parse(this);

  this.checkBody('phone').len(11, 11, '手机号有误');
  this.checkBody('password').len(6, 24, '密码格式不正确, 6 - 24位');
  if (this.errors) return this.throw(400, {msg: this.errors});

  this.body = yield platform.users.saveUser(body);
};

/**
 * 登录用户, 使用 jwt 签名
 */
const login = exports.login = function* () {
  log.debug('login');

  const body     = yield parse(this),
        phone    = body.phone,
        password = body.password;

  const foundUserList = yield platform.users.getUserList({
    phone   : phone,
    password: password
  });

  if (!foundUserList || foundUserList.length === 0) return this.throw(404, 'No user found');

  const user = foundUserList[0].toJSON({scope: 'ANY'});

  const jwtUser = {
    id   : user.id,
    phone: user.phone,
    name : user.name,
    role : user.role
  };

  user.token = jwt.sign(jwtUser, config.jwt.secret, config.jwt.expiresInMinutes);
  this.body  = user;
};

module.exports.register = function (router) {
  router.post('/auth/register', register);
  router.post('/auth/login', login);
};
