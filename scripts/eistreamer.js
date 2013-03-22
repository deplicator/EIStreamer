/*
 * This file is all the basic page and player functions.
 */

var newest = '';

/*
 * Play function, optional parametier to play on load.
 * @function
 * @param {int} epi Episode number to load into jPlayer
 */
function playepi(epi) {
	updateDisplay(epi);
	buttonCheck();
	$('#jquery_jplayer_1').jPlayer('destroy'); //Recreating the player each time may not be the most effecent way of doing this.
	$('#jquery_jplayer_1').jPlayer({
		ready: function() {
			$(this).jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + epi + '_64k.mp3' });
		},
		swfPath: 'http://www.jplayer.org/2.0.0/js',
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
 * Continuous Play function, optional parametier to play on load.
 * @function
 * @param {int} epi Episode number to load into jPlayer
 * @param {string} type Options are 'accending', 'decending', or 'random'. Random is default.
 */
function ContinuousPlay(epi, type) {
	if(type == 'accending') {
		var counter = 1;
	} else if(type == 'decending') {
		var counter = newest;
	} else {
		var counter = 0;
	}
	
	
	updateDisplay(counter);
	buttonCheck();
	$('#jquery_jplayer_1').jPlayer('destroy'); //Recreating the player each time may not be the most effecent way of doing this.
	$('#jquery_jplayer_1').jPlayer({
		ready: function() {
			$(this).jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + epi + '_64k.mp3' });
			$(this).jPlayer('play');
		},
		ended: function() {
			//something will go here.
		},
		swfPath: 'http://www.jplayer.org/2.0.0/js',
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
 */
function updateDisplay(num) {
    $('#transcript').load('scripts/get_episode_transcript.php?episodenum=' + num);
    $('#manual').val(num);
    $('#episodeNum').html(num);
	var site = document.URL.substring(0, document.URL.lastIndexOf("/"));
	$('#shareTextbox').val(site + '/?epi=' + num)
	$('#OTLink').html('<a href="http://www.uh.edu/engines/epi'+num+'.htm">Original Transcript for this Episode, No.'+num+'</a>');
}

/*
 * Enables and disables next or previous buttons where relevant.
 */
function buttonCheck() {
    var current = $('#manual').val();
    $('.jp-next').removeClass("jp-next-disabled");
    $('.jp-previous').removeClass("jp-previous-disabled");
    if(current == 1) {
        $('.jp-previous').addClass("jp-previous-disabled");
    } else if(current == newest){
        $('.jp-next').addClass("jp-next-disabled");
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
        alert("out of range"); //Instead of alert try a 'no trascript for this selection' page
    } else {
		playepi(manualinput);
    }
});

/*
 * Autoplay options.
 * This handles the three autoplay modes function and menu appearance.
 */
//From Begining

//In Reverse

//At Random




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
//Show Help Page
} else if($('#data').html() == "help") {
	$('#about').addClass('hidden');
	$('#help').removeClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').addClass('hidden');
	$('#transcript').addClass('hidden');
//Show played episodes list from cookie.
} else if($('#data').html() == "showplayed") {
	$('#about').addClass('hidden');
	$('#help').addClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').removeClass('hidden');
	$('#transcript').addClass('hidden');
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
	$('.auto-option').removeClass('auto-selected');
	$(this).addClass('auto-selected');
});







//Convert below to above format.

