/*
 * This file is all the basic page and player functions.
 */

var newest = '';
var played = [];
playedlistlen = 0;

/*
 * Play function, optional parameter to play on load.
 * @function
 * @param {int} epi Episode number to load into jPlayer
 */
function playepi(epi) {
	updateDisplay(epi);
	buttonCheck();
	$('#jquery_jplayer_1').jPlayer('destroy');
	$('#jquery_jplayer_1').jPlayer({
		ready: function() {
			$(this).jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + epi + '_64k.mp3' });
		},
		swfPath: './scripts/Jplayer.swf',
		supplied: 'mp3',
		preload: 'auto',
		cssSelectorAncestor: '#jp_container_1',
		cssSelector: {
			play: '.jp-play',
			pause: '.jp-pause',
			stop: '.jp-stop'
		}
	});
}

/*
 * Updates now playing and transcript.
 * @function
 * @param {int} num Episode number to load into jPlayer.
 */
function updateDisplay(num) {
    $('#transcript').load('scripts/get_episode_transcript.php?episodenum=' + num);
    $('#manual').val(num);
    $('#episodeNum').html(num);
	var site = document.URL.substring(0, document.URL.lastIndexOf("/"));
	$('#shareTextbox').val(site + '/?epi=' + num)
	$('#OTLink').html('<a href="http://www.uh.edu/engines/epi'+num+'.htm">Original Transcript for this Episode, No.'+num+'</a>');
	var prevepi = num - 1;
	var nextepi = num + 1;
	$('.jp-previous').attr('title', 'Episode ' + prevepi.toString());
	$('.jp-next').attr('title', 'Episode ' + nextepi.toString());
}

/*
 * Enables and disables next or previous buttons where relevant.
 */
function buttonCheck() {
    var current = $('#manual').val();
    $('.jp-next').removeClass("jp-next-disabled");
    $('.jp-previous').removeClass("jp-previous-disabled");
    if(current == 1) {
        $('.jp-previous').addClass("jp-previous-disabled").attr('title', 'Episode not available');
    } else if(current == newest){
        $('.jp-next').addClass("jp-next-disabled").attr('title', 'Episode not available');
    }
}

/*
 * Manual play options.
 * This handles next and previous buttons and functions. It also automatically loads 
 * episodes as they are typed into the input box at the bottom of Manual Controls.
 */
//Previous Button
$('.jp-previous').click(function() {
	if(!($('.jp-previous').hasClass('jp-previous-disabled'))) {
		var previous = parseInt($('#manual').val()) - 1;
		playepi(previous);
	}
});

//Next Button
$('.jp-next').click(function() {
	if(!($('.jp-next').hasClass('jp-next-disabled'))) {
		var next = parseInt($('#manual').val()) + 1;
		playepi(next);
	}
});

//TextBox Input
$('#manual').keyup(function() {
    var manualinput = $('#manual').val();
    if(manualinput < 1 || manualinput > newest) {
        updateDisplay(manualinput.substr(0,3)); //Handle this better
        alert("out of range"); //Instead of alert try a 'no transcript for this selection' page
    } else {
		playepi(manualinput);
    }
});

/*
 * Autoplay options.
 * This handles the three autoplay modes function and menu appearance.
 */
if($.cookie('played') == null) {
	var firstPlayFlag = true;
} else {
	var firstPlayFlag = false;
}
//From Beginning
$('#ascending').click(function() {
	if (!$(this).hasClass('auto-option-disabled')) {
		continiousPlay('ascending');
		rememberedNotice();
	}
});

//In Reverse
$('#descending').click(function() {
	if (!$(this).hasClass('auto-option-disabled')) {
		continiousPlay('descending');
		rememberedNotice();
	}
});

//At Random
$('#randomly').click(function() {
	if (!$(this).hasClass('auto-option-disabled')) {
		continiousPlay('randomly');
		rememberedNotice();
	}
});

/*
 * ContinuousPlay function will continuiously play as expected based on 
 * parameter.
 * @function
 * @param {string} type Can be 'ascending', 'descending', or 'randomly'.
 */
