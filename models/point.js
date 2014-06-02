'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	name:String,
	latitude:Number,
	longitude:Number,
	altitude:Number,
	time:Date
});
