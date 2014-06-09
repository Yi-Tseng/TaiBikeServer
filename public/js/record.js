

var init = function() {
	var mapOptions = {
		zoom: 7,
		center: new google.maps.LatLng(23.5989354, 121.0173534),
	};
	map = new google.maps.Map($('#map-canvas')[0], mapOptions);

	var pid = window.location.pathname.split('/')[4];

	$.get('/api/plan/' + pid, function(data) {
		console.log(data);
		if(!data.error) {
			var plan = data.plan;
			var records = plan.records;

			for(var i in records) {
				var r = records[i];
				var latLng = new google.maps.LatLng(r.latitude, r.longitude);

				var marker = new google.maps.Marker({
					position: latLng,
					map: map
				});
			}

		}
	});
}


init();