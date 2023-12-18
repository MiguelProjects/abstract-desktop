// https://www.freecodecamp.org/news/express-explained-with-examples-installation-routing-middleware-and-more/ 
// https://medium.com/@viral_shah/express-middlewares-demystified-f0c2c37ea6a1
// https://www.sohamkamani.com/blog/2018/05/30/understanding-how-expressjs-works/

var port = 8000; 
var express = require('express');
var app = express();
const pino = require('express-pino-logger')();


app.use(pino);

const { Pool } = require('pg')
const pool = new Pool({
    user: 'webdbuser',
    host: 'localhost',
    database: 'webdb',
    password: 'password',
    port: 5432
});

const bodyParser = require('body-parser'); // we used this middleware to parse POST bodies

function isObject(o){ return typeof o === 'object' && o !== null; }
function isNaturalNumber(value) { return /^\d+$/.test(value); }

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw()); // support raw bodies

app.use('/api/tester', function(req,res,next){
	// //console.log("being used");
	next();
});

// Non authenticated route. Can visit this without credentials
app.post('/api/tester/test', function (req, res) {
	res.status(200); 
	// //console.log(JSON.stringify(req.body));
	res.json({"message":"got here", "request": req.body}); 
});

/** 
 * This is middleware to restrict access to subroutes of /api/auth/ 
 * To get past this middleware, all requests should be sent with appropriate
 * credentials. Now this is not secure, but this is a first step.
 *
 * Authorization: Basic YXJub2xkOnNwaWRlcm1hbg==
 * Authorization: Basic " + btoa("arnold:spiderman"); in javascript
**/
app.use('/api/auth', function (req, res,next) {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
  	}
	try {
		// var credentialsString = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
		var m = /^Basic\s+(.*)$/.exec(req.headers.authorization);

		var user_pass = Buffer.from(m[1], 'base64').toString()
		m = /^(.*):(.*)$/.exec(user_pass); // probably should do better than this

		var username = m[1];
		var password = m[2];

		// //console.log(username+" "+password);

		let sql = 'SELECT * FROM ftduser WHERE username=$1 and password=sha512($2)';
        	pool.query(sql, [username, password], (err, pgRes) => {
  			if (err){
                		res.status(403).json({ error: 'Not authorized'});
			} else if(pgRes.rowCount == 1){
				next(); 
			} else {
                		res.status(403).json({ error: 'Not authorized'});
        		}
		});
	} catch(err) {
               	res.status(403).json({ error: 'Not authorized'});
	}
});



// -----------------------------------------------------------------------------------------------------------------------------------
// Some MIDDLEWARE for leaderboard related requests

// After this, any request with the following route can trust their difficulty parameter

app.use('/api/auth/leaderboard/:choice', function(req, res, next){
	try{
		if(req.params.choice != "kills" && req.params.choice != "score" && req.params.choice != "timeSurvived"){
			return res.status(400).json({ error: 'Invalid paramater choice - must be either kills or score or timeSurvived' });
		}
	}catch(err){
		return res.status(400).json({ error: 'Invalid format' });
	}
	next();
});

//END MIDDLEWARE
// -----------------------------------------------------------------------------------------------------------------------------------



// -----------------------------------------------------------------------------------------------------------------------------------
// For POST api calls

app.post('/api/user',function(req,res){
	// //console.log(req.body);
	if(!req.body.username || !req.body.playerClass){
		return res.status(400).json({ error: 'Username/(Confirm)Password/Age/Difficulty not sent' });
	}
	try{
		let user = req.body.username;

		let playerClass = req.body.playerClass;

		// //console.log(user + " " + pass);

		let sql = "INSERT INTO ftduser (username class) values($1, $2);";

		pool.query(sql, [user, playerClass], (err, pgRes) =>{
			if(err){
				res.status(500).json({ error: 'Database Error'});
			}

			res.status(200);	
			res.json({});
		});


	}catch(err){
		res.status(500).json({ error: 'Server Error'});
	}
});


app.post('/api/auth/leaderboard',function(req,res){
	// //console.log(req.body);
	if(!req.body.username){
		return res.status(400).json({ error: 'Username not sent' });
	}
	try{
		let user =req.body.username;

		//console.log(user + " " + pass);

		
		let sql = "INSERT INTO  ftdstats  (username, kills, score, timeSurvived) values($1, 0, 0, 0.0);";

		pool.query(sql, [user], (err, pgRes) =>{
			if(err){
				// //console.log(err);
				return res.status(500).json({ error: 'Database Error'});
			}
			res.status(200);	
			res.json({});
		});


	}catch(err){
		// //console.log(err);
		res.status(403).json({ error: 'Not authorized'});
	}
});

//END POSTs
// -----------------------------------------------------------------------------------------------------------------------------------


