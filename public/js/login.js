$('#btn-login').click(function() {
	var account = $('#account').val();
	var password = $('#password').val();
	var csrf=$('#csrf').val();
	$.post('/login', {account:account, password:password, _csrf:csrf}, function(req) {
		console.log(req);
		if(req.error) {
			$('#msg').attr('style', 'display:block;');
		} else {
			window.location = '/user';
		}
	}, 'json');
});
