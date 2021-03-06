'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 99]
      }
    },
    profilePic: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.belongsToMany(models.show, {through: "usersShows"});
        models.user.hasMany(models.review);
        models.user.hasMany(models.ride);
      },
      authenticate: function(email, password, callback) {
        this.find( {
          where: {email:email}
        }).then(function(user) {
          if (!user) return callback(null, false);
          bcrypt.compare(password, user.password, function(err, result) {
            if (err) return callback(err);
            callback(null, result ? user: false);
          })
        })
      }
    },
    hooks: {
      beforeCreate: function(user, options, callback) {
        if (user.password) {
          bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return callback("Sorry, you're account could not be created. Please double check your information and try again.");
            user.password = hash;
            callback(null, user);
          });
        } else {
          callback(null, user);
        }
      }
    }
  });
  return user;
};