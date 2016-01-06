/**
 * Created on 1/7/16.
 * @author rankun203
 */

const platform = require('../../../platform');
/**
 * Directly from fnakstad
 * https://github.com/fnakstad/angular-client-side-auth/blob/master/client/js/routingConfig.js
 */

const config   = {

  /* List all the roles you wish to use in the app
   * You have a max of 31 before the bit shift pushes the accompanying integer out of
   * the memory footprint for an integer
   */
  roles: [
    'public',
    'user',
    'coordinator',
    'admin',
    'super'
  ],

  /*
   Build out all the access levels you want referencing the roles listed above
   You can use the "*" symbol to represent access to all roles
   */
  accessLevels: {
    'public': '*',
    'anon'  : ['public', 'user', 'coordinator', 'admin', 'super'],
    'user'  : ['user', 'coordinator', 'admin', 'super'],
    'master': ['coordinator', 'admin', 'super'],
    'admin' : ['admin', 'super'],
    'super' : ['super']
  }

};

/*
 Method to build a distinct bit mask for each role
 It starts off with "1" and shifts the bit to the left for each element in the
 roles array parameter
 */
function buildRoles(roles) {

  var bitMask   = "01";
  var userRoles = {};

  for (var role in roles) {
    var intCode            = parseInt(bitMask, 2);
    userRoles[roles[role]] = {
      bitMask: intCode,
      title  : roles[role]
    };
    bitMask                = (intCode << 1).toString(2);
  }

  return userRoles;
}

/*
 This method builds access level bit masks based on the accessLevelDeclaration parameter which must
 contain an array for each access level containing the allowed user roles.
 */
function buildAccessLevels(accessLevelDeclarations, userRoles) {

  var accessLevels = {},
      resultBitMask,
      role;
  for (var level in accessLevelDeclarations) {

    if (typeof accessLevelDeclarations[level] === 'string') {
      if (accessLevelDeclarations[level] === '*') {

        resultBitMask = '';

        for (role in userRoles) {
          resultBitMask += "1";
        }
        //accessLevels[level] = parseInt(resultBitMask, 2);
        accessLevels[level] = {
          bitMask: parseInt(resultBitMask, 2),
          title  : accessLevelDeclarations[level]
        };
      }
      else {
        console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
      }
    }
    else {

      resultBitMask = 0;
      for (role in accessLevelDeclarations[level]) {
        if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
          resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
        }
        else {
          console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
        }
      }
      accessLevels[level] = {
        bitMask: resultBitMask,
        title  : accessLevelDeclarations[level][role]
      };
    }
  }

  return accessLevels;
}

function* check() {
  const url = this.req.url;
  // TODO 2016-01-07 03:28:30 jwt 认证, 才能获取到 uid
  const uid = this.req.uid;

  const user = yield platform.users.getUser(uid);
  // TODO 2016-01-07 03:28:26 权限计算, 参考简账前端 loginService
  // TODO 2016-01-07 03:28:23 注册用户会自动分配 user role
  // TODO 2016-01-07 03:28:48 网站功能要有给用户设置权限的能力
}

module.exports.check        = check;
module.exports.userRoles    = buildRoles(config.roles);
module.exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);
