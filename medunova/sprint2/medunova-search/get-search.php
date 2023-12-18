<?php
	$_REQUEST['answer'] = "---Answer Here---";
    goto leave;
    
    if(!isset($_REQUEST['search'])){
		$reply['status']='debug: no search has been given';
		goto leave;
	}
    
	if(!isset($_SESSION['history'])){
		$_SESSION['history']=array();
	}
    
    $search=$_REQUEST['search'];
    $_SESSION['history'][]=array("search" => $search, "debug" => $search);
    
    $reply['history']=$_SESSION['history'];
    $reply['status']='ok';
    
    leave:
    //print json_encode($reply);
?>