'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	latitude:Number, 
	longitude:Number, 
	altitude:Number
});
