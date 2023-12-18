<?php

function parse_user_input($input) {
    $input_array = explode(" ", $input);
    foreach ($input_array as &$value) {
        $bool = search($value);
        print("found");
    }
  
include('vendor/autoload.php');
function keywordFinder($keyword){
    $parser = new \installpath\PdfParser\Parser();
    $pdf = $parser->parseFile('mypdf.pdf');
    $text = $pdf->getText();
    $lines = explode(".",$text);
    $possible = [];

    foreach ($lines as $newline){
        if(strpos($keyword, $newline) !== false){
            array_push($possible, $newline);
        }
    }
    echo ($possible);
}
?>