var newest = "";

	$("#jquery_jplayer_1").jPlayer({
		swfPath: "./scripts/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "#jp_container_1",
		cssSelector: {
			play: ".jp-play",
			pause: ".jp-pause",
			stop: ".jp-stop"
		}
	});

//Get duration of current episode.
function episodeDuration() {
    //return document.getElementById('player').duration;
}


//The audio for this episode is still under construction, please check back at a later date.
function audioCheck() {
    if(episodeDuration() < 5){
        $('#message').html("The audio for this episode is still under construction.");
    }
}

//Toggles Transcript View and Help View
$('#helpButton').click(function() {
	$('#transcript').addClass('hidden');
	$('#about').addClass('hidden');
	$('#help').removeClass('hidden');
});


//Enables and disables next or previous buttons where relevant.
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

//Updates now playing and transcript
function updateDisplay(num) {
    $('#transcript').load('scripts/get_episode_transcript.php?episodenum=' + num, function() {
        audioCheck();
    });
    $('#manual').val(num);
    $('#episodeNum').html(num);
	var site = document.URL.substring(0, document.URL.lastIndexOf("/"));
	$('#shareTextbox').val(site + '/?epi=' + num)
	$('#OTLink').html('<a href="http://www.uh.edu/engines/epi'+num+'.htm">Original Transcript for this Episode, No.'+num+'</a>');
}

//Load's latest episode on page load or episode from URL.
if($('#data').html() == "about") {
	$('#about').removeClass('hidden');
	$('#help').addClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').addClass('hidden');
	$('#transcript').addClass('hidden');
} else if($('#data').html() == "help") {
	$('#about').addClass('hidden');
	$('#help').removeClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').addClass('hidden');
	$('#transcript').addClass('hidden');
} else if($('#data').html() == "showplayed") {
	$('#about').addClass('hidden');
	$('#help').addClass('hidden');
	$('#message').addClass('hidden');
	$('#showplayed').removeClass('hidden');
	$('#transcript').addClass('hidden');
} else if($('#data').html() == "") {
	$('#data').load('scripts/get_newest_episode.php', function() {
		newest = parseInt($('#data').html());
		updateDisplay(newest)
		$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + newest + '_64k.mp3' });
		buttonCheck();
		$('#message').removeClass('hidden');
	});
} else {
	var current = parseInt($('#data').html());
	updateDisplay(current)
	$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + current + '_64k.mp3' });
	buttonCheck();
	$('#message').removeClass('hidden');
}


/*
 * Manual options.
 * This handles next and previous buttons and functions. It also automatically loads 
 * episodes as they are typed into the input box at the bottom of Manual Controls.
 * 
 * Functions seperated from buttons because they are reused in the autoplay options below.
 */

$('.jp-previous').click(playPrevious);
$('.jp-next').click(playNext);

function playPrevious() {
	if(!($('.jp-previous').hasClass('jp-previous-disabled'))) {
		var previous = parseInt($('#manual').val()) - 1;
		updateDisplay(previous);
		$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + previous + '_64k.mp3' });
		buttonCheck();
	}
}

function playNext() {
	if(!($('.jp-next').hasClass('jp-next-disabled'))) {
		var next = parseInt($('#manual').val()) + 1;
		updateDisplay(next);
		$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + next + '_64k.mp3' });
		buttonCheck();
	}
}

//Loads episodes typed in text box.
$('#manual').keyup(function() {
    var manualinput = $('#manual').val();
    if(manualinput < 1 || manualinput > newest) {
        updateDisplay(manualinput.substr(0,3)); //Handle this better
        alert("out of range");
    } else {
		$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + manualinput + '_64k.mp3' });
        updateDisplay(manualinput);
    }
    buttonCheck();
});



/*
 * Autoplay options.
 * This handles the three autoplay modes function and menu appearance.
 */
 
$('#ascending').click(function() {
	updateDisplay(1);
	$('#jquery_jplayer_1').jPlayer(
		"setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng1_64k.mp3' }
	).jPlayer("play");
	$('#jquery_jplayer_1 audio').attr("autoplay", true); //Admittedly not an ideal solution.
	$('#jquery_jplayer_1 audio').on("ended", playNext);
	buttonCheck();
});

$('#descending').click(function() {
	updateDisplay(newest);
	$('#jquery_jplayer_1').jPlayer(
		"setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + newest + '_64k.mp3' }
	).jPlayer("play");
	$('#jquery_jplayer_1 audio').attr("autoplay", true); //Admittedly not an ideal solution.
	$('#jquery_jplayer_1 audio').on("ended", playPrevious);
	buttonCheck();
});

$('#continuousRandom').click(playContinuousRandom);
function playRandom() {
    var randomEpisode = Math.floor(Math.random()*newest);
    updateDisplay(randomEpisode);
	$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + randomEpisode + '_64k.mp3' });
    buttonCheck();
}

function playContinuousRandom() {
    //$('#player').attr("autoplay", true)
    var randomEpisode = Math.floor(Math.random()*newest);
    updateDisplay(randomEpisode);
	$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + randomEpisode + '_64k.mp3' });
	$('#jquery_jplayer_1 audio').attr("autoplay", true); //Admittedly not an ideal solution.
    $('#jquery_jplayer_1 audio').on("ended", playRandom);
    buttonCheck();
}







//autoplay menu
$('.auto-option').click(function() {
	$('.auto-option').removeClass('auto-selected');
	$(this).addClass('auto-selected');
});