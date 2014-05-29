'use strict';

var mongoose = require('mongoose');
var pointSchema = require('./point');


module.exports = mongoose.Schema({
	name:String, 
	timeStart:Date, 
	timeEnd:Date, 
	points:[pointSchema], 
	records:[pointSchema]
});
