/**
 * Created on 1/7/16.
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
