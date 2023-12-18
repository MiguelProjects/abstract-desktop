<?php
    class getAnswers{
        public $answer;

        function setAnswer($answer){
            $this->answer = $answer;
        }

        function getFinal(){
            return $this->answer;
        }
    }
   
