'use strict';

module.exports = function (app) {
	app.get('/weather', function(req, res) {
		res.render('weather');
	});

}