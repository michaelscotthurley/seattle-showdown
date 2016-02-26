var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

//route to get all shows to which any user has RSVP'd
router.get("/", function(req, res) {
	db.show.findAll({include: [db.user]}).then(function(allshows) {
		console.log(allshows[0].users.length);
		var filteredShows = allshows.filter(function(show) {
			return show.users.length > 0
		})
		//var sorted = filteredShows.sort
		res.render('shows', {allshows:filteredShows});
	});
});

//route to get all reviews for all shows
router.get('/reviews', function(req, res) {
	db.review.findAll({
		include: [db.show,db.user]
	})
	.then(function(allreviews) {
		res.render('allreviews', {allreviews:allreviews})
	});
});

//route to get reviews for a particular show
router.get('/reviews/:id', function(req, res) {
	var id = req.params.id;
	db.review.findAll({
		where: {
			showId: id
		},
		include: [db.show,db.user]
	})
	.then(function(reviews) {
		res.render('reviews', {reviews:reviews})
	});
});

//route to form to write a review of a show
router.get('/writereview/:id', function(req, res) {
	var id = req.params.id;
	res.render('writeReview');
		
});

//route to post a new review for a show
router.post('/writereview/:id', function(req, res) {
	db.review.findOrCreate({
		where: {
			userId: req.session.userId,
			showId: req.params.id
		}, 
		defaults: {
			title: req.body.reviewTitle,
			body: req.body.reviewBody
		}
	}).spread(function(review, created) {
			res.redirect('/shows/reviews'); 
	})
})

//route to get all ride shares for all shows
router.get('/rides', function(req, res) {
	db.ride.findAll({
		include: [db.show,db.user]
	})
	.then(function(allrides) {
		res.render('allrides', {allrides:allrides})
	});
});

//route to get ride shares for a particular show
router.get('/rides/:id', function(req, res) {
	var id = req.params.id;
	db.ride.findAll({
		where: {
			showId: id
		},
		include: [db.show,db.user]
	})
	.then(function(rides) {
		res.render('rides', {rides:rides})
	});
});

//route to form to create a ride share for a show
router.get('/makerideshare/:id', function(req, res) {
	var id = req.params.id;
	res.render('makeRideShare');
		
});

//route to post a new ride share for a show
router.post('/makerideshare/:id', function(req, res) {
	db.ride.findOrCreate({
		where: {
			userId: req.session.userId,
			showId: req.params.id
		}, 
		defaults: {
			neighborhood: req.body.neighborhood,
			passengers: req.body.passengers,
			description: req.body.rideShareDesc
		}
	}).spread(function(review, created) {
			res.redirect('/shows/rides'); 
	})
})

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