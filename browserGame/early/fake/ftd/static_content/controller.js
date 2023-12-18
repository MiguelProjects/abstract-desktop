var stage=null;
var view = null;
var interval=null;
var credentials={ "username": "", "password":"", "age":"", "playerClass":"", "difficulty":"2"};

// page traversal ids
var toMainUIS = ["#mainNavMain", "#headerSurviveMain", "#headerSurviveAbout", "#aboutNavMain", "#headerSurviveInstruction", "#instructionNavMain", "#gameOverRetry"];
var toAboutUIS = ["#mainNavAbout", "#aboutNavAbout", "#instructionNavAbout"];
var toInstructionUIS = ["#mainNavInstructions", "#aboutNavInstructions", "#instructionNavInstructions"];
var toPlayUIS = ["#mainNavPlay", "#mainPlay", "#aboutNavPlay", "#aboutPlay", "#instructionNavPlay", "#instructionPlay"];
var toLogoutUIS = ["#mainNavLogout", "#registerCancel", "#aboutNavLogout", "#instructionNavLogout", "#gameOverLogout"];

var leaderboard = {"kills":[], "score":[], "timeSurvived":[]};


// usefuls
var pause = false;		
var errors = [];

// ------new------ 
var primary_color = "rgb(53,133,151)";
var secondary_color = "rgb(219, 122, 98)";

var uis = ["#ui_login", "#ui_play", "#ui_register", "#ui_nyi","#ui_about", "#ui_instruct","#ui_gameOver","#ui_pause",'#ui_edit','#ui_edit','#ui_main', '#ui_inGame'];
var heads = ["#Sign-in", "#Play", "#Register", "#About", "#Instructions", "#doWeNeed", "#extra","#GameOver","#PauseAccess",'#editProfile','#Main', '#UI'];
//statemarker changed states #About below
var states = {"#Sign-in":["#ui_login", "#ui_register"], "#Play":["#ui_play"], "#Instructions":["#ui_instruct"], "#About":["#ui_about"], "#GameOver":["#ui_gameOver"],"#PauseAccess":["#ui_pause"],"#editProfile":['#ui_edit'],"#Main":'#ui_main','#UI':['#ui_inGame']};


// vary by difficulty
var num_enemies = 5;
// ------new------


function setupGame(){
        getAccount();getLeaderboard(credentials.difficulty);
        var canvas = document.getElementById('stage');
        canvas.getContext("2d").save();
	stage=new Stage(canvas, credentials.playerClass, parseInt(credentials.difficulty), num_enemies);

	// https://javascript.info/keyboard-events
	document.addEventListener('keydown', moveByKey);
        document.addEventListener('keyup', stopMove);
        document.addEventListener('mousemove', lookTo);
        document.addEventListener('mousedown', shoot);
        document.addEventListener('mouseup', shootRelease);
        // document.addEventListener('Escape', pauseGame);
}

function startGame(){
        $('#ui_pause').hide();


	interval=setInterval(function(){ 
                stage.step(); 
                stage.draw(); 
                updateDisplay();
                if(stage.isEnd()) endGame();
        },50);
}

function pauseGame(){
	clearInterval(interval);
	interval=null;
        this.stage.pause();
        $('#ui_pause').show();
        $("#pauseScore").val(stage.score);
        $("#pauseTime").val(stage.time);
        $("#pauseKills").val(stage.kills);
}

function resetGame(){
        stage.reset();
        var canvas = document.getElementById('stage');
        canvas.getContext("2d").restore();
        // clearInterval(interval);
        // var canvas = document.createElement("CANVAS");
        // document.getElementById('stage').replaceWith(canvas);
        document.addEventListener('keydown', moveByKey);
        document.addEventListener('keyup', stopMove);
        document.addEventListener('mousemove', lookTo);
        document.addEventListener('mousedown', shoot);
        document.addEventListener('mouseup', shootRelease);
        // document.addEventListener('Escape', pauseGame);
        startGame();

}

function endGame(){
        // stage.end();
        // https://javascript.info/keyboard-events
        clearInterval(interval);
	interval=null;

	document.removeEventListener('keydown', moveByKey);
        document.removeEventListener('keyup', stopMove);
        document.removeEventListener('mousemove', lookTo);
        document.removeEventListener('mousedown', shoot);
        document.removeEventListener('mouseup', shootRelease);
        // document.removeEventListener('Escape', pauseGame);

        
        
        
        $("#gameOverScore").val(stage.score);
        $("#gameOverTime").val(stage.time);
        $("#gameOverKills").val(stage.kills);
        // setState("#Play", "#ui_play");
        // $('#ui_play').show();
        $("#ui_gameOver").show();
        updateLeaderboard(credentials.username, stage.kills, stage.score, stage.time, credentials.difficulty);
        
}

