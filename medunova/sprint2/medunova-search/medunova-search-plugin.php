<?php
/**
 * Plugin Name: Medunova Search Plugin
 * Plugin URI: https://beta.kiuloper.com/medunova-search-plugin
 * Description: This is the medunova search plugin implemented by CSC301 Students
 * Version: 1.0
 * Author: CSC301Dalmations
 * Author URI: https://beta.kiuloper.com
 */
 
 
//function initial_test ( $content ) {
//    return $content .= '<p>This Plugin is working!?0!</p>';
//}


function add_search () {
	if ( is_single()) { 
    	//echo("it be like that sometimes");
        $searchHTML = file_get_contents(plugins_url('search-bar.php',__FILE__ ));
    	echo $searchHTML;
	}
}


add_action( 'wp_body_open', 'add_search' );

//add_action( 'the_content', 'initial_test' ); <------------------------
//echo 'Testing 1 3 2 4 5 everybody in the car so come one lets drive'; <- leave for future testing pruposes
 

?>