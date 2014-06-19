'user strict';

var http = require('http');

module.exports = function (lng, lat, callback) {
	http.get({
		host:'maps.googleapis.com',
		path: '/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&sensor=false',
		headers:{'Accept-Language': 'zh-TW'}}, function(res){
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

		res.on('end',function(){
			var obj = JSON.parse(data);
			var city = '';
			if(obj.status == 'OK') {
				var address_components = obj.results[0].address_components;
				for(var i = 0; i < address_components.length; i++) {
					var ac = address_components[i];
					if(contains(ac.types, 'administrative_area_level_2')) {
						city = ac.long_name;
					}
				}
			}
			callback(city);
		});
	});

};
