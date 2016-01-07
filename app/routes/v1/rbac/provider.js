/**
 * Created on 1/7/16.
 *
 * see {@link https://www.npmjs.com/package/rbac-a|rbac-a npm} for more information
 *
 * @author rankun203
 */
'use strict';

const Provider = require('rbac-a').Provider;

class CustomProvider extends Provider {

  getRoles(user) {
    return {
      'user': null
    }; // TODO: 1/7/16 实现
  }

  getPermissions(role) {
    return ['read', 'create']; // TODO: 1/7/16 实现
  }

  getAttributes(role) {
    return []; // TODO: 1/7/16 实现
  }

}

module.exports = CustomProvider;
