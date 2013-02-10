<?php

$source_index = file_get_contents("http://www.uh.edu/engines/index.htm");
$find = strstr($source_index, ".htm\">No. ");
$latest = substr($find,10,4);
echo $latest;