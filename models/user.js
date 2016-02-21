'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};