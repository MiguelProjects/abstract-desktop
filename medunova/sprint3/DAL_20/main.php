<?php

// Parse user input and search a txt file for keywords

function getCriteria($input) {
  echo($input);
  echo("\n");

  $array = explode("\n", file_get_contents("yes-no-question.txt"));
  foreach ($array as &$keyword) {
      echo($keyword);
      echo("\n");
      if(strpos($input, $keyword) !== false){
          echo("yes/no question type\n");
          return 1;
      }
  }

  $array1 = explode("\n", file_get_contents("quantitative-question.txt"));
  foreach ($array as &$keyword) {
      if(strpos($input, $keyword) !== false){
          return 2;
      }
  }

  $array2 = explode("\n", file_get_contents("purpose-question.txt"));
  foreach ($array as &$keyword) {
      if(strpos($input, $keyword) !== false){
          return 3;
      }
  }

  return 0;

}

function formatAnswer($input, $type, $bool) {
  $replace = "";
  $output = "";

  //removing any yes/no question keywords
  if ($type == 1) {
    if ($bool) {
      $output = "Yes, you can";
    }
    else {
      $output = "No, you cannot";
    }
    $array = explode("\n", file_get_contents("yes-no-question.txt"));
    foreach ($array as &$keyword) {
      if(strpos($input, $keyword) !== false){
          $input = str_replace($keyword, $replace, $input);
      }
    }
  }

  if ($type == 2) {
    $array = explode("\n", file_get_contents("quantitative-question.txt"));
    foreach ($array as &$keyword) {
      if(strpos($input, $keyword) !== false){
          $input = str_replace($keyword, $replace, $input);
      }
    }
  }

  if ($type == 3) {
    $array = explode("\n", file_get_contents("purpose-question.txt"));
    foreach ($array as &$keyword) {
      if(strpos($input, $keyword) !== false){
          $input = str_replace($keyword, $replace, $input);
      }
    }
  }

  $array = explode("\n", file_get_contents("words.txt"));
  foreach ($array as &$keyword) {
    if(strpos($input, $keyword) !== false){
        $input = str_replace($keyword, $replace, $input);
    }
  }

  $final = $output . $input; //leading space remove
  $final = str_replace("  ", " ", $final);
  echo($final);


}

formatAnswer("can i drink medication with water", getCriteria("can i drink medication with water"), false)
?>