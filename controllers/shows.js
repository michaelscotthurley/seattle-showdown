var express = require("express");
var router = express.Router();
var db = require('../models');

//route to get all shows to which any user has RSVP'd
router.get("/", function(req, res) {
	db.show.findAll({include: [db.user]}).then(function(allshows) {
		console.log(allshows[0].users.length);
		var filteredShows = allshows.filter(function(show) {
			return show.users.length > 0
		})
		//var sorted = filteredShows.sort
		res.render('shows/allshows', {allshows:filteredShows});
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
		res.render('shows/yourShows', {user:user});
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
			image:  req.body.addImage,
			ticketOnSale: req.body.addOnSaleDate,
			ticketType: req.body.addTicketType,
			ticketStatus: req.body.addTicketStatus,
			ticketBuyLink: req.body.addTicketUrl
		}
	}).spread(function(show, created) {
		post.addShow(show).then(function() {
			res.redirect('/shows/:id');
		})
	 })
  });
});

//route to delete a concert from a user's list
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
				user.removeShow(show);
					res.send("success");
			});	
	});		
});

module.exports = router;