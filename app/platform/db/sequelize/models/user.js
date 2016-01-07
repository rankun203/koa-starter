/**
 * Created on 1/6/16.
 * @author rankun203
 */

const _ = require('lodash');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    role         : {type: DataTypes.STRING},
    phone        : {type: DataTypes.STRING, allowNull: false},
    password     : {type: DataTypes.STRING},
    avatarUrl    : {type: DataTypes.STRING},
    name         : {type: DataTypes.STRING},
    gender       : {type: DataTypes.INTEGER},
    birthday     : {type: DataTypes.DATE},
    lastLoginTime: {type: DataTypes.DATE},
    lastLoginIp  : {type: DataTypes.STRING},
    status       : {type: DataTypes.INTEGER}
  }, {
    associate      : function (models) {
      User.hasMany(models.Task);
    },
    instanceMethods: {
      toJSON: function () {
        var privateAttributes = ['password'];
        return _.omit(this.dataValues, privateAttributes);
      }
    }
  });
  return User;
};
