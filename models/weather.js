'use strict';

var mongoose = require('mongoose');

var weatherModel = function () {

	
    var weatherSchema = mongoose.Schema({
		location:String, 
		time:Date, 
		temperature:Number, 
		weatherType:String, 
		humidity:Number
	});

/*
	// define function if we want to use
    userSchema.methods.someFunction = function () {
        
    };
*/
    return mongoose.model('Weather', weatherSchema);

};

module.exports = new weatherModel();