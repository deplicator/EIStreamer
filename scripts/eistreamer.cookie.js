//https://code.google.com/p/cookies/wiki/Documentation#With_jQuery

/* 
 * Checks if the browser supports cookies.
 * http://sveinbjorn.org/cookiecheck
 */
function are_cookies_enabled() {
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;

	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	return (cookieEnabled);
}

/* 
 * Checks to be sure cookies are suppoted when user checks "Remember Played".
*/
$('#trackCheckbox:checkbox').click(function() {
	if(!are_cookies_enabled()) {
		alert("Sorry, cookie support is not enabled.");
	}
});

/*
 * Checks the "Remember Played" checkbox if the 'played' cookie is found.
 */
 if($.cookie('played') != null) {
	$('#trackCheckbox').prop('checked', true);
 }
 

/*
 * When an episode ends, if the check box is checked, append that episode
 * number to cookie.
 */
$('#jquery_jplayer_1 audio').on("ended", function() {
	if ($('#trackCheckbox:checkbox').is(':checked')) {
		var current = $('#manual').val();
		if($.cookie('played') == null) {
			$.cookie('played', current, {expires:365}); //first value is always undefined, why?
		} else { 
			var more = $.cookie('played')
			$.cookie('played', more + ',' + current, {expires:365});
		}
	}
});


//Remove all cookies function
function removeAllCookies() {
	//change this to not use confirm someday. (http://stackoverflow.com/questions/43955/changing-the-default-title-of-confirm-in-javascript)
	var ask = confirm("Remove all cookies from this site?");
	
	if(ask == true) {
		$.cookie('played', 'none', {expires: -1});
	}
}

$('#trackRemove').click(removeAllCookies);
