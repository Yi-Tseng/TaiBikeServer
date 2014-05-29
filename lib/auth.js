'use strict';

var User = require('../models/user');

module.exports = function (authKey, callBack) {
	User.find({authKey:authKey}, 'account name equpments ridePlains authKeyExpire', function(err, user) {
		if(err) {
			callBack({msg:'Internal server error!', error:true});
		} else if(user.length === 1){
			var currentUser = user[0];
			var expireDate = currentUser.authKeyExpire;
			var currentDate = new Date();
			if(currentDate.getTime() > expireDate.getTime()) {
				callBack({msg:'authKey expired', error:true});
			} else {
				callBack({msg:'success', error:false, user:currentUser});
			}
		} else {
			callBack({msg:'fail', error:true});
		}
	});
};