//From Beginning Autoplay
$('#ascending').click(function() {
	var counter = 1;
	updateDisplay(counter);
	
	buttonCheck();
	
	$('#jquery_jplayer_1').jPlayer('destroy'); //Recreating the player each time may not be the most effecent way of doing this.
	
	$('#jquery_jplayer_1').jPlayer({
		ready: function() {
			$(this).jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + counter + '_64k.mp3' });
			$(this).jPlayer('play');

		},
		swfPath: 'http://www.jplayer.org/2.0.0/js',
		supplied: 'mp3',
		preload: 'auto',
		cssSelectorAncestor: '#jp_container_1',
		cssSelector: {
			play: '.jp-play',
			pause: '.jp-pause',
			stop: '.jp-stop'
		},
		ended: function() {
			counter++;
			playanother(counter);
			
		}
	});
	
	function playanother(epi) {
		updateDisplay(epi);
		$('#jquery_jplayer_1').jPlayer('setMedia', { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + epi + '_64k.mp3' });
		$('#jquery_jplayer_1').jPlayer("play");
		
	}
	

/*	
	updateDisplay(1);
	$("#jquery_jplayer_1").jPlayer("destroy");
	
	$("#jquery_jplayer_1").jPlayer({
		ready: function() {
			$("#jquery_jplayer_1").jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng1_64k.mp3' });
			
			
			
			$("#jquery_jplayer_1").jPlayer("play");
		},
		swfPath: "http://www.jplayer.org/2.0.0/js",
		supplied: "mp3",
		preload: "auto",
		cssSelectorAncestor: "#jp_container_1",
		cssSelector: {
			play: ".jp-play",
			pause: ".jp-pause",
			stop: ".jp-stop"
		},
	  ended: function() {
		if(!($('.jp-next').hasClass('jp-next-disabled'))) {
			if ($('#trackCheckbox:checkbox').is(':checked')) {
				cookieUpdate($('#manual').val());
				var next = parseInt($('#manual').val()) + 1;
				updateDisplay(next);
				$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + next + '_64k.mp3' });
			} else {
				var next = parseInt($('#manual').val()) + 1;
				updateDisplay(next);
				$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + next + '_64k.mp3' });
			}
		}
		$("#jquery_jplayer_1").jPlayer("play");
	  }
	});

	buttonCheck();*/
});

//In Reverse Autoplay
$('#descending').click(function() {
	updateDisplay(newest);
	$("#jquery_jplayer_1").jPlayer("destroy");

	$("#jquery_jplayer_1").jPlayer({
		ready: function() {
			$("#jquery_jplayer_1").jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + newest + '_64k.mp3' });
			$("#jquery_jplayer_1").jPlayer("play");
		},
		swfPath: "http://www.jplayer.org/2.0.0/js",
		supplied: "mp3",
		preload: "auto",
		cssSelectorAncestor: "#jp_container_1",
		cssSelector: {
			play: ".jp-play",
			pause: ".jp-pause",
			stop: ".jp-stop"
		},
	  ended: function() {
		if ($('#trackCheckbox:checkbox').is(':checked')) {
			cookieUpdate($('#manual').val());
		}
		playPrevious();
		$("#jquery_jplayer_1").jPlayer("play");
	  }
	});

	buttonCheck();
});

//At Random Autoplay
$('#continuousRandom').click(function() {
	var randomEpisode = Math.floor(Math.random()*newest);
	updateDisplay(randomEpisode);
	$("#jquery_jplayer_1").jPlayer("destroy");
	
	$("#jquery_jplayer_1").jPlayer({
		ready: function() {
			$(this).jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + randomEpisode + '_64k.mp3' });
			$(this).jPlayer("play");
		},
		swfPath: "http://www.jplayer.org/2.0.0/js",
		supplied: "mp3",
		preload: "auto",
		cssSelectorAncestor: "#jp_container_1",
		cssSelector: {
			play: ".jp-play",
			pause: ".jp-pause",
			stop: ".jp-stop"
		},
	  ended: function() {
		if ($('#trackCheckbox:checkbox').is(':checked')) {
			cookieUpdate(randomEpisode);
		}
		randomEpisode = Math.floor(Math.random()*newest);
		updateDisplay(randomEpisode);
		$(this).jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + randomEpisode + '_64k.mp3' });
		$(this).jPlayer("play");
		
	  }
	});
	
	buttonCheck();
});







