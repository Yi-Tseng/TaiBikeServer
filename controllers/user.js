'use strict';

var md5 = require('MD5');
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

    app.post('/api/user/register', function(req, res) {
    	var account = req.param('account');
    	var password = req.param('password');
    	var pwd2 = req.param('pwd2');
    	var name = req.param('name');

    	if(password !== pwd2) {
    		res.send({msg:'兩次密碼不相同', error:true});
    	} else {
			User.find({account:account}, function(err, users) {
				if(err) {
	    			res.send({msg:err, error:true});
	    		} else if(users.length !== 0){
	    			res.send({msg:'此帳號已被註冊', error:true});
	    		} else {
	    			var newUser = new User({account:account, password:md5(password), name:name});
	    			newUser.save(function(err2) {
	    				if(err2) {
	    					res.send({msg:err, error:true});
	    				} else {
	    					res.send({msg:'success', error:false});
	    				}
	    			});

	    		}
	    	});
    	}

    });

    app.get('/register', function(req, res) {
    	var authKey = req.session.authKey;

		if (authKey === '' || authKey === undefined) {
			res.render('register');
		} else {
			res.redirect('/user');
		}
    });

    app.get('/user', function(req, res) {
    	var authKey = req.session.authKey;
		if (authKey === '' || authKey === undefined) {
			res.redirect('/');
		} else {
			keyAuth(authKey, function(msg) {
				if(msg.error) {
					res.redirect('/');
				} else {
					res.render('user', {user:msg.user});
				}
			});
		}

    });



};