function continiousPlay(type) {
	if(type == 'ascending') {
		var counter = 1;
	} else if(type == 'descending') { 
		var counter = newest;
	} else if(type == 'randomly') {
		var counter = Math.floor(Math.random()*newest);
	}
	
	var counter = checkAgainstPlayedList(counter, type)

	updateDisplay(counter);
	buttonCheck();
	$('#jquery_jplayer_1').jPlayer('destroy'); //Recreating the player each time may not be the most efficient way of doing this.
	$('#jquery_jplayer_1').jPlayer({
		ready: function() {
			$(this).jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + counter + '_64k.mp3' });
			$(this).jPlayer('play');
		},
		ended: function() {
			if($('#trackCheckbox:checkbox').is(':checked')) { 
				cookieUpdate(counter); //Update cookie and array.
				counter = checkAgainstPlayedList(counter, type) //Move to next episode not found in array, in approprite direction.
				//counter = checkAgainstPlayedList(counter); 
			} else { //Remembered Played check box is unchecked just play an episode.
				if(type == 'ascending') {
					counter++; 
				} else if(type == 'descending') { 
					counter--;
				} else if(type == 'randomly') {
					counter = Math.floor(Math.random()*newest);
				}
			}
			updateDisplay(counter); 
			buttonCheck();
			$(this).jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + counter + '_64k.mp3' });
			$(this).jPlayer('play');
		},
		swfPath: './scripts/Jplayer.swf',
		supplied: 'mp3',
		preload: 'auto',
		cssSelectorAncestor: '#jp_container_1',
		cssSelector: {
			play: '.jp-play',
			pause: '.jp-pause',
			stop: '.jp-stop'
		}
	});
}

/*
 * checkAgainstPlayedList function get's next episode, previous episode, or 
 * random episode based on type parameter.
 *
 * @function
 * @param {int} epi Current episode.
 * @param {string} event 'ascending', 'descending', or 'randomly'.
 */
function checkAgainstPlayedList(epi, type) {
	playedlistlen = played.length;
	//Next episode
	if(type == 'ascending') {
		for(i = 0; i < playedlistlen; i++) {
			if(epi == played[i]){
				return checkAgainstPlayedList(epi + 1, 'ascending');
			}
		}
		return epi; 
	//Previous episode
	} else if(type == 'descending') {
		for(i = playedlistlen; i > 0; i--) {
			if(epi == played[i]){
				return checkAgainstPlayedList(epi - 1, 'descending');
			}
		}
		return epi - 1; 
	//Random episode
	} else if(type == 'randomly') {
		for(i = 0; i < playedlistlen; i++) {
			if(epi == played[i]){
				return checkAgainstPlayedList(Math.floor(Math.random()*newest), 'ascending');
			}
		}
		return epi;
	}
}

/*
 * Load's right side panel based on URL.
 */
//Show About Page
if($('#data').html() == "about") { 
	$('#about').removeClass('hidden');
	$('#help').addClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').addClass('hidden');
	$('#transcript').addClass('hidden');
	disabledPlayOptions();
//Show Help Page
} else if($('#data').html() == "help") {
	$('#about').addClass('hidden');
	$('#help').removeClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').addClass('hidden');
	$('#transcript').addClass('hidden');
	disabledPlayOptions();
//Show played episodes list from cookie.
} else if($('#data').html() == "showplayed") {
	$('#about').addClass('hidden');
	$('#help').addClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').removeClass('hidden');
	$('#transcript').addClass('hidden');
	disabledPlayOptions();
//Show Transcript of latest episode.
} else if($('#data').html() == "") {
	$('#data').load('scripts/get_newest_episode.php', function() {
		newest = parseInt($('#data').html());
		playepi(newest);
	});
//Show Transcript of specific episode.
} else {
	$('#data').load('scripts/get_newest_episode.php', function() {
		newest = parseInt($('#data').html());
	});
	var current = parseInt($('#data').html());
	playepi(current);
}


/*
 * Interface functions, may move to another file.
 */
//Auto play menu
$('.auto-option').click(function() {
	if (!$(this).hasClass('auto-option-disabled')) {
		$('.auto-option').removeClass('auto-selected');
		$(this).addClass('auto-selected');
	}
});

/*
 * Resizes pictures that are wider than the screen after display.
 */
$(document).ajaxComplete(function() {
    $('#transcript img').each(function() {
        if($(this).width() > $('#transcript').width()) {
            $(this).width('100%');
            $(this).height('auto');
        }
    });
});

/*
 * Resizes pictures that are wider than the screen on browser resize.
 */
$(window).resize(function() {
    $('#transcript img').each(function() {
        if($(this).width() > $('#transcript').width()) {
            $(this).width('100%');
            $(this).height('auto');
        }
    });
});





















