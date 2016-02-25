var express = require('express');
var db = require('./models');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var request = require("request");
var session = require('express-session');
var flash = require('connect-flash');

app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.use(session({
	secret: 'a;lkajsf;laskjf;lajksfd;lakjsdf;ljwytyanv',
	resave: false,
	saveUninitialized: true
}))
app.use(flash());

app.use(function(req, res, next) {
  if (req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.get("/", function (req, res) {
	res.render('index', {alerts: req.flash()});
})

app.get("/search", function (req, res) {
  res.render('search');
});

//get route for artist search results
app.get('/results', function(req, res) {
	var query = req.query.q
	request('http://api.bandsintown.com/artists/'+query+'/events/search.json?api_version=2.0&app_id=seattle-showdown&location=Seattle,WA',
		function (error, response, body) {
			var data = JSON.parse(body);
			if (!error && response.statusCode == 200) {
      		res.render('searchResults', {shows: data, q: query});
      		} else {
        	res.send("Error!")
      		}
		});
});

app.use('/shows', require('./controllers/shows'));
app.use('/users', require('./controllers/users'));
app.use('/auth', require('./controllers/auth'));

//404 file not found route
app.get('/*', function(req, res) {
  res.render('error');
});

app.listen(process.env.PORT || 3000)