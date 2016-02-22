'use strict';
module.exports = function(sequelize, DataTypes) {
  var show = sequelize.define('show', {
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return show;
};