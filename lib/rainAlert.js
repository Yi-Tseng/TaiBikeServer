

'use strict';

var http = require('http');
var xml2js = require('xml2js');
var firebase = require('firebase');

module.exports = function(callback) {
	http.get({host:'opendata.cwb.gov.tw', path: '/opendata/MFC/W-C0033-003.cap', headers:{'Accept-Language': 'zh-TW'}}, function(res){
		var data = '';
		res.on('data', function(d) {
			data += d;
		});

		res.on('end', function() {

			xml2js.parseString(data, function(err, jres) {
				if(err) {
					callback(true, err);
					return;
				} else {
					var description = jres.alert.info[0].description[0].trim();
					var broadcast = new firebase('https://taibike.firebaseio.com/broadcast');
					broadcast.set({broadcast:'yes', msg:description});
					callback(false, description);

				}

			});
		});
	});

};
