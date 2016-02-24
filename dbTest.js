var express = require('express');
var db = require('./models');
var app = express();

db.review.create({
	title: "Test",
	body: "test",
	userId: 2,
	showId: 4
}).then(function() {
	console.log('it works.')
});

db.findById(req.currentUser).then(function(show) {
	db.usersShows.find( where {
		userId: user.id
	}).then(function (userShows) {
		
	})
})
