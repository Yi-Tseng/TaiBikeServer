'use strict';

var mongoose = require('mongoose');
var pointSchema = require('./point');
var equpmentSchema = require('./equpment');

module.exports = mongoose.Schema({
	name:String,
	description:String,
	timeStart:Date,
	timeEnd:Date,
	points:[pointSchema],
	records:[pointSchema], 
	equpments:[equpmentSchema]
});
