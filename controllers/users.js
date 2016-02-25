var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
	db.user.findOne({
		where: { 
			id: req.session.userId
		},
		include: [db.show,db.review]
	}).then(function(profile) {
		res.render('userProfile', {profile:profile})
	});
});

router.get("/:id", function(req, res) {
	var id = req.params.id
	db.user.findOne({
		where: {
			id: id
		},
		include: [db.show,db.review]
	}).then(function(profile) {
		res.render('userProfile', {profile:profile})
	})
})

module.exports = router;
