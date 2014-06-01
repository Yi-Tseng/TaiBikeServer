var MapApp = angular.module('MapApp', []);
MapApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

MapApp.controller('MapController', function($scope) {
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
			$scope.items.push({name:'', location:lat.toFixed(3) +"\n"+ lng.toFixed(3), date:'', marker:marker});
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
});



