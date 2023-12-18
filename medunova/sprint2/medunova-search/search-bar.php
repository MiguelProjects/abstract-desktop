<?php 

?>

<!DOCTYPE html>
<html lang="en">
	<head>
    <meta charset="utf-8">
    <script type='text/javascript' src=" jquery-3.5.1.min.js"></script>
    <script>
        //the thing below does not work but the one in the body does, why?
        function why(){
        if(document.getElementById("searchRequest").value != ""){
            var txtarea;
            var param = document.getElementById("searchRequest").value;
            txtArea = document.getElementById("results");
            txtArea.value = "User Says:\n" + param + '\n\n' + txtArea.value + '\n';
            //document.getElementById("reee").innerHTML += "lmao";
			//document.getElementById("status").innerHTML += "warning";
            //document.getElementById("results").value += "why \r\n";
            }
        }
        
        function lol(){
        	var txtarea;
            txtArea = document.getElementById("results");
            txtArea.value = "You have reset the chat area, enjoy the cleaner view! Do you have more questions?";
        }
        
        function display(){
        	 if(document.getElementById("searchRequest").value != ""){
                <?php
                require_once("get-search.php");	
                if (isset($_REQUEST['answer'])){
                    $s = $_REQUEST['answer'];
                }else{
                    $s = "Error 500";
                }
                ?>
                var m = '<?php echo $s ;?>';
                txtArea = document.getElementById("results");
            txtArea.value = "Medunova Says:\n" + m + '\n\n' + txtArea.value + '\n';
            }
		}
            
         function bbh(){
         	document.getElementById("results").value += "habibi\n";
         }
            
         function trial(){
         jQuery.getJSON("get-search.php", {}, function(data){
                document.getElementById("results").value += "habibi";
                jQuery("#status").html('trial');
				});		
         }
        
        jQuery(function(){
				jQuery('#searchButton').on('click',function(){
                	why();
					display();
                 //   bbh();
				});
			});
            
    </script>
    </head>
    
    <body>
    <div class="search" style="position:fixed; top:20px; z-index:999;">
    <form id="searchForm"> 
        <input type="text" id="searchRequest"/> 
        <input id="searchButton" type="button" value="search"/>
        <input id="clearButton" type="button" value="clear" onclick="lol();"/>
        <br><br>

        <textarea id="results" name="conversation" value="" readonly style = "width:500px; height:400px; margin:auto;">Hello, welcome to the Medunova chat Experience, how can I help you today?
</textarea>
        
        <p id = "reee"></p>
        <div id="testingstuff"></div>
        <div id="status"></div>
        
    </form>
    </div>
    </body>
</html>