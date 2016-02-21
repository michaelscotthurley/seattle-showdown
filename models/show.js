'use strict';
module.exports = function(sequelize, DataTypes) {
  var show = sequelize.define('show', {
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.STRING,
    image: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return show;
};