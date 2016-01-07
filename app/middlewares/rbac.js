/**
 * Created on 1/7/16.
 * @author rankun203
 */

const log   = require('log4js').getLogger('middlewares/rbac'),
      rbac  = require('koa-rbac'),
      rules = require('./rbac-rules');

const options = {
  rbac: new rbac.RBAC({
    provider: new rbac.RBAC.providers.JsonProvider(rules)
  })
  // identity: function (ctx) { ... }
};

function validate(useRbacMiddleware, identity, validateionMiddleware, status, accept) {
  const app = koa();
  var rbac;

  if (identity) {
    app.use(function * (next) {
      this.user = identity;
      yield next;
    });
  }

  if (useRbacMiddleware) {
    app.use(middleware(useRbacMiddleware));
  }
  if (Array.isArray(validateionMiddleware)) {
    validateionMiddleware.forEach(function (middleware) {
      app.use(middleware);
    });
  } else {
    app.use(validateionMiddleware);
  }

  app.use(function* () {
    this.status = 200;
  });

  return new Promise(function (resolve, reject) {
    const error = new Error();

    request(app.listen())
      .get('/')
      .set('Accept', accept)
      .expect(status, function (err, res) {
        if (err) {
          error.message = err.message;
          reject(error);
        } else {
          resolve();
        }
      });
  });
}

module.exports = function* rbac(next) {
  if (this.req.url.indexOf('/auth') === 0) return yield next;

  log.log('rbac.js');
  yield next;
};
