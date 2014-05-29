'use strict';

var User = require('../models/user');
var keyAuth = require('../lib/auth');

module.exports = function (app) {

	app.get('/api/user/info', function (req, res) {
		var authKey = req.param('authKey');
		keyAuth(authKey, function(msg) {
			if(msg.error) {
				res.send(msg);
			} else {
				res.send({msg:'success', error:false, info:msg.user});
			}
		});


    });

};
