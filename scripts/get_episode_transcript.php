<?php

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
$lesshtml = substr($html, $begin);
$end = strrpos($lesshtml, '<hr');
$lesshtml = substr($lesshtml, 0, $end);


//Remove click here for audio line.
//adding a period leaves some "click here" messages behind, but without it some have a period left behind. Find better solution.
$clickhereline = 'Click here for audio of Episode ' . $episodenum;  
$lesshtml = str_replace($clickhereline, '', $lesshtml);

$lesshtml = convert_smart_quotes($lesshtml);

//Fix pictures
$fiximg = 'src="http://www.uh.edu/engines/';
$lesshtml = str_replace('src="', $fiximg, $lesshtml);

//display result 
echo strip_tags($lesshtml, '<p><center><blockquote><font><br><hr><img>');