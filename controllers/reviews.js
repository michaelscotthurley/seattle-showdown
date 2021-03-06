var express = require("express");
var router = express.Router();
var db = require('../models');

//route to get all reviews for all shows
router.get('/', function(req, res) {
  db.review.findAll({
    include: [db.show,db.user]
  })
  .then(function(allreviews) {
    res.render('reviews/allreviews', {allreviews:allreviews})
  });
});

//route to get reviews for a particular show
router.get('/:id', function(req, res) {
  var id = req.params.id;
  db.review.findAll({
    where: {
      showId: id
    },
    include: [db.show,db.user]
  })
  .then(function(reviews) {
    res.render('reviews/showReviews', {reviews:reviews})
  });
});

//route to form to write a review of a show
router.get('/writereview/:id', function(req, res) {
  var id = req.params.id;
  db.show.findAll({
    where: {id: id}
  })
  .then(function(shows) {
    res.render('reviews/writeReview', {shows:shows})
  });
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
      res.redirect('/reviews'); 
  })
})

module.exports = router;