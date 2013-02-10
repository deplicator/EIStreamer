<!DOCTYPE html>
<html>
<head>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
</head>
<body>

<div id="transcript"></div>

<script>
$('#transcript').load('scripts/get_episode_transcript.php?episodenum=345', function() {
    alert('something');
});
</script>


</body>		
</html>
