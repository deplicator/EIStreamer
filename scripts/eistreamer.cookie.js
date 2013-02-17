
	$('#player').on("ended", function() {
		if($('#track input').is(':checked')) {
			$.cookie('the_cookie', 'the_value');
		}
	});