// <----- USE to check username validity???? if body.user and invalid => return 400

// -----------------------------------------------------------------------------------------------------------------------------------
// For GET api calls


// app.use('/api/user', function(req,res)){
	//console.log("being used");
// }

app.get('/api/user', function(req,res){
	let status = 400;

	var user = "";
	try{
		if(req.query.username){
			user = req.query.username;
		}else if(req.body.username){
			user = req.body.username;
		}else{
			return res.status(400).json({ error: 'No username' });
		}
	}catch(err){
		return res.status(400).json({ error: 'Invalid Format'});
	}

	// if (!req.headers.authorization) {
	// 	return res.status(403).json({ error: 'No credentials sent!' }); <-------- NO NEED FOR Authorization
  	// } 
	
	  try {
		// var credentialsString = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
		
		// //console.log("user:" + user);

		let sql = "SELECT * FROM ftduser WHERE username=$1";

		pool.query(sql, [user], (err, pgRes) =>{
			if(err){
				// //console.log("here1 :::");
				return res.status(500).json({ error: 'Database Error'});
			}
			if(pgRes.rowCount != 1){
				// //console.log("here2 :::");
				return res.status(404).json({ error: 'Username not found in database'});
			}
			res.status(200);	
			res.json(pgRes.rows[0]);

		});
		


	}catch(err){
		// //console.log(err);
		res.status(500).json({ error: 'Server Error'});
	}
});


app.get('/api/user/:username', function(req,res){
	let status = 400;

	var user = "";
	try{
		if(req.params.username){
			user = req.params.username;
		}else{
			return res.status(500).json({ error: 'Database Error'});
		}
		if(user == undefined){
			return res.status(400).json({ error: 'Invalid Format'});
		}
	}catch(err){
		return res.status(400).json({ error: 'Invalid Format'});
	}

	// if (!req.headers.authorization) {
	// 	return res.status(403).json({ error: 'No credentials sent!' }); <-------- NO NEED FOR Authorization
  	// } 
	
	  try {
		// var credentialsString = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
		
		let sql = "SELECT * FROM ftduser WHERE username=$1";

		pool.query(sql, [user], (err, pgRes) =>{
			if(err){
				return res.status(500).json({ error: 'Database Error'});
			}
			if(pgRes.rowCount != 1){
				return res.status(404).json({ error: 'Username not found in database'});
			}
			res.status(200);
			res.json({"username":pgRes.rows[0].username, "password":pgRes.rows[0].password});

		});
		


	}catch(err){
		// //console.log(err);
		res.status(500).json({ error: 'Server Error'});
	}
});





app.get('/api/leaderboard/:choice', function(req,res){
	//console.log("seeeex");
	// //console.log("GET"); 

	var choice = "";
	try{

		choice = req.params.choice;
		if(!["kills","score", "timeSurvived"].includes(choice)){
			return res.status(400).json({error: 'Invalid Choice'});
		}
	}catch(err){
		return res.status(400).json({ error: 'Invalid Format for Difficulty'});
	}


	try {
	//console.log("user:" + user);
	
	
		let sql = "SELECT * FROM ftdstats ORDER BY " + choice + " DESC LIMIT 3;";
		// //console.log([diff,choice]);
		pool.query(sql, [], (err, pgRes) =>{	
			if(err){
				// //console.log(err);
				return res.status(500).json({ error: 'Database Error'});
			}
			
			// //console.log(pgRes.rows);
			res.status(200);	
			res.json(pgRes.rows);

		});

	}catch(err){
		// //console.log(err);
		res.status(500).json({ error: 'Server Error'});
	}
});


//END GETs
// -----------------------------------------------------------------------------------------------------------------------------------

// Everything past here should be authorised.

// -----------------------------------------------------------------------------------------------------------------------------------
// For DELETE api calls


app.delete('/api/user', function(req,res){
	let status = 400;

	if (!req.body.username) {
		return res.status(403).json({ error: 'No credentials sent!' });
  	}
	try {
		// var credentialsString = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
		var m = /^Basic\s+(.*)$/.exec(req.headers.authorization);

		var user_pass = Buffer.from(m[1], 'base64').toString()
		m = /^(.*):(.*)$/.exec(user_pass); // probably should do better than this

		var user = m[1];
		// //console.log(user);

		let sql = "DELETE FROM ftduser WHERE username=$1;";

		pool.query(sql, [user], (err, pgRes) =>{
			if(err){
				// //console.log("here1");
				res.status(403).json({ error: 'Not authorized'});
			}

			// //console.log(pgRes.rows);
			res.status(200);	
			res.send();
		//	res.json({"username":pgRes.rows[0].username, "password":pgRes.rows[0].password})

		});
	}catch(err){
		// //console.log(err);
		res.status(403).json({ error: 'Not authorized'});
	}
});

