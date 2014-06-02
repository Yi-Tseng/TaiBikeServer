var MapApp = angular.module('MapApp', []);
MapApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

MapApp.controller('MapController', function($scope, $http) {
	$scope.items = [];

	var mapOptions = {
		zoom: 7,
		center: new google.maps.LatLng(23.5989354, 121.0173534),
	    disableDoubleClickZoom: true
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	google.maps.event.addListener(map, 'dblclick', function(event) {

		var marker = new google.maps.Marker({
			position: event.latLng,
			map: map
		});

		$scope.$apply(function() {
			var lat = event.latLng.k;
			var lng = event.latLng.A;
			console.log(event);
			$scope.items.push({name:'', location:lat.toFixed(3) +"\n"+ lng.toFixed(3), date:'', marker:marker, lat:lat, lng:lng});
		});

	});

	$scope.locate = function(item) {
		map.setCenter(item.marker.getPosition());
	};

	$scope.del = function(item) {
		item.marker.setMap(null);
		for(var i in $scope.items) {
			if($scope.items[i] === item) {
				$scope.items.splice(i, 1);
			}
		}

	};

	$scope.submitPlan = function() {

		var tmp_items = [];
		for(var i in $scope.items) {
			var ii = $scope.items[i];
			var n = ii.name;
			var lat = ii.lat;
			var lng = ii.lng;
			var t = ii.date;
			tmp_items.push({name:n, lat:lat, lng:lng, time:t});
		}
		for(var i in tmp_items) {
			console.log(tmp_items[i]);
		}

		var post = $http.post('/user/add-plan', {
			name:$scope.name,
			description:$scope.description,
			start_time:$scope.start_time,
			end_time:$scope.end_time,
			points:tmp_items,
			_csrf:$scope.csrf
		});
		post.success(function(data, status, headers, config) {
			console.log(data);

		});
		post.error(function(data, status) {

		});
	};
});



