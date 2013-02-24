<!DOCTYPE html>

<?php
	$epi = $_REQUEST['epi'];
	echo '<div id="data" style="display: none;">' . $epi . '</div>'
?>

<html>
<head>
    <title>Engines of Our Ingenuity Streamer</title>
    <script src="scripts/jquery.min.js"></script><!--jQuery 1.9.1-->
	<script src="scripts/jquery.jplayer.min.js"></script><!--jPlayer 2.2.0-->
	<script src="scripts/jquery.cookie.js"></script><!--jQuery Cookie Plugin v1.3.1 -->
    <link rel="stylesheet" href="css/default.css">
	<link type="text/css" href="css/blue.monday/jplayer.blue.monday.css" rel="stylesheet" />
</head>

<body>
    <div id="wrap">
		<div id="left">
			<header>
				<h1>The Engines of Our Ingenuity</h1>
				<h2>Streamer</h2>
				<hr>
			</header>
			<div id="options"><!--would make a neat slidebar-->
				<a href="index.php" id="transcriptButton">Transcript</a> | 
				<a href="?epi=help" id="helpButton" >Help</a>
			</div>
			<div id="manualControls">
				<h3>Manual Controls</h3>
				
				<div id="jquery_jplayer_1" class="jp-jplayer"></div>
				
				<div id="jp_container_1" class="jp-audio">
					<div class="jp-type-single">
						<div class="jp-gui jp-interface">
							<ul class="jp-controls">
								<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>
								<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>
								<li><a href="javascript:;" class="jp-stop" tabindex="1">stop</a></li>
								<li><a href="javascript:;" class="jp-previous" tabindex="1">previous</a></li>
								<li><a href="javascript:;" class="jp-next" tabindex="1">next</a></li>
							</ul>
							
							<div class="jp-progress">
								<div class="jp-seek-bar">
									<div class="jp-play-bar"></div>
								</div>
							</div>
							
							<div class="jp-time-holder">
								<div class="jp-current-time"></div>
								<div class="jp-duration"></div>
								<ul class="jp-toggles">
								</ul>
							</div>
							
						</div>
						
						<div class="jp-no-solution">
							<span>Update Required</span>
							To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
						</div>
					</div>
				</div>
				
				<div id="manualInput">
					<input id="manual" type="text">
				</div>

			</div>
			
			<div id="autoplay" class="playOptions">
				<h3>Autoplay Options</h3>
				<div id="ascending" class="auto-option">From Beginning</div>
				<div id="descending" class="auto-option">In Reverse</div>
				<div id="continuousRandom" class="auto-option">At Random</div>
				<div id="track"><input type="checkbox">Remember Played</div>
			</div>
			
			<div id="keyword" class="playOptions"><!--keyword tag cloud could be cool here-->
				<h3>Keywords</h3>
				<p>future keyword section</p>
			</div>
			
			<div id="share" class="playOptions">
				<h3>Share</h3>
				<input id="shareTextbox" type="text" readonly>
			</div>

			<hr>
			
			<div id="officialInfo">
				<ul id="links">
					<li><a href="http://www.uh.edu/engines/">Engine's of Our Ingenuity Website.</a></li>
				</ul>
			</div>
			
		</div>
		
		<!--Right side-->
		<div id="message">
			<p>Error Message: Still working out bugs, audio takes a momemnt to load on Internet Explorer 8, 9, and Firefox.</p>
		</div>
		
		<div id="transcript" class="mainViewArea"></div>
		
		<!--Help Page-->
		<div id="help" class="mainViewArea hidden">
			<div class="helpSection" id="helpHeader">
				<p>This help section provides additional information on how to use The Engine's of Ingenuity Streamer.</p>
			</div>
			<div class="helpSection" id="helpToggle">
				<p><em>Toggle</em> between transcript and this help section.</p>
			</div>
			<div class="helpSection" id="helpManualControls">
				<p><em>Manual Controls</em> allow for playing, pausing, and stopping, also skipping to the next or last episode. The text box can also be used to type in an episode number manually. The episode will automatically change as the number is typed.</p>
			</div>
			<div class="helpSection" id="helpAutoControls">
				<p><em>Autoplay Options</em> automaticly play a continuous stream of episodes. Checking the "Remembered Played" box will create a cookie that tracks the episodes already played so you can start where you left off on subsequent visits. All cookies created by this website can be deleted by clicking here.</p>
			</div>
			<div class="helpSection" id="helpKeywords">
				<p><em>Keywords</em> are assciated associated with every episode, to play all episodes by keyword click here.</p>
			</div>
			<div class="helpSection" id="helpShare">
				<p><em>Share</em> the displayed episode by copying and pasting this link.</p>
			</div>
			<div class="helpSection" id="helpAdditionalInfo">
				<p><em>Additional Information</em> is provided through these links from the original website hosted at the University of Houston.</p>
			</div>
		</div>
		
		<!--About Page-->
		<div id="about" class="mainViewArea hidden">
			<p>about page</p>
			<a href="index.php" id="transcriptButton">Back to Transcript</a>
		</div>
		
	</div>
	
	<footer>
		<p>	<a href="?epi=help" id="helpButton" >Help</a> | <a href="?epi=about" id="helpButton" >About</a> | <a href="https://github.com/deplicator/EIStreamer">On Github</a> | <a href="http://pvamu.edu">PVAMU</a>
	
		</p>
		<p><a href="http://www.uh.edu/engines/">The Engine's of Our Inginuity</a> is used with persmission from <a href="http://kuhf.org">KUHF</a>, the <a href="http://uh.edu">University of Houston</a>, and <a href="http://www.uh.edu/engines/jhlbio.htm">Dr. John Lienhard</a>.</p>
	</footer>
    
    <script src="scripts/eistreamer.js"></script>
	<script src="scripts/eistreamer.cookie.js"></script>
	<script src="scripts/eistreamer.help.js"></script>
</body>
</html>
