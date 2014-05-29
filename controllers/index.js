'use strict';

module.exports = function (app) {

	app.get('/', function (req, res) {
		
		res.render('index', {msg:'Hello, world!'});
    });

};
