'use strict';
module.exports = function(sequelize, DataTypes) {
  var ride = sequelize.define('ride', {
    neighborhood: DataTypes.STRING,
    passengers: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.ride.belongsTo(models.user);
        models.ride.belongsTo(models.show);
      }
    }
  });
  return ride;
};