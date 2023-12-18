<?php
function find_keyword($input, $filename) {
    $array = explode("\n", file_get_contents($filename));
    foreach ($array as &$keyword) {
        if(strpos($keyword, $input) !== false){
            return true;
        }
    }
}
?>