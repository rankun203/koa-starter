/**
 * Created on 1/6/16.
 * @author rankun203
 */

const Router = require('koa-router'),
      router = new Router();

require('./users').register(router);

module.exports = router.middleware();