function moveByKey(event){
        var key = event.key;
        
	if(key == 'w')
                stage.player.up=true;
        if(key == 'a')
                stage.player.left=true;
        if(key == 's')
                stage.player.down=true;
        if(key == 'd')    
                stage.player.right=true; 
        if(key == 'e')
                stage.player.specialOn(); 
        if(key == 'Escape')
                if(!pause){
                        pauseGame();
                        pause = true;
                }else{
                        startGame();
                        pause = false;
                }            

        updateLook();
        
}


// ------new------ 

function shoot(event){
        stage.player.shoot(color = "green");
}

function shootRelease(event){
        stage.player.shootRelease();
}


function lookTo(event){
        if(stage.player == null) return;

        playerX = stage.player.x;
        playerY = stage.player.y;

        var cRect = stage.canvas.getBoundingClientRect();

        mouseX = Math.round(event.clientX - cRect.left);
        mouseY = Math.round(event.clientY - cRect.top);

        stage.player.lookAt = new Pair(mouseX, mouseY);

        updateLook();
}

function updateDisplay(){
        if(stage.player != null){
                $("#liveScores").text(stage.player.score);
                $("#liveHealth").text(stage.player.health);
                $("#liveTime").text(stage.time);
                $("#liveKills").text(stage.kills);
                // $("#liveScore").val(stage.player.score);
                // $("#liveHealth").val(stage.player.health);
                if(stage.player instanceof Tricky) $("#liveAbility").text("Tricky");
                if(stage.player instanceof Soldier) $("#liveAbility").text("Soldier");
                if(stage.player instanceof Assasin) $("#liveAbility").text("Assassin");
                if(stage.player instanceof Agent) $("#liveAbility").text("Agent");



                if(stage.player != null && stage.player.gun != null){
                        $("#liveAmmo").text(stage.player.gun.ammo);
                        if(stage.player.gun instanceof Gun) $("#liveWeapon").text("Pistol");
                        if(stage.player.gun instanceof Shotgun) $("#liveWeapon").text("Shotgun");
                        if(stage.player.gun instanceof QA) $("#liveWeapon").text("QA");
                        if(stage.player.gun instanceof RailGun) $("#liveWeapon").text("RailGun");
                        if(stage.player.gun instanceof Automatic) $("#liveWeapon").text("Automatic");
                }
        }
}


function stopMove(event){
        var key = event.key;

	if(key == 'w')
                stage.player.up=false;
        if(key == 'a')
                stage.player.left=false;
        if(key == 's')
                stage.player.down=false;
        if(key == 'd')    
                stage.player.right=false; 
        // if(key == 'c')
        //         stage.player.specialOff(); 
        updateLook();
}



function updateLook(){

        diffX = Math.round(stage.player.lookAt.x - stage.width/2);
        diffY = Math.round(stage.player.lookAt.y - stage.height/2);
        
        angle = Math.atan2(diffY, diffX);

        stage.player.lookX = Math.cos(angle) * stage.player.radius;
        stage.player.lookY = Math.sin(angle) * stage.player.radius;
}
// ------new------ 


