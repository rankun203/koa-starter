/**
 * Created on 1/7/16.
 * @author rankun203
 */

function allowDeny(user, allowedPermissions, deniedPermissions, params) {
  function check(permissions) {
    // handle catch separately to prevent failing prematurely. The promise
    // will always resolve with a numeric value
    return permissions && rbac.check(user, permissions, params).then(function (allowed) {
        return allowed || Infinity;
      }, function () {
        // Infinity is the highest possible value (or lowest possible priority)
        return Infinity;
      }) || Infinity;
  }

  return Promise.all([
    check(allowedPermissions),
    check(deniedPermissions)
  ]).then(function (results) {
    // Note: if both are equal, then the rule failed
    return results[0] < results[1]; // resolve next
  });
}
