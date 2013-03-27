<?php
//header('Content-type: application/json');
//header("Content-Type: text/html; charset=utf-8");
//ini_set("default_charset", 'utf-8');

function convert_smart_quotes($string) 
{ 
    $search = array(chr(145), chr(146), chr(147), chr(148), chr(151), chr(133)); 
 
    $replace = array("'", "'", '"', '"', '-', '...'); 
 
    return str_replace($search, $replace, $string); 
} 

//get page for selected episode from uh.edu
$episodenum = $_REQUEST['episodenum'];
$html = file_get_contents("http://www.uh.edu/engines/epi" . $episodenum . ".htm");


//strip page down to title, transcript, and citations.
$begin = strpos($html, '<td>');

//Episode 2870 is very different than other episodes, this accounts for it and other episodes that may show up like it.
if($begin == "") {
	$begin = strpos($html, '<h1>');
	$lesshtml = substr($html, $begin);	
	$end = strrpos($lesshtml, '<footer>'); //get rid of that footer!
	$lesshtml = substr($lesshtml, 0, $end);
	$lesshtml = $lesshtml . '<p class="smaller">The Engines of Our Ingenuity is copyright © 1988-2013 by John H. Lienhard.</p>';
} else {
	//For old table style episode transcripts.
	$lesshtml = substr($html, $begin);
	$end = strrpos($lesshtml, '<hr');
	$lesshtml = substr($lesshtml, 0, $end);
}

//Remove click here for audio line.
//adding a period leaves some "click here" messages behind, but without it some have a period left behind. Find better solution.
$clickhereline = 'Click here for audio of Episode ' . $episodenum;  
$lesshtml = str_replace($clickhereline, '', $lesshtml);

$lesshtml = convert_smart_quotes($lesshtml);

//Fix pictures
$fiximg = 'src="http://www.uh.edu/engines/';
$lesshtml = str_replace('src="', $fiximg, $lesshtml);

$lesshtml =  strip_tags($lesshtml, '<p><a><center><blockquote><font><br><hr><img>');

//display result 
echo $lesshtml;