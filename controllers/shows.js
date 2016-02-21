var express = require("express");
var router = express.Router();
var db = require('../models');
var ejsLayouts = require("express-ejs-layouts");
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(ejsLayouts);

router.get("/", function(req, res) {
	db.show.findAll().then(function(allshows) {
		res.render('shows', {allshows:allshows});
	});
});

router.post('/', function(req, res) {	
	db.show.findOrCreate({

	  where: {
		artist: req.body.addArtist,
		title:  req.body.addTitle,
		venue:  req.body.addVenue,
		date:   req.body.addDate,
		image:  req.body.addImage,
		userId: req.body.addUserId,
	  }
	}).spread(function(show, created) {
		res.redirect("/shows");
  });
})

module.exports = router;