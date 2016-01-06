var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = {
    Hello: 'World'
  };
});

module.exports = router;
