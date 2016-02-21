var express = require('express');
var db = require('./models');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/static'));

var ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);

var request = require("request");

app.get("/", function (req, res) {
	res.render('index');
})

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


app.listen(3000)