/**
 * Created on 1/6/16.
 * @author rankun203
 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Task', {
    name        : DataTypes.STRING,
    taskStatus  : DataTypes.INTEGER,
    status      : DataTypes.INTEGER
  });
};
