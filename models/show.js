'use strict';
module.exports = function(sequelize, DataTypes) {
  var show = sequelize.define('show', {
    artist: DataTypes.STRING,
    title: DataTypes.STRING,
    venue: DataTypes.STRING,
    date: DataTypes.STRING,
    image: DataTypes.STRING,
    ticketOnSale: DataTypes.STRING,
    ticketType: DataTypes.STRING,
    ticketStatus: DataTypes.STRING,
    ticketBuyLink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.show.belongsToMany(models.user, {through: "usersShows"})
        models.show.hasMany(models.review)
      }
    }
  });
  return show;
};