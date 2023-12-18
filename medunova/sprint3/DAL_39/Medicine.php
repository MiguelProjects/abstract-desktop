<?php
require "Search";
require "Database";

class Medicine {
  // Properties
  public $data;
  public $search;

  // Methods
  public function __construct($data, $search) {
    $this->data = $data;
    $this->search = $search;
}
  function pulldb_data() {
    return -1;
  }
  function request_Search() {
    return -1;
  }
  function getSearch(){
    return -1;
  }
  function sendSigdb(){
    return -1;
  }
  function getMed(){
    return -1;
  }

}
?>