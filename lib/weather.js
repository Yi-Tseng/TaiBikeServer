
'use strict';

var http = require('http');
var xml2js = require('xml2js');

module.exports = function(targetCity, callback) {
	if(!targetCity) {
		callback(true, {});
	}
	http.get({host:'opendata.cwb.gov.tw', path: '/opendata/MFC/F-C0032-001.xml', headers:{'Accept-Language': 'zh-TW'}}, function(res){
		// var targetCity = '台北市';
		targetCity = targetCity.replace('台', '臺');

		var data = '';
		res.on('data', function(d) {
			data += d;
		});
		var contains = function(arr, key) {
			for(var i in arr) {

				if(arr[i] === key) {
					return true;
				}
			}
			return false;
		};
		res.on('end', function() {
			// console.log(data);
			xml2js.parseString(data, function(err, jres) {
				var cityWeather = {};

				if(err) {
					callback(true, err);
					return;
				} else {
					// console.log(JSON.stringify(jres));
					var locations = jres.fifowml.data[0].location;
					for(var i in locations) {
						cityWeather = locations[i];
						// console.log(loc.name);
						if(contains(cityWeather.name, targetCity)) {
							break;
						}
					}
				}

				var name = cityWeather.name[0];
				var weather = cityWeather['weather-elements'][0].Wx[0].time[1];
				var maxT = cityWeather['weather-elements'][0].MaxT[0].time[1].value[0]._;
				var minT = cityWeather['weather-elements'][0].MinT[0].time[1].value[0]._;
				var CI = cityWeather['weather-elements'][0].CI[0].time[1].text[0];
				var start_time = new Date(weather.$.start);
				var end_time = new Date(weather.$.end);
				var desc = weather.text[0];

				callback(false, {weather:desc, city:targetCity, maxT:maxT, minT:minT, CI:CI});

				// console.log(name);
				// console.log(start_time);
				// console.log(end_time);
				// console.log(desc);

				// console.log(cityWeather);
			});
		});
	});
};
