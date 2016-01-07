/**
 * Created on 1/7/16.
 * @author rankun203
 */

module.exports = {
  "roles": {
    "guest"   : {},
    "reader"  : {
      "permissions": ["read"],
      "inherited"  : ["guest"]
    },
    "writer"  : {
      "permissions": ["create"],
      "inherited"  : ["reader"]
    },
    "editor"  : {
      "permissions": ["update"],
      "inherited"  : ["reader"],
      "attributes" : ["dailySchedule"]
    },
    "director": {
      "permissions": ["delete"],
      "inherited"  : ["reader", "editor"]
    },
    "admin"   : {
      "permissions": ["manage"],
      "inherited"  : ["director"]
    }
  },
  "users": {

  }
};
