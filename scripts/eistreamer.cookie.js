//https://code.google.com/p/cookies/wiki/Documentation#With_jQuery
//http://stackoverflow.com/questions/7683845/removing-duplicates-from-an-array-in-javascript

/* 
 * Array prototype to return only unique values in an array.
 */
Array.prototype.unique = function(){
  return Object.keys(this.reduce(function(r,v){
    return r[v]=1,r;
  },{}));
}

/* 
 * Create array from current cookie.
 */
$(document).ready(function() {
	if($.cookie('played') != null) {
		oldPlayed = $.cookie('played').split(",");
		var oldplayedlen = oldPlayed.length;
		for(i = 0; i < oldplayedlen; i++) {
			played.push(oldPlayed[i]);
		}
		played = played.unique();
		played = played.map(function (x) { 
			return parseInt(x, 10); 
		});
		played = played.sort(function(a, b) {return a - b;});
		console.log(played);
	}
	playedlistlen = played.length;
	//Add episode list to Show Played page.
	for(i = 0; i < playedlistlen; i++) {
		$('#showplayed').append('<li>' + played[i] + '</li>');
	}
});

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
function cookieUpdate(epi) {
	if($.cookie('played') == null) {
		$.cookie('played', epi, {expires:365});
	} else { 
		var more = $.cookie('played')
		$.cookie('played', more + ',' + epi, {expires:365});
	}
	played.push(parseInt(epi));
}

/*
 * Remove played cookie.
 */
function removeAllCookies() {
	//change this to not use confirm someday. (http://stackoverflow.com/questions/43955/changing-the-default-title-of-confirm-in-javascript)
	var ask = confirm("Remove all cookies from this site?");
	
	if(ask == true) {
		$.cookie('played', 'none', {expires: -1});
	}
}

/*
 * Binds Remove Cookie links to remove played cookie functions.
 */
$('.trackRemove').click(removeAllCookies);






















