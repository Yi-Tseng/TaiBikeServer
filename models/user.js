'use strict';

var mongoose = require('mongoose');
var equpmentSchema = require('./equpment');
var ridePlanSchema = require('./plan');


var userModel = function () {

    var userSchema = mongoose.Schema({
		account:{type:String, unique:true},
		password:String,
		name:String,
		email:String,
		equpments:[equpmentSchema],
		ridePlans:[ridePlanSchema],
		authKey:{type:String, unique:true},
		authKeyExpire:Date
	});

/*
	// define function if we want to use
    userSchema.methods.someFunction = function () {

    };
*/
    return mongoose.model('User', userSchema);

};

module.exports = new userModel();
