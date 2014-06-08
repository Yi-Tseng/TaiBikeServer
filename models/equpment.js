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

// weather 定義：
// 0 舒適或是晴天
// 1 雨天
// 2 寒冷
// 3 炎熱
// 4 高山
// 5 