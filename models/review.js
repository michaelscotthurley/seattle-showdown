'use strict';
module.exports = function(sequelize, DataTypes) {
  var review = sequelize.define('review', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    showId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.review.belongsTo(models.user);
        models.review.belongsTo(models.show);
      }
    }
  });
  return review;
};