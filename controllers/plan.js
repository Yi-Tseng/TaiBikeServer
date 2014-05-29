'use strict';

var User = require('../models/user');
var keyAuth = require('../lib/auth');


module.exports = function (app) {

	app.get('/api/plan/add', function (req, res) {
		var authKey = req.param('authKey');
		
		keyAuth(authKey, function(msg) {
			if(msg.error) {
				res.send(msg);
			} else {
				var name = req.param('name');
				var timeStart = new Date(req.param('timeStart'));
				var timeEnd = new Date(req.param('timeEnd'));
				var points = [];
				var plain = {name:name, timeStart:timeStart, timeEnd:timeEnd, points:points};

				User.update({authKey:authKey}, {$push:{ridePlains:plain}}, function(err) {
					if(err) {
						res.send({msg:'db update err', error:true});
					} else {
						res.send({msg:'success', error:false});
					}
				});

			}
		});
	});

	app.get('/api/plan/update', function (req, res) {
		var authKey = req.param('authKey');
		var pid = req.param('pid');

		console.log(authKey);
		console.log(pid);

		keyAuth(authKey, function(msg) {
			if(msg.error) {
				res.send(msg);
			} else {
				var name = req.param('name');
				var timeStart = new Date(req.param('timeStart'));
				var timeEnd = new Date(req.param('timeEnd'));
				var points = req.param('points');

				console.log(name);
				console.log(timeStart);
				console.log(timeEnd);
				console.log(points);

				points = JSON.parse(points);

				var ridePlains = msg.user.ridePlains;
				
				if (!ridePlains.id(pid)) {
					res.send({msg:'can\'t find plan', error:true});
					return;
				}

				ridePlains.id(pid).name = name;
				ridePlains.id(pid).timeStart = timeStart;
				ridePlains.id(pid).timeEnd = timeEnd;
				ridePlains.id(pid).points = points;

				msg.user.save(function(err) {
					if(err) {
						res.send({msg:'db update err', error:true});
					} else {
						res.send({msg:'success', error:false});
					}
				});
			}
		});
	});


	app.get('/api/plan/record/add', function (req, res) {
		var authKey = req.param('authKey');
		
		keyAuth(authKey, function(msg) {
			if(msg.error) {
				res.send(msg);
			} else {
				var id = req.param('id');
				var lng = req.param('lng');
				var lat = req.param('lat');
				var alt = req.param('alt');
				var ridePlains = msg.user.ridePlains;
				
				ridePlains.id(id).records.push({latitude:lat, longitude:lng, altitude:alt});

				msg.user.save(function(err) {
					if(err) {
						res.send({msg:'db update err', error:true});
					} else {
						res.send({msg:'success', error:false});
					}
				});

			}
		});
	});

	app.get('/api/plan/:pid', function (req, res) {
		var authKey = req.param('authKey');
		var pid = req.param('pid');
		keyAuth(authKey, function(msg) {
			if(msg.error) {
				res.send(msg);
			} else {
				var ridePlains = msg.user.ridePlains;
				var plan = ridePlains.id(pid);
				res.send({msg:'success', error:false, plan:plan});
			}
		});
	});

};
