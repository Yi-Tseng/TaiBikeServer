

// init check box
$('#sunny').checkbox();
$('#rainy').checkbox();
$('#cold').checkbox();
$('#hot').checkbox();
$('#mountain').checkbox();


var check = function(something) {
	if(something === '' || something === undefined) {
		return true;
	}
	return false;
}

$('#btnAdd').click(function(){
	var csrf = $('#csrf').val();
	var name = $('#name').val();
	var desc = $('#desc').val();
	var weight = $('#weight').val();
	var sunny = $('#sunny input').filter(":checked").length > 0;
	var rainy = $('#rainy input').filter(":checked").length > 0;
	var cold = $('#cold input').filter(":checked").length > 0;
	var hot = $('#hot input').filter(":checked").length > 0;
	var mountain = $('#mountain input').filter(":checked").length > 0;


	if(check(name)) {
		$('.ui.form.segment').addClass('error');
		$('#msg').html('請輸入名稱');
		return;
	} else if(check(weight)) {
		$('.ui.form.segment').addClass('error');
		$('#msg').html('請輸入重量');
		return;
	} 


	var equp = {_csrf:csrf, name:name, desc:desc, weight:weight, sunny:sunny, rainy:rainy, cold:cold, hot:hot, mountain:mountain};
	console.log(equp);

	$.post('/user/add-equipment', equp, function(data) {
		if(data.err){
			$('.ui.form.segment').addClass('error');
			$('#msg').html("發生錯誤！請檢查資料是否正確！");
		} else {
			window.location = '/user/equipments';
		}
	}, 'json');
});
