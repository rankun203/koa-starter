/**
 * Created on 1/7/16.
 *
 * see {@link https://www.npmjs.com/package/rbac-a|rbac-a npm} for more information
 *
 * @author rankun203
 */
'use strict';

const Provider = require('rbac-a').Provider;

module.exports = class CustomProvider extends Provider {

  constructor(rules) {
    super();
    this._rules = rules || {};
  }

  getRoles(user) {
    const rules = this._rules || {};
    const cache = {};

    return (function collect(roles, userRoles, depth) {
      for (let i = 0, iLen = roles.length; i < iLen; ++i) {
        cache[roles[i]] = cache[roles[i]] || depth;
      }

      for (let i = 0, iLen = roles.length; i < iLen; ++i) {
        if (cache[roles[i]] >= depth) {
          let role = rules['roles'] && rules['roles'][roles[i]];

          if (role) {
            if (Array.isArray(role['inherited'])) {
              userRoles[roles[i]] = collect(role['inherited'], {}, depth + 1);
            } else {
              userRoles[roles[i]] = null;
            }
          }
        }
      }

      return userRoles;
    })(user.role && JSON.parse(user.role) || [], {}, 1);
  }

  getPermissions(role) {
    return this._rules
      && this._rules['roles']
      && this._rules['roles'][role]
      && this._rules['roles'][role]['permissions'] || [];
  }

  getAttributes(role) {
    return this._rules
      && this._rules['roles']
      && this._rules['roles'][role]
      && this._rules['roles'][role]['attributes'] || [];
  }

};
