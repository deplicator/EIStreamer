//Set heigts of help sections to match.
$('#helpHeader').css('height', $('header').outerHeight());
$('#helpToggle').css('height', $('#options').outerHeight());
$('#helpManualControls').css('height', $('#manualControls').outerHeight());
$('#helpAutoControls').css('height', $('#autoplay').outerHeight());
$('#helpKeywords').css('height', $('#keyword').outerHeight());
$('#helpShare').css('height', $('#share').outerHeight());
$('#helpAdditionalInfo').css('height', $('#officialInfo').outerHeight());

/*
 * Disabled jPlayer start, stop, previous, next, and autoplay options.
 * @function
 */
function disabledPlayOptions() {
	$('#jquery_jplayer_1').jPlayer('destroy');
	$('#jquery_jplayer_1').jPlayer({
		cssSelectorAncestor: '#jp_container_1',
		cssSelector: {
			play: '.jp-play',
			pause: '.jp-pause',
			stop: '.jp-stop'
		}
	});
	
	$('.jp-play').addClass('jp-play-disabled');
	$('.jp-stop').addClass('jp-stop-disabled');
	$('.jp-previous').addClass('jp-previous-disabled');
	$('.jp-next').addClass('jp-next-disabled');
	
	$('#OTLink').html('<a href="http://kuhf.org">KUHF\'s Website</a>');
	
	$('.auto-option').addClass('auto-option-disabled');
	
}

/*
 * When called pops up a notice next to Remembered Played check box then fades
 * out after 5 seconds.
 * @function
 */
function rememberedNotice() {
	if(firstPlayFlag && !$('#trackCheckbox:checkbox').is(':checked')) {
		$('#trackHelp').fadeIn('slow', function() {
			setTimeout(function() {
				$('#trackHelp').fadeOut('slow');
			}, 5000);
		});
	}
}