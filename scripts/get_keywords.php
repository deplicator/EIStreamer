<?php
//Get last episode from local file.
$latest_epi_data = fopen('./data.txt', 'r+');
$local_latest = intval(fread($latest_epi_data, 10));
fclose($latest_epi_data);

//Create variable for an episode 10 less than current, to check the last 10 episodes.
$last10 = $local_latest - 10;

//Get keyword website for parsing.
$html = file_get_contents("http://www.uh.edu/engines/keywords.htm");

//Parse episode titles and keywords for last 10 episodes.
for($i = $last10; $i <= $local_latest; $i++) {
    $lesshtml = substr($html, strrpos($html, strval($i)));
    $lesshtml = substr($lesshtml, 0, strpos($lesshtml, "]"));
    $lesshtml =  strip_tags($lesshtml);
    $lesshtml = preg_replace('/\s+/', ' ', trim($lesshtml));
    $newline =  $lesshtml . "]\n";
    
    //Look for episode in keyword file.
    $keywords = file('keywords.txt');
    $lastline = $keywords[$i-1];

    //if not found add it.
    if($lastline != $newline) {
        file_put_contents('keywords.txt', $newline, FILE_APPEND | LOCK_EX);
    }
}

// This could be made better, episodes found out of order are problematic. A way to sort the file so
// that each epsiode is on a line would be ideal. If there is time I'll come back and fix this.