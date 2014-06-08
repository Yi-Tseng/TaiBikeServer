'use strict';

var md5 = require('MD5');
var User = require('../models/user');
var keyAuth = require('../lib/auth');

module.exports = function (app) {
	app.post('/user/add-equpment', function(req, res) {
		var authKey = req.session.authKey;

		keyAuth(authKey, function(msg) {
			if(msg.error) {
				res.send(msg);
			} else {
				var name = req.param('name');
				var desc = req.param('desc');
				var weight = req.param('weight');

				// weather
				var sunny = req.param('sunny');
				var rainy = req.param('rainy');
				var cold = req.param('cold');
				var hot = req.param('hot');
				var mountain = req.param('mountain');

				console.log({sunny:sunny, rainy:rainy, cold:cold, hot:hot, mountain:mountain});

				var weather = [];
				if(sunny === 'true') {
					weather.push(0);
				}
				if(rainy === 'true') {
					weather.push(1);
				}
				if(cold === 'true') {
					weather.push(2);
				}
				if(hot === 'true') {
					weather.push(3);
				}
				if(mountain === 'true') {
					weather.push(4);
				}

				var equpment = {name:name, description:desc, weight:weight, weather:weather};
				User.update({authKey:authKey}, {$push:{equpments:equpment}}, function(err) {
					if(err) {
						res.send({msg:'db update err', error:true});
					} else {
						res.send({msg:'success', error:false});
					}
				});

			}
		});

    });

    app.get('/user/add-equpment', function(req, res) {
    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					req.session.authKey = '';
					res.redirect('/');
				} else {
					var equpments = msg.user.equpments;
					res.render('equpment/add', {equpments:equpments});
				}
			});
		}
    });


    app.post('/user/update-equpment', function(req, res) {
    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					res.send(msg);
				} else {
					var id = req.param('id');
					var name = req.param('name');
					var desc = req.param('desc');
					var weight = req.param('weight');
					// weather
					var sunny = req.param('sunny');
					var rainy = req.param('rainy');
					var cold = req.param('cold');
					var hot = req.param('hot');
					var mountain = req.param('mountain');

					var weather = [];
					if(sunny === 'true') {
						weather.push(0);
					}
					if(rainy === 'true') {
						weather.push(1);
					}
					if(cold === 'true') {
						weather.push(2);
					}
					if(hot === 'true') {
						weather.push(3);
					}
					if(mountain === 'true') {
						weather.push(4);
					}

					var equpments = msg.user.equpments;
					var equpment = equpments.id(id);
					equpment.name = name;
					equpment.description = desc;
					equpment.weight = weight;
					equpment.weather = weather;

					msg.user.save(function(err) {
						if(err) {
							res.send({error:true, msg:err});
						} else {
							res.send({error:false, msg:'success'});
						}
					})
				}
			});
		}
    });

    app.get('/user/equpment/:id', function(req, res){
    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					req.session.authKey = '';
					res.redirect('/');
				} else {
					var id = req.param('id');
					var equpments = msg.user.equpments;
					var equpment = equpments.id(id);
					res.render('equpment/equpment', {equpment:equpment});
				}
			});
		}
    });

    app.get('/user/equpments', function(req, res) {
    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					req.session.authKey = '';
					res.redirect('/');
				} else {
					var equpments = msg.user.equpments;
					res.render('equpment/equpments', {equpments:equpments});
				}
			});
		}
    });

    app.get('/user/delete-equpment', function(req, res) {

    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					req.session.authKey = '';
					res.redirect('/');
				} else {
					var id  = req.param('id');
					User.update({authKey:authKey}, {$pull:{equpments:{_id:id}}}, function(err) {
					if(err) {
						res.send({msg:'db update err', error:true});
					} else {
						res.redirect('/user/equpments');
					}
				});
				}
			});
		}
    });


    app.get('/api/user/equpments', function(req, res) {
    	var authKey = req.param('authKey');
    	if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					res.send(msg);
				} else {
					User.find({authKey:authKey}, 'equpments', function(err, users) {
						if(users.length === 1) {
							var user = users[0];
							res.send({msg:'success', equpments:user.equpments, error:false});
						} else {
							res.send({msg:'Auth Key Error!', error:true});
						}
					});
				
				}
			});
		}
    });
}
