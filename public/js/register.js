$('#button-submit').click(function() {
	var account = $('#account').val();
	var password = $('#password').val();
	var pwd2 = $('#pwd2').val();
	var name = $('#name').val();
	var check = $('#check').attr('checked');
	var _csrf = $('#csrf').val();

	console.log(_csrf);
	if(account === '') {
		$('#form').addClass('error');
		$('#msg').html('帳號不能為空！');
	} else if(password === '') {
		$('#form').addClass('error');
		$('#msg').html('密碼不能為空！');
	} else if(pwd2 === '') {
		$('#form').addClass('error');
		$('#msg').html('驗證密碼不能為空！');
	} else if(name === '') {
		$('#form').addClass('error');
		$('#msg').html('姓名不能為空！');
	} else {
		$.post('/api/user/register', {account:account, password:password, pwd2:pwd2, name:name, _csrf:_csrf}, function(res) {
			if(res.error) {
				$('#form').addClass('error');
				$('#msg').html(res.msg);
			} else {
				window.location='/prompt#註冊成功';
			}
		});
	}
});

