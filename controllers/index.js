'use strict';

module.exports = function (app) {

	app.get('/', function (req, res) {
		var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.render('index');
		} else {
			res.redirect('/user');
		}

    });

	app.get('/prompt', function(req, res) {
		res.render('prompt');
	});
};
