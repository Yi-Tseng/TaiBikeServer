'use strict';

var mongoose = require('mongoose');


module.exports = mongoose.Schema({
	name:String,
	minTemp:Number,
	maxTemp:Number,
	description:String,
	weight:Number,
	weather:Array
});
