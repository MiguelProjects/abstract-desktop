<?php

include 'vendor/autoload.php';


$parser = new \Smalot\PdfParser\Parser();
$pdf    = $parser->parseFile('00047134.pdf');

$text = $pdf->getText();
echo $text;

?>