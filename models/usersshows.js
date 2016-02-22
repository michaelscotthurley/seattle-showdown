'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersShows = sequelize.define('usersShows', {
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersShows;
};