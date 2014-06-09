var MapApp = angular.module('MapApp', []);
MapApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

MapApp.controller('MapController', function($scope, $http) {
	$scope.items = [];
	$scope.predicate = 'date';
	$scope.step = 1;

	var mapOptions = {
		zoom: 7,
		center: new google.maps.LatLng(23.5989354, 121.0173534),
	    disableDoubleClickZoom: true
	};
	map = new google.maps.Map($('#map-canvas')[0], mapOptions);

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

	var equipGet = $http.get('/api/user/equipments');
	equipGet.success(function(data, status, headers, config) {
		console.log(data);
		if(!data.error) {
			$scope.equipments = data.equipments;
			for(var i=0; i<$scope.equipments.length; i++) {
				var e = $scope.equipments[i];
				e.selected = false;
			}
			console.log($scope.equipments);
		}
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

	$scope.nextStep = function() {
		if($scope.step === 3) {
			window.setTimeout(function(){google.maps.event.trigger(map, 'resize');},500);
		}
		if($scope.step < 4) {
			$scope.step++;
		}
	}

	$scope.prevStep = function() {
		if($scope.step === 3) {
			window.setTimeout(function(){google.maps.event.trigger(map, 'resize');},500);
		}
		if($scope.step > 1) {
			$scope.step--;
		}
	}

	$scope.setStep = function(step){
		if($scope.step === 3) {
			window.setTimeout(function(){google.maps.event.trigger(map, 'resize');},500);
		}
		$scope.step = step;
	}

	$scope.getwStr = function(n) {
		var weatherStr = ['晴天，舒適', '雨天', '寒冷', '炎熱', '高山'];
		return weatherStr[n];
	}

	$scope.test = function() {
		// console.log($scope.equipments);
		for(var i =0; i< $scope.equipments.length; i++){
			var e = $scope.equipments[i];
			console.log(e.selected);
			// console.log('a');
		}
	}

	$scope.submitPlan = function() {

		var tmp_items = [];
		for(var i in $scope.items) {
			var ii = $scope.items[i];
			var n = ii.name;
			var lat = ii.lat;
			var lng = ii.lng;
			var t = ii.date;
			tmp_items.push({name:n, lat:lat, lng:lng, time:t});

			if(t === '' || t === undefined) {
				$scope.errorClass = 'error';
				$scope.errorMsg = "各座標點時間不能為空！";
				return;
			}
		}

		if($scope.name === '' || $scope.name === undefined) {
			$scope.errorClass = 'error';
			$scope.errorMsg = "名稱不能為空！";
			return;
		} else if($scope.description === '' || $scope.description === undefined) {
			$scope.errorClass = 'error';
			$scope.errorMsg = "描述不能為空！";
			return;
		} else if($scope.start_time === undefined) {
			$scope.errorClass = 'error';
			$scope.errorMsg = "請填寫出發時間！";
			return;
		} else if($scope.end_time === undefined) {
			$scope.errorClass = 'error';
			$scope.errorMsg = "請填寫結束時間！";
			return;
		}

		var equipments = [];
		for(var i =0; i< $scope.equipments.length; i++){
			var e = $scope.equipments[i];
			if(e.selected) {
				equipments.push(e);
			}
		}

		var post = $http.post('/user/add-plan', {
			name:$scope.name,
			description:$scope.description,
			start_time:$scope.start_time,
			end_time:$scope.end_time,
			points:tmp_items,
			equipments:equipments, 
			_csrf:$scope.csrf
		});

		post.success(function(data, status, headers, config) {
			if(data.error) {
				$scope.errorClass = 'error';
				$scope.errorMsg = "發生錯誤！";
			} else {
				window.location = '/user/plan';
			}
		});
		post.error(function(data, status) {
			$scope.errorClass = 'error';
			$scope.errorMsg = "發生錯誤！";
		});
	};
});

