<?php
require "Medicine.php";

class Search {
  // Properties
  public $data;

  // Methods
  public function __construct($data) {
    $this->data = $data;
}
  function getLoadData() {
    return -1;
  }
  function getKeyword() {
    return -1;
  }
  function getAnswer(){
    return -1;
  }

}
?>