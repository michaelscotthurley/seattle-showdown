var express = require("express");
var router = express.Router();
var db = require('../models');

//route to get logged in user's profile
router.get("/", function(req, res) {
	db.user.findOne({
		where: { 
			id: req.session.userId
		},
		include: [db.show,{model: db.review, include: db.show},{model: db.ride, include: db.show}]
	}).then(function(profile) {
		res.render('users/userProfile', {profile:profile})
	});
});

//route to get another user's profile
router.get("/:id", function(req, res) {
	var id = req.params.id
	db.user.findOne({
		where: {
			id: id
		},
		include: [db.show,{model: db.review, include: db.show},{model: db.ride, include: db.show}]
	}).then(function(profile) {
		res.render('users/userProfile', {profile:profile})
	})
})

module.exports = router;