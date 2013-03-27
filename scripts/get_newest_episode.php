<?php

$site_latest = 0;

error_reporting(0);
if(file_get_contents("http://www.uh.edu/engines/index.htm")) {
    $source_index = file_get_contents("http://www.uh.edu/engines/index.htm");
    $find = strstr($source_index, ".htm\">No. ");
    $site_latest = substr($find,10,4);
}

$data = fopen('./data.txt', 'r+');
$local_latest = fread($data, 10);

if($site_latest > $local_latest) {
    $data = fopen('./data.txt', 'w');
    fwrite($data, $site_latest);
    echo $site_latest;
} else {
    echo $local_latest;
}

fclose($data);