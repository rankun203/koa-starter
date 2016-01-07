/**
 * Created on 1/7/16.
 * see {@link https://www.npmjs.com/package/rbac-a#adding-attributes|RBAC-A Adding attributes}
 * for more information about Adding attributes on roles
 * @author rankun203
 */
'use strict';

module.exports = {
  roles: {
    'guest'   : {
      permissions: ['foo']
    },
    'reader'  : {
      permissions: ['read'],
      inherited  : ['guest']
    },
    'writer'  : {
      permissions: ['create'],
      inherited  : ['reader']
    },
    'editor'  : {
      permissions: ['update'],
      inherited  : ['reader']
    },
    'director': {
      permissions: ['delete'],
      inherited  : ['editor']
    },
    'admin'   : {
      permissions: ['manage']
    }
  }
};
