/**
 * Created on 1/6/16.
 * @author rankun203
 */
'use strict';

const jwt            = require('koa-jwt'),
      rbac           = require('koa-rbac'),
      rules          = require('../../middlewares/rbac-rules'),
      config         = require('../../platform/config'),
      Router         = require('koa-router'),
      router         = new Router(),
      validate       = require('koa-validate'),
      CustomProvider = require('../../middlewares/rbac-provider');

// RBAC 配置信息
const rbacOptions = {
  rbac    : new rbac.RBAC({
    provider: new CustomProvider(rules)
  }),
  identity: function (ctx) {
    return ctx && ctx.state.user;
  }
};

require('./auth').register(router);

router.use(jwt(config.jwt).unless({path: [/^\/\w*\/auth/]})); // \w 是为了匹配 /v1
router.use(rbac(rbacOptions));
router.use(validate());

require('./users').register(router);

module.exports = router.middleware();
