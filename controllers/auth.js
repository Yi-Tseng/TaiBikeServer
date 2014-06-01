'use strict';

var User = require('../models/user');
var md5 = require('MD5');

function genRandKey() {
	var key = '';
	for(var c=0; c<32; c++) {
		var rnd = (Math.random() * 26) + 'A';
		key += rnd;
	}
	key = md5(key);
	return key;
}


module.exports = function (app) {

	app.get('/api/auth/login', function (req, res) {
		var account = req.param('account');
		var password = req.param('password');
		password = md5(password);

		User.find({account:account, password:password}, function(err, user) {
			if(err) {
				res.send({msg:'Internal server error!', error:true});
			} else if(user.length === 1){
				var currentUser = user[0];
				var authKey = genRandKey();
				var expireDate = new Date();
				if(expireDate.getMonth() > 6) {
					expireDate.setYear(expireDate.getYear() + 1);
					expireDate.setMonth((expireDate.getMonth() + 6) % 12);
				} else {
					expireDate.setMonth(expireDate.getMonth() + 6);
				}
				currentUser.authKeyExpire = expireDate;
				currentUser.authKey = authKey;

				currentUser.save(function(err) {
					if(err) {
						res.send({msg:'save key fail', error:true});
					} else {
						res.send({msg:'success', error:false, authKey:authKey});
					}
				});

			} else {
				res.send({msg:'fail', error:true});
			}
		});

    });

    app.get('/login', function(req, res) {
    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.render('login');
		} else {
			res.redirect('/user');
		}

    });

    app.post('/login', function (req, res) {
		var account = req.param('account');
		var password = req.param('password');
		password = md5(password);

		User.find({account:account, password:password}, function(err, user) {
			if(err) {
				res.send({msg:'Internal server error!', error:true});
			} else if(user.length === 1){
				var currentUser = user[0];

				if(currentUser.authKey === '' || currentUser.authKey === undefined) {
					var authKey = genRandKey();
					var expireDate = new Date();
					if(expireDate.getMonth() > 6) {
						expireDate.setYear(expireDate.getYear() + 1);
						expireDate.setMonth((expireDate.getMonth() + 6) % 12);
					} else {
						expireDate.setMonth(expireDate.getMonth() + 6);
					}
					currentUser.authKeyExpire = expireDate;
					currentUser.authKey = authKey;
					currentUser.save(function(err){});
				}
				req.session.authKey = currentUser.authKey;

				res.send({msg:'success', error:false, authKey:currentUser.authKey});


			} else {
				res.send({msg:'fail', error:true});
			}
		});

    });

    app.get('/logout', function(req, res) {
    	req.session.authKey = '';
    	res.redirect('/');
    });

};
