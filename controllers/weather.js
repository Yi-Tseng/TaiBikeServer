'use strict';
var getCity = require('../lib/city');
var getWeather = require('../lib/weather');
var getAlert = require('../lib/rainAlert');

module.exports = function (app) {

	app.get('/weather', function(req, res) {
		res.render('weather');
	});

	// /weather?lng=&lat=
	app.get('/weatherData', function(req, res) {
		var lng = req.param('lng');
		var lat = req.param('lat');
		getCity(lng, lat, function(city) {

			getWeather(city, function(err, weather) {
				res.send({error:err, weather:weather});
			});

		});

	});

	app.get('/getAlert', function(req, res) {
		getAlert(function(error, description) {
			res.send({error:error, description:description});
		});

	});

}
