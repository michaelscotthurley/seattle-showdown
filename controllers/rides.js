var express = require("express");
var router = express.Router();
var db = require('../models');

//route to get all ride shares for all shows
router.get('/', function(req, res) {
  db.ride.findAll({
    include: [db.show,db.user]
  })
  .then(function(allrides) {
    res.render('allrides', {allrides:allrides})
  });
});

//route to get ride shares for a particular show
router.get('/:id', function(req, res) {
  var id = req.params.id;
  db.ride.findAll({
    where: {
      showId: id
    },
    include: [db.show,db.user]
  })
  .then(function(rides) {
    res.render('showRides', {rides:rides})
  });
});

// //route to form to create a ride share for a show
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
     res.redirect('/rides'); 
 })
})

module.exports = router;