// --------------------------------------------------------------------------------------------------------------------------------
// Login functions
function login(){
	setState("#Main", "#ui_main");
	credentials =  { 
		"username": $("#username").val(), 
		"password": $("#password").val() ,
                "difficulty": "1",
                "playerClass": "Tricky",
	};

        $.ajax({
                method: "POST",
                url: "/api/auth/login",
                data: JSON.stringify({}),
		headers: { "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password) },
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
                getAccount();

        	setState("#Main", "#ui_main");


        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}




// Login functions
function register(){
        console.log(credentials);
        $.ajax({
                method: "POST",
                url: "/api/user",
                data: JSON.stringify({"username":$("#registerUsername").val(), "password":$("#registerPassword").val(), 
                            "confirmPassword":$("#registerConfirmPassword").val(),"age":$("#registerAge").val(), 
                            "difficulty":  $("#registerDifficulty").val(), "playerClass":  $("input[name='Type']:checked").val()}) ,
		headers: {},
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
                setState("#Sign-in", "#ui_login");
                // console.log("wth");
                insertIntoLeaderboard();
        }).fail(function(err){
                errors.push(JSON.stringify(err.responseJSON));
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
                displayErrors();
        });

}


function updateLeaderboard(username, kills, score, time, difficulty){
        let urlString = "/api/auth/leaderboard/" + difficulty ; 
        // console.log(urlString);
        $.ajax({
                method: "PUT",
                url: urlString,
                data: JSON.stringify({"username":username, "kills": kills, "score":score, "time":time}),
		headers: { "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password) },
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}



// '/api/auth/leaderboard'
function insertIntoLeaderboard(){
        // console.log(credentials);
        $.ajax({
                method: "POST",
                url: "/api/auth/leaderboard",
                data: JSON.stringify({"username":$("#registerUsername").val(), "difficulty":  $("#registerDifficulty").val()}) ,
		headers: {"Authorization": "Basic " + btoa($("#registerUsername").val() + ":" + $("#registerPassword").val()) },
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
                setState("#Sign-in", "#ui_login");
                console.log("added to leaderboard " + $("#registerDifficulty").val());
                // insertIntoLeaderboard();
        }).fail(function(err){
                errors.push(JSON.stringify(err.responseJSON));
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
                displayErrors();
        });

}


function getAccount(){
        // credentials =  { 
	// 	"username": $("#getValue").val(),
	// 	"password": "s"
	// };
        $.ajax({
                method: "GET",
                url: "/api/user/?username="+credentials.username+"&password="+credentials.password,
                data: {}, //JSON.stringify({username:btoa($("#user").val()), "whatever":"whateverx2"}),
		headers: { "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password) },
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                credentials.difficulty=data.difficulty;
                credentials.playerClass=data.class;

                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}



function getLeaderboard(difficulty){
        // /api/leaderboard/:difficulty/:choice
        let urlString1 = "/api/leaderboard/" + difficulty + "/score";
        let urlString2 = "/api/leaderboard/" + difficulty + "/kills";
        let urlString3 = "/api/leaderboard/" + difficulty + "/timeSurvived";

        $.ajax({
                method: "GET",
                url: urlString1,
                // data: JSON.stringify({"username":btoa($("#user").val()), "password":btoa($("#pass").val()), "confirmPassword":btoa($("#confirmPass").val())}),
                data: {}, //JSON.stringify({username:btoa($("#user").val()), "whatever":"whateverx2"}),
		headers: {},
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){

                let j =1;
                for(let i in data){
                        
                        let score = "#score" + j.toString();
                        let nameScore = "#nameScore" + j.toString();
                        console.log(score);
                        $(score).text(data[i].score);
                        $(nameScore).text(data[i].username);      
                        j++;  
                }
                // $("#score1").text(data[0].score);
                // $("#score2").text(data[1].score);
                // $("#score3").text(data[2].score);

                // $("#nameScore1").text(data[0].username);
                // $("#nameScore2").text(data[1].username);
                // $("#nameScore3").text(data[2].username);

                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
                
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });


        $.ajax({
                method: "GET",
                url: urlString2,
                // data: JSON.stringify({"username":btoa($("#user").val()), "password":btoa($("#pass").val()), "confirmPassword":btoa($("#confirmPass").val())}),
                data: {}, //JSON.stringify({username:btoa($("#user").val()), "whatever":"whateverx2"}),
		headers: {},
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                leaderboard.kills=data;
                let j =1;
                for(let i in data){
                        
                        let score = "#kills" + j.toString();
                        let nameScore = "#nameKills" + j.toString();
                        console.log(score);
                        $(score).text(data[i].kills);
                        $(nameScore).text(data[i].username);      
                        j++;  
                }

                // $("#kills1").text(data[0].kills);
                // $("#kills2").text(data[1].kills);
                // $("#kills3").text(data[2].kills);

                // $("#nameKills1").text(data[0].username);
                // $("#nameKills2").text(data[1].username);
                // $("#nameKills3").text(data[2].username);

                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
                
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });


        $.ajax({
                method: "GET",
                url: urlString3,
                // data: JSON.stringify({"username":btoa($("#user").val()), "password":btoa($("#pass").val()), "confirmPassword":btoa($("#confirmPass").val())}),
                data: {}, //JSON.stringify({username:btoa($("#user").val()), "whatever":"whateverx2"}),
		headers: {},
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                // $("#survive1").text(data[0].timeSurvived);
                // $("#survive2").text(data[1].timeSurvived);
                // $("#survive3").text(data[2].timeSurvived);

                // $("#nameSurvive1").text(data[0].username);
                // $("#nameSurvive2").text(data[1].username);
                // $("#nameSurvive3").text(data[2].username);
                let j =1;
                for(let i in data){
                        
                        let score = "#survive" + j.toString();
                        let nameScore = "#nameSurvive" + j.toString();
                        console.log(score);
                        $(score).text(data[i].timesurvived);
                        console.log(data[i].timeSurvived);
                        $(nameScore).text(data[i].username);      
                        j++;  
                }



                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
                
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}


function putAccount(){
        // credentials =  { 
	// 	"username": $("#putName").val(),
	// 	"new_pass": $("#putPass").val(),
        //         "new_user": $("#putNew").val(), 
	// };

        $.ajax({
                method: "PUT",
                url: "/api/auth/user",
                data: JSON.stringify({"username":$("#editUsername").val(), "password":$("#editPassword").val(), "newUser":$("#editNewUsername").val(), 
                                        "newPass":$("#editNewPassword").val(), "age":$("#editAge").val(), "difficulty":$("#editDifficulty").val(), "playerClass":$("input[name='editType']:checked").val()}),
		headers: { "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password) },
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}


function deleteAccount(){
        credentials =  { 
		"username": $("#delete").val(),
		"password": "s"
	};
        $.ajax({
                method: "DELETE",
                url: "/api/user",
                data: JSON.stringify({"username":btoa($("#user").val()), "password":btoa($("#pass").val()), "confirmPassword":btoa($("#confirmPass").val())}),
		headers: { "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password) },
                processData:false,
                contentType: "application/json; charset=utf-8",
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}




// --------------------------------------------------------------------------------------------------------------------------------
// Helper Functions

function displayErrors(){
        for(let e in errors){
                // $("displayError").show();
                $("#displayError").text(errors[e]);
        }
}       


function setState(state, choice){
        let i = 0;


        for(i; i < heads.length; i++){
                if(i < uis.length){
                        $(uis[i]).hide();
                }
                $(heads[i]).css("background-color",primary_color);
        }
        console.log("state: " + state + ",  choice: " + choice);

        if(state in states){
                if(states[state].includes(choice)){
                        // if(choice == "#ui_play"){
                        //         setupGame();
                        //         startGame();
                        // }
                        $(choice).show();
                        $(state).css("background-color",secondary_color)
                }else{
                        console.log("Invalid choice!");
                }
        }else{
                console.log("Invalid State!");
        }   
}


// Using the /api/auth/test route, must send authorization header
function test(){
        $.ajax({
                method: "POST",
                url: "/api/test",
                data: JSON.stringify({"sex":"lol"}),
                processData: false,
                contentType: "application/json; charset=utf-8",
		headers: { "Authorization": "Basic " + btoa(credentials.username + ":" + credentials.password) },
                dataType:"json"
        }).done(function(data, text_status, jqXHR){
                console.log(jqXHR.status+" "+text_status+JSON.stringify(data));
        }).fail(function(err){
                console.log("fail "+err.status+" "+JSON.stringify(err.responseJSON));
        });
}



// --------------------------------------------------------------------------------------------------------------------------------




// --------------------------------------------------------------------------------------------------------------------------------
// Default?
$(function(){
        // Setup all events here and display the appropriate UI     
        // $("displayError").hide();   
        $("#loginSubmit").on('click',function(){ login(); });
        setState("#Sign-in","#ui_login");

        getLeaderboard("1");


        // For testing now, but can be used later on :D
        $("#loginRegister").on('click',function(){ setState("#Sign-in", "#ui_register"); });
        $("#registerCancel").on('click',function(){ setState("#Sign-in", "#ui_login"); });
        $("#test").on('click', function(){ test(); });

        $("#registerForm").submit(function(event){ 
                // <-- checker here
                event.preventDefault();
                register();
        });

        $("#editForm").submit(function(event){ 
                // <-- checker here
                event.preventDefault();
                putAccount();
        });

        $("#getSubmit").on('click',function(){ getAccount(); });
        $("#putSubmit").on('click',function(){ putAccount(); });
        $("#deleteSubmit").on('click',function(){ deleteAccount(); });


       $("#playAgain").on('click',function(){setState("#Play", "#ui_play"); resetGame(); });
       
        console.log("yo");

        // for(let s in states){
        //         $(s).on('click', function(){ setState(s, states[s][0]); });
        // }
        
        for(let m in toMainUIS){
                console.log("in Main: " + m);
                $(toMainUIS[m]).on('click', function(){ getLeaderboard(credentials.difficulty);setState("#Main", "#ui_main");});
        }
        for(let a in toAboutUIS){
                $(toAboutUIS[a]).on('click', function(){ setState("#About", "#ui_about"); });
        }
        for(let i in toInstructionUIS){
                $(toInstructionUIS[i]).on('click', function(){ setState("#Instructions", "#ui_instruct"); });
        }
        for(let p in toPlayUIS){
                $(toPlayUIS[p]).on('click', function(){ setState("#Play", "#ui_play"); resizeCanvas(); setupGame(); startGame(); $("#ui_inGame").show();});
        }
        for(let l in toLogoutUIS){
                $(toLogoutUIS[l]).on('click', function(){ setState("#Sign-in", "#ui_login"); });
        }

});

