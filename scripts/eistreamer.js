var newest = "";

//Player
	$("#jquery_jplayer_1").jPlayer({
		swfPath: "http://www.jplayer.org/latest/js/Jplayer.swf",
		supplied: "mp3",
		cssSelectorAncestor: "",
		cssSelector: {
			play: "#play",
			pause: "#pause",
			stop: "#stop",
			mute: "#mute",
			unmute: "#unmute",
			currentTime: "#currentTime",
			duration: "#duration"
		}
	});




//Get duration of current episode.
function episodeDuration() {
    return document.getElementById('player').duration;
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
    $('#next').attr("disabled", false);
    $('#previous').attr("disabled", false);
    if(current == 1) {
        $('#previous').attr("disabled", true);
    } else if(current == newest){
        $('#next').attr("disabled", true);
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
    $('#links').append('<li><a href="http://www.uh.edu/engines/epi'+num+'.htm">Original Transcript for this Episode</a></li>');
}

//Load's latest episode on page load or episode from URL.
if($('#data').html() == "help") {
	$('#help').removeClass('hidden');
	$('#about').addClass('hidden');
	$('#transcript').addClass('hidden');
	$('#message').addClass('hidden');
} else if($('#data').html() == "about") {
	$('#about').removeClass('hidden');
	$('#help').addClass('hidden');
	$('#transcript').addClass('hidden');
	$('#message').addClass('hidden');
} else if($('#data').html() == "") {
	$('#data').load('scripts/get_newest_episode.php', function() {
		newest = parseInt($('#data').html());
		updateDisplay(newest)
		
		$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + newest + '_64k.mp3' });
			
		//$('#player').html('<source src="http://www.kuhf.org/programaudio/engines/eng' + newest + '_64k.mp3" type="audio/mpeg"/>');
		buttonCheck();
		$('#message').removeClass('hidden');
	});
} else {
	updateDisplay($('#data').html());
	$('#message').removeClass('hidden');
}


//Button controls
$('#previous').click(playPrevious);
$('#next').click(playNext);
$('#random').click(playRandom);
$('#ascending').click(playAsending);
$('#descending').click(playDescending);
$('#continuousRandom').click(playContinuousRandom);

function playPrevious() {
    var previous = parseInt($('#manual').val()) - 1;
    updateDisplay(previous);
	$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + previous + '_64k.mp3' });
    buttonCheck();
}

function playNext() {
    var next = parseInt($('#manual').val()) + 1;
    updateDisplay(next);
	$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + next + '_64k.mp3' });
    buttonCheck();
}

function playRandom() {
    var randomEpisode = Math.floor(Math.random()*newest);
    updateDisplay(randomEpisode);
	$('#jquery_jplayer_1').jPlayer("setMedia", { mp3: 'http://www.kuhf.org/programaudio/engines/eng' + randomEpisode + '_64k.mp3' });
    buttonCheck();
}

function playAsending() {
    //$('#player').attr("autoplay", true)
    updateDisplay(1);
    //$('#player').html('<source src="http://www.kuhf.org/programaudio/engines/eng1_64k.mp3" type="audio/mpeg"/>');
    //$('#player').on("ended", playNext);
    buttonCheck();
}

function playDescending() {
    //$('#player').attr("autoplay", true)
    updateDisplay(newest);
    //$('#player').html('<source src="http://www.kuhf.org/programaudio/engines/eng' + newest + '_64k.mp3" type="audio/mpeg"/>');
    //$('#player').on("ended", playPrevious);
    buttonCheck();
}

function playContinuousRandom() {
    //$('#player').attr("autoplay", true)
    var randomEpisode = Math.floor(Math.random()*newest);
    updateDisplay(randomEpisode);
    //$('#player').html('<source src="http://www.kuhf.org/programaudio/engines/eng' + randomEpisode + '_64k.mp3" type="audio/mpeg"/>');
    //$('#player').on("ended", playRandom);
    buttonCheck();
}

//Loads episode's manually typed in text box.
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

//autoplay menu
$('.auto-option').click(function() {
	$('.auto-option').removeClass('auto-selected');
	$(this).addClass('auto-selected');
});