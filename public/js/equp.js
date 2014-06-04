
var check = function(something) {
	if(something === '' || something === undefined) {
		return true;
	}
	return false;
}

$('#btnSave').click(function() {
	var csrf = $('#csrf').val();
	var name = $('#name').val();
	var desc = $('#desc').val();
	var weight = $('#weight').val();
	var minTemp = $('#minTemp').val();
	var maxTemp = $('#maxTemp').val();
	var id = window.location.pathname.split('/')[3];

	if(check(name)) {
		$('.ui.form.segment').addClass('error');
		$('#msg').html('請輸入名稱');
		return;
	} else if(check(weight)) {
		$('.ui.form.segment').addClass('error');
		$('#msg').html('請輸入重量');
		return;
	} else if(check(minTemp)) {
		minTemp = -100;
	} else if(check(maxTemp)) {
		maxTemp = 100;
	}


	var equp = {_csrf:csrf, id:id, name:name, desc:desc, weight:weight, minTemp:minTemp, maxTemp:maxTemp};
	console.log(equp);
	$.post('/user/update-equpment', equp, function(data) {
		if(data.err){
			$('.ui.form.segment').addClass('error');
			$('#msg').html("發生錯誤！請檢查資料是否正確！");
		} else {
			window.location = '/user/equpments';
		}
	}, 'json');
});
