var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get("/", function(req, res) {
	db.show.findAll().then(function(allshows) {
		res.render('shows', {allshows:allshows});
	});
});

//route to get current user's shows
router.get('/:id', function(req, res) {
	var id = req.session.userId;
	db.user.findOne({
		where: {
			id:id
		},
		include: [db.show]
	}).then(function(user) {
		res.render('yourShows', {user:user});
	});
});

//route to post a show to current user's shows
router.post('/:id', function(req, res) {
	var id = req.session.userId;
	db.user.findById(id).then(function(post) {
		db.show.findOrCreate({
		where: {
			artist: req.body.addArtist,
			title:  req.body.addTitle,
			venue:  req.body.addVenue,
			date:   req.body.addDate,
			image:  req.body.addImage
		}
	}).spread(function(show, created) {
		post.addShow(show).then(function() {
			res.render('yourShows');
		})
	 })
  });
});

router.delete('/:id', function(req, res) {
	db.user.findOne({
		where: {
			id: req.session.userId
		}}).then(function(user) {
			db.show.findOne({
				where: {
					id: req.params.id
				}
			}).then(function(show) {
				user.removeShow(show)
					res.send("success");
			});	
	});		
});

module.exports = router;