//END DELETEs
// -----------------------------------------------------------------------------------------------------------------------------------


// -----------------------------------------------------------------------------------------------------------------------------------
// For PUT api calls






app.put('/api/auth/user', function(req,res){
	let status = 400;

	// //console.log(req.body);
	// return res.status(403).json({ error: 'No credentials sent!' });
	
	var user = "";
	var new_user = "";
	var new_pass = "";
	var difficulty = -1;
	var age = -1;

	try{
		if (!req.body.username || req.body.username == "") {
			return res.status(400).json({ error: 'No username' });
		}
		if (!req.body.newUser || req.body.newUser == "") {
			return res.status(400).json({ error: 'No new username' });
		}
		if (!req.body.newPass || req.body.newPass == "") {
			return res.status(400).json({ error: 'No new password' });
		}
		if (!req.body.age || req.body.age == "") {
			return res.status(400).json({ error: 'No age' });
		}
		if (!req.body.difficulty || req.body.difficulty == "") {
			return res.status(400).json({ error: 'No difficulty' });
		}
		if (!req.body.playerClass || req.body.playerClass == "") {
			return res.status(400).json({ error: 'No difficulty' });
		}

		user = req.body.username;
		new_user = req.body.newUser;
		new_pass = req.body.newPass;
		age = parseInt(req.body.age);
		difficulty = parseInt(req.difficulty);
		playerClass = req.body.playerClass;

	}catch(err){
		return res.status(400).json({ error: 'Invalid format' });
	}

	try {
		// var credentialsString = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString();
		
		//console.log(user, new_user, new_pass, difficulty);

		let sql = "UPDATE ftduser SET password = sha512($1), username = $2, difficulty = $3, age = $4, class = $5 WHERE username = $6;";

		pool.query(sql, [new_pass, new_user, difficulty, age, playerClass, user], (err, pgRes) =>{
			if(err){
				//console.log("here1");
				// //console.log(err);
				return res.status(500).json({ error: 'Database error'});
			}

			res.status(200);	
			res.json({});

		});
	}catch(err){
		// //console.log(err);
		res.status(500).json({ error: 'Server Error'});
	}
});



app.put('/api/auth/leaderboard/', function(req,res){


	// var choice = "";
	var user = "";
	var kills = 0; var score = 0; var time = 0;
	try{


		if (!req.body.username) {
			return res.status(400).json({ error: 'No username' });
		}
		if (!req.body.kills) {
			return res.status(400).json({ error: 'No kills' });
		}
		if (!req.body.score) {
			return res.status(400).json({ error: 'No score' });
		}
		if (!req.body.time) {
			return res.status(400).json({ error: 'No time' });
		}
		user = req.body.username;
		kills = parseInt(req.body.kills);
		score = parseInt(req.body.score);
		time = parseFloat(req.body.time);

	}catch(err){
		return res.status(400).json({ error: 'Invalid Format for Difficulty'});
	}


	try {
	//console.log("user:" + user);
	//"UPDATE ftduser SET password = sha512($1), username = $2 WHERE username = $3;"
	
	
		let sql = "UPDATE ftdstats SET score=$1 WHERE username=$2 AND score<$1;";
		//console.log([diff,choice]);
		// //console.log( [score, user]);
		pool.query(sql, [score, user], (err, pgRes) =>{	
			if(err){
				// //console.log(err);
				return res.status(500).json({ error: 'Database Error'});
			}
			
			//console.log(pgRes.rows);
			// res.status(200);	
			// res.json(pgRes.rows);

		});

		sql = "UPDATE ftdstats SET kills=$1 WHERE username=$2 AND kills<$1;";
		//console.log([diff,choice]);
		// //console.log( [kills, user]);
		pool.query(sql, [kills, user], (err, pgRes) =>{	
			if(err){
				// //console.log(err);
				return res.status(500).json({ error: 'Database Error'});
			}
			
			//console.log(pgRes.rows);
			// res.status(200);	
			// res.json(pgRes.rows);

		});

		sql = "UPDATE ftdstats SET timeSurvived=$1 WHERE username=$2 AND timeSurvived<$1;";
		//console.log([diff,choice]);
		// //console.log( [time, user]);
		pool.query(sql, [time, user], (err, pgRes) =>{	
			if(err){
				// //console.log(err);
				return res.status(500).json({ error: 'Database Error'});
			}
			
			// //console.log(pgRes.rows);
			res.status(200);	
			res.json(pgRes.rows);

		});
	


	}catch(err){
		// //console.log(err);
		res.status(500).json({ error: 'Server Error'});
	}
});

//END PUTs
// -----------------------------------------------------------------------------------------------------------------------------------




