/**
 * Created on 1/6/16.
 * @author rankun203
 */

const jwt      = require('koa-jwt'),
      rbac     = require('../../middlewares/rbac'),
      config   = require('../../platform/config'),
      Router   = require('koa-router'),
      router   = new Router(),
      validate = require('koa-validate');

require('./auth').register(router);

router.use(rbac);
router.use(validate());
router.use(jwt(config.jwt).unless({path: [/^\/\w*\/auth/]})); // \w 是为了匹配 /v1

require('./users').register(router);

module.exports = router.middleware();