// All routes below /api/auth require credentials 
app.post('/api/auth/login', function (req, res) {
	res.status(200); 
	res.json({"message":"authentication success"}); 
});

app.post('/api/auth/test', function (req, res) {
	res.status(200); 
	res.json({"message":"got to /api/auth/test"}); 
});

app.use('/',express.static('static_content')); 

app.listen(port, function () {
  	// //console.log('Example app listening on port '+port);
});


//-----------------------------------------------------------------------------------------------------------------------------------
// WebSockets Start here
var webSocketPort = port+1;
var clientId = 0;

//import model here 
var model = require("./static_content/model");
var stage = new model.stage();
var players = {};
var assets = {};
var details = {};


// Web Sockets
var WebSocketServer = require('ws').Server
   ,wss = new WebSocketServer({port: 8082});





// Maybe we can say who got disconnected?
wss.on('close', function() {
    // //console.log('disconnected');
	// stage.removePlayer()
	// Remove all players and add only present players.
});


// Resets the details and assets dictionaries with updated information
function updateList(){
	details = {}; assets = {};
	for(let ws of wss.clients){
		details[ws.id] = players[ws.id].playerInfo();		
	}
	assets = stage.getAsset();
}

function updatePlayerLook(player){

	// diffX = Math.round(player.lookAt.x - player.position.x);
	// diffY = Math.round(player.lookAt.y - player.position.y);

	diffX = Math.round(player.lookAt.x - stage.width/2);
	diffY = Math.round(player.lookAt.y - stage.height/2);
	
	angle = Math.atan2(diffY, diffX);

	player.lookX = Math.cos(angle) * player.radius;
	player.lookY = Math.sin(angle) * player.radius;
}


// Update every player with the current state of the game
wss.broadcast = function(){
	updateList(); // Make sure info is up to date
	for(let ws of this.clients){ 
		updatePlayerLook(players[ws.id]);
		let message = {"details":details[ws.id], "assets":assets};
		//console.log(JSON.stringify(message));
		ws.send(JSON.stringify(message)); 
	}
}


// Make the player join the game
wss.on('connection', function(ws) {
	// Assign joining player an id
	ws.id = clientId;
	clientId++;

	// Make a player model for the new socket
	let color = "rgb(" + (Math.random()*255).toString() + "," + (Math.random()*255).toString() + "," 
						+ (Math.random()*255).toString() + ")"; 
	players[ws.id] = new model.player(stage, stage.spawnPlayerPosition(), new model.pair(0,0), 
										color, 20, ws.id);

	ws.on('message', function(message) {
		data = JSON.parse(message);
		//console.log(":D");
		//console.log(data);
		//console.log(":(");
		// This is the first message -> Add them to the game
		if(data.first){
			// Add the player for this 
			switch(data.class){
				case "Tricky":
					players[ws.id] = new model.tricky(stage, stage.spawnPlayerPosition(), new model.pair(0,0), 
										color, 20, data.username);
					break;
				case "Soldier":
					players[ws.id] = new model.soldier(stage, stage.spawnPlayerPosition(), new model.pair(0,0), 
										color, 20, data.username);
					break;
				case "Assassin":
					players[ws.id] = new model.assassin(stage, stage.spawnPlayerPosition(), new model.pair(0,0), 
										color, 20, data.username);
					break;
				case "Agent":
					players[ws.id] = new model.agent(stage, stage.spawnPlayerPosition(), new model.pair(0,0), 
										color, 20, data.username);
					break;
				default:
					players[ws.id] = new model.player(stage, stage.spawnPlayerPosition(), new model.pair(0,0), 
										color, 20, data.username);
					break;

			}	
			stage.addPlayer(players[ws.id]);


		// This is not the first message -> They made a move
		}else{
			//console.log("wtyh");
			players[ws.id].move = data.move; // How they move
			players[ws.id].lookAt = new model.pair(data.lookAt.x, data.lookAt.y);
			if(data.special)players[ws.id].specialOn(); // Did they activate special
			updatePlayerLook(players[ws.id]);
			if(data.shoot)players[ws.id].shoot(color = "green");
			if(data.shootRelease)players[ws.id].shootRelease();

			
		}
		//console.log("recieved");
	});

	ws.on('close', function(){
		// //console.log(ws.id + " got disconnected");
		stage.removePlayer(players[ws.id]); // Remove the player from the game - he is no longer playing
		delete players[ws.id]; delete details[ws.id]; delete assets[ws.id]; // Get rid of information regarding disconnected player
		// TO DO: Maybe make a request to store information in database...
	});
});




// Set up an interval -> Update stage, then broadcast :) 
function startGame(){
	interval=setInterval(function(){ 
			stage.step()
			wss.broadcast();
	},50);
}

startGame();
