// const { start } = require("node:repl");

// const { count } = require("node://console");

function randint(n){ return Math.round(Math.random()*n); }
function rand(n){ return Math.random()*n; }

class Stage {
	constructor(num_enemies=10, num_obstacles=5){
		// this.canvas = canvas;
		// this.difficulty = difficulty;
		// this.playerClass = playerClass;
		// this.canvas.getContext("2d").
		// this.canvas.getContext('2d').clearRect(-this.width, -this.height, 3*this.width, 3*this.height);
		this.initialise();
	}

	isSafeSpawn(pos, radius, rectangle=false){
		// bounce off the walls
		if(pos.x-radius<0 || pos.x+radius>this.width || pos.y-radius<0 || pos.y+radius>this.height){
			return false;
		}

		for(let a = 0; a < this.actors.length; a++){
			let diffX = this.actors[a].position.x - pos.x;
			let diffY = this.actors[a].position.y - pos.y;

			let distance = new Pair(diffX, diffY).normalize();

			if(distance < this.actors[a].radius + radius){
				return false;
			}
		}
		return true

	}

	addPlayer(player){
		this.addActor(player);
		this.player.push(player);
	}

	getAsset(){
		var assets = []
		for(let a of this.actors){
			assets.push(a.getAsset());
		}	
		return assets;
	}

	removePlayer(player){
		this.removeActor(player);
		var index=this.player.indexOf(player);
		if(index!=-1){
			this.player.splice(index,1);
		}
	}

	addActor(actor){
		this.actors.push(actor);
	}

	removeActor(actor){
		var index=this.actors.indexOf(actor);
		if(index!=-1){
			this.actors.splice(index,1);
		}
	}

	// Take one step in the animation of the game.  Do this by asking each of the actors to take a single step. 
	// NOTE: Careful if an actor died, this may break!
	step(){
		for(var i=0;i<this.actors.length;i++){
			this.actors[i].step();
		}
		this.endTime = new Date().getTime();
		this.time = (this.endTime - this.startTime)/1000;
		this.spawnEnemy(this.num_enemies);
		this.spawnCrate();
		this.spawnObstacle(this.num_obstacles);


	}

	draw(){
		var context = this.canvas.getContext('2d');
		
		// //console.log("movex: " + this.playerMove.x + ",  movey " + this.playerMove.y);
		// original state
		context.translate(-this.playerMove.x, -this.playerMove.y);
		// draw according to co-ordinates

		if(this.gameOver){
			//console.log("===========================================");
			context.setTransform(1, 0, 0, 1, 0, 0);
			return;
		}
		context.clearRect(-this.width, -this.height, 3*this.width, 3*this.height);

		
		// //console.log("... just checking");
		context.fillStyle = "black";
		context.beginPath();
		context.rect(-this.width, -this.height, 3*this.width, 3*this.height);
		context.stroke();
		context.fill();
		context.closePath();

		context.fillStyle = "rgb(177, 177, 177)";
		context.beginPath();
		context.rect(0, 0, this.width, this.height);
		context.stroke();
		context.fill();
		context.closePath();

		// context.beginPath();
		// context.rect(1, 1, this.width-2, this.height-2);
		// context.stroke();	
		// context.closePath();
		
		for(var i=0;i<this.actors.length;i++){
			context.beginPath();
			this.actors[i].draw(context);
			context.closePath(); // just incase
			context.beginPath();
			context.closePath();
				
		}

		if (this.player != null){
			this.playerMove.x = -this.player.x + this.canvas.width / 2;
			this.playerMove.y = -this.player.y + this.canvas.height / 2;
		}


		// //console.log("Move X:" + this.playerMove.x + ",  Move Y:" + this.playerMove.y);
		// //console.log("Moved X:" + this.playerMoved.x + ",  Moved Y:" + this.playerMoved.y);
		// //console.log("====");

		
		context.translate(this.playerMove.x, this.playerMove.y);

	//	if(this.gameOver) endGame();

		// this.playerMoved.x = this.playerMove.x;
		// this.playerMoved.y = this.playerMove.y;

		
	}

	// return the first actor at coordinates (x,y) return null if there is no such actor
	getActor(x, y){
		for(var i=0;i<this.actors.length;i++){
			if(this.actors[i].x==x && this.actors[i].y==y){
				return this.actors[i];
			}
		}
		return null;
	}

	isEnd(){
		// this.score = this.player.score;
		return this.gameOver;
	}

	reset(){ // Would be called after game is over
	//	this.draw();
		this.initialise();
	}

	pause(){
		this.score = this.player.score;
		// this.time = 
	}


	initialise(num_enemies=5, num_obstacles=10){
		this.actors=[]; // all actors on this stage (monsters, player, boxes, ...)
		this.player=[]; // a special actor, the player

		this.num_enemies = num_enemies;
		this.num_obstacles = num_obstacles;
	
		// the logical width and height of the stage
		this.width=1000;
		this.height=1000;

		// Add the player to the center of the stage
		var velocity = new Pair(0,0);
		var radius = 20;
		var colour= 'rgba(0,0,0,1)';
		var position = new Pair(Math.random()*this.width, Math.random()*this.height);

		this.gameOver = false;

		this.score = 0;
		this.startTime = new Date().getTime();
		this.endTime = this.startTime;
		this.time = 0;
		this.kills = 0;

		this.enemyActors = 0; // Count of non-playable assets
		this.obstacles = 0;
		this.crates = [0,0,0,0];

	
		// Add in some Balls
		var total=0;
		while(total>0){
			var x=Math.floor((Math.random()*this.width)); 
			var y=Math.floor((Math.random()*this.height)); 
			if(this.getActor(x,y)===null){
				var velocity = new Pair(rand(20), rand(20));
				var red=randint(255), green=randint(255), blue=randint(255);
				var radius = randint(20);
				var alpha = Math.random();
				var colour= 'rgba('+red+','+green+','+blue+','+alpha+')';
				var position = new Pair(x,y);
				var b = new Actor(this, position, velocity, colour, radius);
				this.addActor(b);
				total--;
			}
		}
		
		// Spawn initial enemies
		for(let i = 0; i < num_enemies; i++){
			this.spawnEnemy(num_enemies);
		}

		// Spawn some initial obstacles
		for(let j = 0; j < num_obstacles; j++){
			this.spawnObstacle(num_obstacles);
		}

		
		// this.playerMoved = new Pair(0,0);
		//this.playerMove = new Pair(this.player.position.x-Math.floor(this.width/2), this.player.position.y-Math.floor(this.height/2));
	}

	spawnEnemy(maximum){
		if(this.enemyActors > maximum || Math.random()*3 < 1) return;
		
		let randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
		// Add check to make sure no spawn withins! <--------------------------------------------
		//randomPos = new Pair(30, 30);
		while (!this.isSafeSpawn(randomPos, 10)){
			randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
		}
		
		var enemies = [
			new NPC(this, randomPos, new Pair(0,0), "red", 20),
			new Sniper(this, randomPos, new Pair(0,0), "rgb(28, 113, 18)", 20),
			new Coward(this, randomPos, new Pair(0,0), "rgb(254, 222, 146)", 20)
		];

		this.addActor(enemies[Math.floor(Math.random()*enemies.length)]);
		this.enemyActors ++;
	}

	spawnPlayerPosition(radius){
		let randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));

		while (!this.isSafeSpawn(randomPos, radius)){
			randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
		}

		return randomPos;
	}


	spawnObstacle(maximum){
		if(this.obstacles >= maximum)return;

		let randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
		let randomRad = Math.round(Math.random()*20) + 5;
		// Add check to make sure no spawn withins! <--------------------------------------------
		while (!this.isSafeSpawn(randomPos, randomRad)){
			randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
			randomRad = Math.round(Math.random()*20) + 5;
		}

		if(this.obstacles < 2*maximum/5){
			var obstacle = new Obstacle(this, randomPos, new Pair(0,0), "black", randomRad);
			obstacle.health = Infinity; // Indestructible
			this.addActor(obstacle);
			this.obstacles++;
			return;
		}

		var obstacle = new Obstacle(this, randomPos, new Pair(0,0), "blue", randomRad);
		this.addActor(obstacle);
		this.obstacles++;
	}

	spawnCrate(){
		let randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
		// let randomRad = Math.round(Math.random()*20) + 5;
		// Add check to make sure no spawn withins! <--------------------------------------------


		var crate = [
			new omegaCrate(this, randomPos, new Pair(0,0), "white", 10),
			new healthCrate(this, randomPos, new Pair(0,0), "green", 4),
			new ammoCrate(this, randomPos, new Pair(0,0), "brown", 5),
			new weaponCrate(this, randomPos, new Pair(0,0), "grey", 7)
		];

		var crateTotal = this.crates[0] + this.crates[1] + this.crates[2] + this.crates[3];
		
		if( crateTotal > 3 || Math.random()*5 > 1) return;

		var choice = Math.floor(Math.random()*crate.length);

		if(crateTotal == 0) choice = 3;
		if(this.crates[3] <= 0){
			choice = 3
		}

		var rad = [10,4,5,7][choice];

		while (!this.isSafeSpawn(randomPos, rad)){
			randomPos = new Pair(Math.round(Math.random()*this.width), Math.round(Math.random()*this.height));
			// randomRad = Math.round(Math.random()*20) + 5;
		}
		
		this.addActor(crate[choice]);
		this.crates[choice]++;

	}

	
} // End Class Stage

class Asset{
	constructor(pos, shape, rad, color){
		this.position = pos;
		this.shape = shape;
		this.radius = rad;
		this.color = color;
	}

	getDict(){
		return {
			"position": {"x":this.position.x, "y": this.position.y},
			"shape": this.shape,
			"radius": this.rad,
			"color": this.color
		}
	}
}



class Pair {
	constructor(x,y){
		this.x=x; this.y=y;
	}

	toString(){
		return "("+this.x+","+this.y+")";
	}

	normalize(){
		var magnitude=Math.sqrt(this.x*this.x+this.y*this.y);
		this.x=this.x/magnitude;
		this.y=this.y/magnitude;

		// to make collision checks a lot easier
		return magnitude;
	}
}

class Collision{
	constructor(collide, actor, suggested=null){
		this.collide = collide;
		this.actor = actor;
		this.suggested = suggested;
	}

	suggestedPos(other){
		let diffX = Math.round(other.position.x - this.actor.position.x);
        let diffY = Math.round(other.position.y - this.actor.position.y);
        
        let angle = Math.atan2(diffY, diffX);

        let suggestedX = this.actor.x + Math.cos(angle)*(this.actor.radius + other.radius);
        let suggestedY = this.actor.y + Math.sin(angle)*(this.actor.radius + other.radius);

		return new Pair(suggestedX, suggestedY);
	}
}

class Actor {
	constructor(stage, position, velocity, colour, radius, username=-1){
		this.stage = stage;
		this.position=position;
		this.intPosition(); // this.x, this.y are int version of this.position

		this.velocity=velocity;
		this.colour = colour;
		this.radius = radius;
		this.height = radius;

		this.lookY = 0;
		this.lookX = 0;
		
		this.maxHealth = 500;
		this.health = this.maxHealth; // Default health amount

		this.rectangle = false;

		this.username = username;

		this.hitWorth = 1;
		this.killWorth = 5;

		this.score = 0;

		this.gun = null;

		this.owner = this;

	}

	findNearestPlayer(){
		var shortestDistance = Infinity;
		var nearestPlayer = null;
		for(let i = 0; i < this.stage.player.length; i++){
			let player = this.stage.player[i];
			let distance = new Pair(this.position.x - player.position.x, this.position.y - player.position.y).normalize();
			if(distance < shortestDistance){
				shortestDistance = distance;
				nearestPlayer = player;
			}
		}
		return nearestPlayer;
	}


	getAsset(){
		var shape = "c";
		if(this.rectangle)shape = "r";
		var health = this.health; var maxHealth = this.maxHealth;
		if(this instanceof Bullet){
			health = -1;
			maxHealth = -1;
		}
		var username = "";
		if(this instanceof Player){
			username = this.username;
		}
		return {
			"position": {"x":this.position.x, "y": this.position.y},
			"shape": shape,
			"radius": this.radius,
			"color": this.colour,
			"look":{"x":this.lookX, "y":this.lookY},
			"health": health,
			"maxHealth": maxHealth,
			"username": username
		}
	}



	checkWall(){
		if(this.position.x - this.radius<0){
			this.position.x=this.radius + 1;
		}
		if(this.position.x + this.radius>this.stage.width){
			this.position.x=this.stage.width-this.radius - 1;
		}
		if(this.position.y - this.radius<0){
			this.position.y=this.radius + 1;
		}
		if(this.position.y + this.radius>this.stage.height){
			this.position.y=this.stage.height-this.radius - 1;
		}

	}
	
	headTo(position){
		this.velocity.x=(position.x-this.position.x);
		this.velocity.y=(position.y-this.position.y);
		this.velocity.normalize();
	}


	topUp(){
		this.health = this.maxHealth;
	}


	reFill(){
		if (this.gun != null){
			this.gun.fill();
		}
	}

	updateDeath(){
		return false;
	}



	toString(){
		return this.position.toString() + " " + this.velocity.toString();
	}

	step(){

		let originalX = this.position.x; let originalY = this.position.y;
			
		this.position.x=this.position.x+this.velocity.x;
		this.position.y=this.position.y+this.velocity.y;
			
		// bounce off the walls
		this.checkWall();


		this.intPosition();

		let collision = this.checkCollide(originalX, originalY);
		if(collision.collide){
			// this.position.x = originalX;
			// this.position.y = originalY;
			if(collision.actor instanceof Bullet && collision.actor.gun.owner != this){
				collision.actor.doDamage(new Collision(true, this));
			}

			if(collision.actor instanceof omegaCrate){
				collision.actor.fillUp(new Collision(true, this));
			}

			if(!(collision.actor instanceof Bullet) && !(collision.actor instanceof omegaCrate))this.position = collision.suggested;

			//console.log("is omegaCrate... " + collision.actor instanceof omegaCrate);
		}
	}
	
	intPosition(){
		this.x = Math.round(this.position.x);
		this.y = Math.round(this.position.y);
	}

	draw(context){
		context.fillStyle = this.colour;
   		// context.fillRect(this.x - this.radius/2, this.y, this.radius,this.radius);
		context.beginPath(); 
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false); 
		context.fill();   
		context.closePath();
	}

	drawHealthBar(context){
		var startPos = new Pair(this.position.x - this.radius, this.position.y + this.radius + 2);
		
		// Black background
		context.fillStyle = "black";
		context.beginPath();
		context.rect(startPos.x - 1, startPos.y - 1, 2*this.radius + 2, 6);
		context.fill();
		context.closePath()

		// Red to show how much health lost
		context.fillStyle = "red";
		context.beginPath();
		context.rect(startPos.x, startPos.y, 2*this.radius, 4);
		context.fill();
		context.closePath()

		// Red to show how much health lost
		context.fillStyle = "green";
		context.beginPath();
		context.rect(startPos.x, startPos.y, (this.health/this.maxHealth)*2*this.radius, 4);
		context.fill();
		context.closePath()


	}

	nearestEdgePos(actor){
		// Wouldn't work for rectangles but we shouldn't need it to
		let diffX = Math.round(actor.position.x - this.position.x);
        let diffY = Math.round(actor.position.y - this.position.y);
        
        let angle = Math.atan2(diffY, diffX);

        let nearestX = this.position.x + Math.cos(angle)*this.radius;
        let nearestY = this.position.y + Math.sin(angle)*this.radius;

		return new Pair(nearestX, nearestY);
	}

	singleCollideCheck(actor){
		// let nearest = this.nearestEdgePos(actor);
		let diffX = actor.position.x - this.position.x;
		let diffY = actor.position.y - this.position.y;

		let distance = new Pair(diffX, diffY).normalize();

		if(actor.rectangle) {
			if(Math.abs(diffX) < actor.radius + this.radius && 
				Math.abs(diffY) < actor.height + this.radius){
				return true;
			}

		}else if(distance < actor.radius + this.radius){			
			return true;
		}

		return false;

	}

	checkCollide(x, y){
		let collision = false;
		let actor = null;
		let suggested = null;
		let originalX = this.position.x;
		let originalY = this.position.y;
		for(let i = 0; i < this.stage.actors.length; i++){
			if(this.stage.actors[i] != this){
				
				// let nearest = this.nearestEdgePos(this.stage.actors[i]);
				let diffX = this.stage.actors[i].position.x - this.position.x;
				let diffY = this.stage.actors[i].position.y - this.position.y;

				let difference = new Pair(diffX, diffY);
				let distance = difference.normalize();

				if(this.stage.actors[i].rectangle) {
					
					if(Math.abs(diffX) < this.stage.actors[i].radius + this.radius && 
					   Math.abs(diffY) < this.stage.actors[i].height + this.radius){
						collision = true;
						while(this.singleCollideCheck(this.stage.actors[i])){
							this.position.x -= difference.x;
						this.position.y -= difference.y;
						}
						actor = this.stage.actors[i];
						suggested = new Pair(this.position.x, this.position.y);
					}

				}else if(distance < this.stage.actors[i].radius + this.radius){
					collision = true;
					while(this.singleCollideCheck(this.stage.actors[i])){
						this.position.x -= difference.x;
						this.position.y -= difference.y;
					}
					actor = this.stage.actors[i];
					suggested = new Pair(this.position.x, this.position.y);
				}

				

				this.position.x = originalX; this.position.y = originalY;
			}
		}
		return new Collision(collision, actor, suggested);
	}

	checkDeath(){
		if(this.health <= 0){
			this.updateDeath();
			this.stage.removeActor(this);
			// this = null;
			return true;
		}
		return false;
	}
}























class Obstacle extends Actor{

	constructor(stage, position, velocity, colour, radius){
		super(stage, position, velocity, colour, radius);
		this.rectangle = true;
		this.height = this.radius;
	}



	nearestEdgePos(actor){
		let diffX = Math.round(actor.position.x - this.position.x);
        let diffY = Math.round(actor.position.y - this.position.y);
        
        let angle = Math.atan2(diffY, diffX);

        let nearestX = this.position.x + Math.cos(angle)*this.radius;
        let nearestY = this.position.y + Math.sin(angle)*this.height;

		return new Pair(nearestX, nearestY);
	}

	draw(context){
		context.fillStyle = this.colour;
		context.beginPath();
		context.rect(this.position.x - this.radius, this.position.y - this.height, this.radius*2, this.height*2);
		context.fill();
		context.stroke();
		context.closePath();

		this.drawHealthBar(context);

	}

	updateDeath(){
		this.stage.obstacles--;
	}
}




class omegaCrate extends Obstacle{
	// constructor(stage, position, velocity, colour="blue", radius, steps, ){
	// 	super(stage, position, velocity, colour, radius);
	// 	this.quantity = 
	// }

	fillUp(collision){
		collision.actor.topUp();
		collision.actor.reFill();
		this.destroyCrate();

	}



	step(){
		let originalX = this.position.x; let originalY = this.position.y;
		let collision = this.checkCollide(originalX, originalY);
		if(collision.collide && (collision.actor instanceof Player || collision.actor instanceof NPC)){
			this.fillUp(collision);
		}		
	}

	destroyCrate(){
		this.health = 0;
		this.checkDeath();
	}

	updateDeath(){
		this.stage.crates[0]--;
	}
}

class healthCrate extends omegaCrate{
	// constructor(stage, position, velocity, colour="blue", radius, steps, ){
	// 	super(stage, position, velocity, colour, radius);
	// 	this.quantity = 
	// }

	fillUp(collision){
		collision.actor.topUp();
		this.destroyCrate();

	}
	updateDeath(){
		this.stage.crates[1]--;
	}
}

class ammoCrate extends omegaCrate{
	// constructor(stage, position, velocity, colour="blue", radius, steps, ){
	// 	super(stage, position, velocity, colour, radius);
	// 	this.quantity = 
	// }

	fillUp(collision){
		collision.actor.reFill();
		this.destroyCrate();

	}

	updateDeath(){
		this.stage.crates[2]--;
	}
}


class weaponCrate extends omegaCrate{
	fillUp(collision){
		var ammo = [30,100,5,10,20];
		
		if(collision.actor instanceof NPC) ammo = [Infinity, Infinity, 5, Infinity, Infinity]

		var gun1 = new Gun(this.stage, collision.actor, "yellow", ammo[0]);
		var gun2 = new Automatic(this.stage, collision.actor, "orange", ammo[1]);
		var gun3 = new QA(this.stage, collision.actor, "purple", ammo[2], QABullet);
		var gun4 = new RailGun(this.stage, collision.actor, "blue", ammo[3], RailBullet);
		var gun5 = new Shotgun(this.stage, collision.actor, "rgb(41, 237, 77)", ammo[4], Bullet);

		
		var guns = [gun1, gun2, gun3, gun4, gun5];
		var newGun = guns[Math.floor(Math.random()*guns.length)];

		collision.actor.gun = newGun;
		this.destroyCrate();
	}

	updateDeath(){
		this.stage.crates[3]--;
	}
} 














class Player extends Actor {

	constructor(stage, position, velocity, colour, radius, username=0, stride=8) {
		super(stage, position, velocity, colour, radius, username);
		// this.username = username;
		this.score = 0;
		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;
		this.move = {"up":false, "down":false, "right":false, "left":false};
		this.ammo = 100000;
		this.stride = stride;
		this.lookAt = position;
		this.maxHealth = 100;
		this.health = this.maxHealth; // <--- to make me immortal
		this.gun = null;
		this.special = false;
		this.count = 0;
		this.kills = 0;
		this.playerMove = new Pair(this.position.x-Math.floor(this.stage.width/2), this.position.y-Math.floor(this.stage.height/2));
		this.startTime = new Date().getTime();

	}


	draw(context){
	   

		context.fillStyle = this.colour;
		context.strokeStyle = "black";
		context.beginPath(); 
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false); 
		context.fill();

	   	context.moveTo(this.x, this.y);
	   	context.lineTo(this.x + this.lookX, this.y+this.lookY);
		context.stroke();   
		
		context.closePath();

		this.drawHealthBar(context);

	}

	playerInfo(){
		var gun = "N/A";
		if(this.gun instanceof Gun) gun = "Pistol";
		if(this.gun instanceof Shotgun) gun = "Shotgun";
		if(this.gun instanceof QA) gun = "QA";
		if(this.gun instanceof RailGun)gun = "Railgun";
		if(this.gun instanceof Automatic) gun = "Automatic";

		var special = "N/A";
		if(!this.special) special = "Ready";

		var ammo = 0;
		if(this.gun != null){
			ammo = this.gun.ammo;
		}
		
		var endTime = new Date().getTime();
		var time = (endTime - this.startTime)/1000;

		return {"health":this.health, "score":this.score, "kills":this.kills, "time":time, "ammo":ammo,
				"radius":this.radius, "position":{"x":this.position.x, "y":this.position.y}, "special": special, "gun":gun,
				"playerMove":{"x":this.playerMove.x, "y":this.playerMove.y}};	
		}

	specialOn(){
		if(!this.special){
			this.special = true;
		}
	}

	specialOff(){
		if(this.special){
			this.special = false;
		}
	}


	shoot(){
		if(this.gun != null) this.gun.shoot();
	}

	shootRelease(){
		if(this.gun != null){
			this.gun.shootRelease();
		}
	}


	step(){
		let originalX = this.position.x;
		let originalY = this.position.y;

		if (this.move.up == true)
			this.position.y=this.position.y-this.stride;
		if (this.move.down == true)
			this.position.y=this.position.y+this.stride;
		if (this.move.left == true)
			this.position.x=this.position.x-this.stride;
		if (this.move.right == true)
			this.position.x=this.position.x+this.stride;

		this.checkWall();

		let collision = this.checkCollide(originalX, originalY);
		if(collision.collide){
			// this.position.x = originalX;
			// this.position.y = originalY;
			if(collision.actor instanceof Bullet && collision.actor.gun.owner != this){
				collision.actor.doDamage(new Collision(true, this));
			}
			// if(collision.actor instanceof Bullet && collision.actor.gun.owner != this){
			// 	collision.actor.doDamage(new Collision(true, this));
			// }

			if(!(collision.actor instanceof Bullet) && !(collision.actor instanceof omegaCrate))this.position = collision.suggested;

			// //console.log("is omegaCrate... " + collision.actor instanceof omegaCrate);
			// this.position = collision.suggested;
		}
		// //console.log(this.position);

		this.playerMove.x += (this.position.x - originalX);
		this.playerMove.y += (this.position.y - originalY);

		this.velocity.x = this.position.x - originalX;
		this.velocity.y = this.position.y - originalY;

		if(this.gun!=null)this.gun.step();
			
		this.intPosition();
	}

	checkDeath(){
		if(this.health <= 0){
			this.stage.gameOver = true;
			this.stage.score = this.score;
			// this.stage.kills = this.kills;
			this.stage.removePlayer(this);
			// this.stage.endTime = new Date().getTime();
			// this.stage.time = (this.stage.endTime - this.stage.startTime)/1000;
			this.position = new Pair(this.stage.width/2, this.stage.height/2);
			return true;
		}
		return false;
	}
}


class Agent extends Player{

	specialOn(){
		if(!this.special && this.count<=0){
			this.special = true;
			this.count = 60;
			// this.stride*=1.5;
		}
	}

	
	step(){
		if(this.special && this.count > 30){ 
			this.stride *= 2;              
		}

		super.step();
		if(this.special && this.count > 30){
			this.stride /= 2;
		}

		this.count --;
		if(this.count <= 0){
			this.specialOff();
		}
	}

}


class Soldier extends Player{

	specialOn(){
		if(!this.special && this.count<=0){
			this.special = true;
			this.count = 60;
			// this.stride*=1.5;
		}
	}

	blast(){
		// This is only called when count > 30
        let partition = 30;
        var shift = this.count - partition;

        var angle = shift*2*Math.PI/partition;

        let suggestedX = Math.round(Math.cos(angle)*this.radius);
        let suggestedY = Math.round(Math.sin(angle)*this.radius);

        let start = new Pair(this.position.x + suggestedX, this.position.y + suggestedY);
        let velocity = new Pair(suggestedX*1.5, suggestedY*1.5);
        var bullet = new Bullet(this.stage, start, velocity, "rgb(95, 100, 164)", 6, 100, this, 200);
        this.stage.addActor(bullet);
	}

	step(){
		super.step();
        if(this.count > 30)this.blast();
        this.count--;
        if(this.count <= 0)this.specialOff();
	}
}


class Tricky extends Player{
	step(){
		if(this.special){
			this.position.x += 2*this.stride*this.lookX;
			this.position.y += 2*this.stride*this.lookY;

			this.playerMove.x += 2*this.stride*this.lookX;
			this.playerMove.y += 2*this.stride*this.lookY;

			this.specialOff();
		}
		super.step();

	}	
}


class Assasin extends Player{
	attack(){
		var startPos = new Pair(this.position.x + this.lookX, this.position.y + this.lookY);
		var velocity = new Pair(this.lookX*0.85, this.lookY*0.85);

		this.stage.addActor(new MeleeBullet(this.stage, startPos, velocity, "white", 3, 5, this, 200));
	}

	step(){
		if(this.special){
			this.attack();
			this.specialOff();
		}
		super.step();
	}
}

















class NPC extends Actor{

	constructor(stage, position, velocity, colour, radius, stride=4) {
		super(stage, position, velocity, colour, radius);
		var player = this.findNearestPlayer();
		if( player != null){
			this.lookAt = player.position;
		}else{
			this.lookAt = this.position;
		}
		this.count = 1;
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.stride = stride;
		this.gun = new Gun(this.stage, this, "blue", Infinity);
		this.hitWorth = 10;
		this.killWorth = 100;
	}

	updateVelocity(){
		this.velocity.x *= this.stride;
		this.velocity.y *= this.stride;
	}
	
	step(){
		super.step();
		var nearestPlayer = this.findNearestPlayer()
		this.setLook(nearestPlayer);
		if( nearestPlayer != null){
		   var playerPosition = nearestPlayer.position;
		}else{
			var playerPosition = this.position;
			if (this.velocity.x > 5 || this.velocity.y > 5){
				this.velocity.x = -5;
				this.velocity.y = -5; 
			}
			this.velocity.x++; this.velocity.y++;
			return;
		}

		this.velocity = new Pair(playerPosition.x - this.position.x, playerPosition.y - this.position.y);
		var distance = this.velocity.normalize();

		if(distance < 100)	this.velocity = new Pair(0,0);
		

		this.updateVelocity();

		this.count ++; 

		this.gun.step();
		if (this.count % 50 == 0){
			this.gun.shoot();
		}

	}


	draw(context){
		// Update lookX and lookY
		

		context.fillStyle = this.colour;
		context.strokeStyle = "black";

		context.beginPath(); 
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false); 
		context.fill();
		
	   	context.moveTo(this.x, this.y);
	   	context.lineTo(this.x + this.lookX, this.y+this.lookY);
		context.stroke();  

		context.closePath();

		this.drawHealthBar(context);
		
		
	}

	setLook(player){
		// var player = this.findNearestPlayer();
		if( player != null){
			this.lookAt = player.position;
		}else{
			this.lookAt = this.position;
		}

		let diffX = Math.round(this.lookAt.x - this.position.x);
        let diffY = Math.round(this.lookAt.y - this.position.y);
        
        let angle = Math.atan2(diffY, diffX);

        this.lookX = Math.cos(angle) * this.radius;
        this.lookY = Math.sin(angle) * this.radius;
	}

	updateDeath(){
		this.stage.enemyActors--;
	}
}


class Sniper extends NPC{
	constructor(stage, position, velocity, colour, radius, stride=0){
		super(stage, position, new Pair(0, 0), colour, radius, stride);
		this.gun = new RailGun(this.stage, this, "green", Infinity, RailBullet, 4, 30);
	}
}


class Coward extends NPC{
	constructor(stage, position, velocity, colour, radius, stride=3){
		super(stage, position, velocity, colour, radius, -stride);
		this.gun = new Gun(this.stage, this, "grey", Infinity, Bullet, 4, 30);
	}

	step(){
		super.step();
		let diffX = Math.round(this.lookAt.x - this.x);
        let diffY = Math.round(this.lookAt.y - this.y);

		let distance = new Pair(diffX, diffY).normalize();
		
		if(distance > 395 && distance < 405){
			this.stride = 0;
		}else{
			this.stride = 1;
		}

		if(distance > 400 && this.stride < 0 || distance < 400 && this.stride > 0){
			this.stride *= -1
		}
	}

}



























class Gun{
	constructor(stage, owner, colour="yellow", ammo, bullet=Bullet, bulletSize=3, duration=16){
		this.stage = stage;
		this.owner = owner;
		this.color = colour;
		this.maxAmmo = ammo;
		this.ammo = this.maxAmmo;
		this.bullet = bullet;
		this.bulletSize = bulletSize;
		this.duration = duration;
		this.on = false;
	}

	fill(){
		this.ammo = this.maxAmmo;
	}

	step(){
		return false;
	}

	shoot(){
		if(this.owner != null && this.ammo > 0){
			this.ammo--;		
			var startPos = new Pair(this.owner.position.x + this.owner.lookX, this.owner.position.y + this.owner.lookY);
			var bullet = new this.bullet(this.stage, startPos, new Pair(this.owner.lookX, this.owner.lookY), this.color, this.bulletSize, this.duration, this);
			this.stage.addActor(bullet);
		}
		
	}

	shootRelease(){
		return false;
	}
}

class QA extends Gun{
	constructor(stage, owner, colour="orange", ammo, bullet=Bullet, bulletSize=4, duration=16){
		super(stage, owner, colour, ammo, bullet, bulletSize, duration);
		this.on = true;
		this.count = 0;
	}

	shoot(){
		if(this.count <= 0 && this.owner != null && this.ammo > 0){
			this.ammo--;
			this.count = 20;		
			var startPos = new Pair(this.owner.position.x + this.owner.lookX, this.owner.position.y + this.owner.lookY);

			var bullet = new this.bullet(this.stage, startPos, new Pair(this.owner.lookX, this.owner.lookY), this.color, this.bulletSize*16, this.duration*2, this, 1000);
			this.stage.addActor(bullet);
		
		}
	}
	step(){
		this.count--;
	}

}

class RailGun extends Gun{
	constructor(stage, owner, colour="orange", ammo, bullet=Bullet, bulletSize=4, duration=16){
		super(stage, owner, colour, ammo, bullet, bulletSize, duration);
		this.on = true;
		this.count = 0;
	}

	shoot(){
		if(this.count <= 0){
			if(this.owner != null && this.ammo > 0){
				this.ammo--;
				this.count=30;		
				var startPos = new Pair(this.owner.position.x + this.owner.lookX, this.owner.position.y + this.owner.lookY);

				var bullet = new this.bullet(this.stage, startPos, new Pair(this.owner.lookX, this.owner.lookY), this.color, this.bulletSize*2, this.duration*2, this, 5);
				this.stage.addActor(bullet);
			
			}
		}
	}

	step(){
		this.count--;
	}

}

class Automatic extends Gun{
	constructor(stage, owner, colour="orange", ammo, bullet=Bullet, bulletSize=3, duration=16){
		super(stage, owner, colour, ammo, bullet, bulletSize, duration);
		this.on = false;
		this.count = 0;
	}

	step(){	
		this.count ++;
		if(this.on && this.count%2==0){
			super.shoot();
		}
	}

	shoot(){
		this.on = true;
		this.count = 0;
	}

	shootRelease(){
		this.on = false;
		this.count = 0;
	}
}


class Shotgun extends Gun{
	constructor(stage, owner, colour="orange", ammo, bullet=Bullet, bulletSize=3, duration=16){
		super(stage, owner, colour, ammo, bullet, bulletSize, duration);
		this.on = false;
		this.count = 8;
		this.angleDiffs = [0, -Math.PI/10, Math.PI/10, -Math.PI/9, Math.PI/9];
		this.shootPos = new Pair(0,0);
	}

	shoot(){
		if(this.count >= 5 && this.ammo > 0){
			this.on = true;
			this.count = -1;
			this.ammo--;
		}
		// this.shootPos = new Pair(this.owner.position.x + this.owner.lookX, this.owner.position.y + this.owner.lookY);

	}

	step(){
		this.count ++;
		if(this.on && this.owner != null && this.ammo > 0 && this.count <= 4){
			this.releaseBullet();
		
		}else{
			this.on = false;
		}
	}

	releaseBullet(){
		let startPos = new Pair(this.owner.position.x + this.owner.lookX, this.owner.position.y + this.owner.lookY);
		let angle = Math.atan2(this.owner.lookY, this.owner.lookX);

		angle += this.angleDiffs[this.count];

		let suggestedX = Math.round(Math.cos(angle)*this.owner.radius*0.8);
		let suggestedY = Math.round(Math.sin(angle)*this.owner.radius*0.8);



		let velocity = new Pair(suggestedX, suggestedY);
		var bullet = new this.bullet(this.stage, startPos, velocity, this.color, this.bulletSize, this.duration, this, 20);
		this.stage.addActor(bullet);
	}
}


class Bullet extends Actor{
	constructor(stage, position, velocity, colour="blue", radius, steps, gun, damage=10){
		super(stage, position, velocity, colour, radius);
		this.steps = steps;
		this.damage = damage;
		this.gun = gun;
		this.health = 1;
		this.killWorth = 30;
	}

	doDamage(collision){
		collision.actor.health -= this.damage;
		let score = collision.actor.hitWorth;
		let possibleKill = collision.actor.killWorth; 
		if(collision.actor.checkDeath() && (collision.actor instanceof NPC || collision.actor instanceof Player)){
			score += possibleKill;
			this.gun.owner.kills++;
		}
		this.gun.owner.score += score;
		this.destroyBullet();
	}

	step(){
		this.steps -= 1;
		if (this.steps > 0){ 
			let originalX = this.position.x; let originalY = this.position.y;
			
			this.position.x=this.position.x+this.velocity.x;
			this.position.y=this.position.y+this.velocity.y;
			this.intPosition();

				
			// bounce off the walls
			if(this.position.x<0){
				this.destroyBullet();
			}
			if(this.position.x>this.stage.width){
				this.destroyBullet();
			}
			if(this.position.y<0){
				this.destroyBullet();
			}
			if(this.position.y>this.stage.height){
				this.destroyBullet();
			}

			let collision = this.checkCollide(originalX, originalY);
			if(collision.collide && collision.actor.gun != this.gun){
				// this.position.x = originalX;
				// this.position.y = originalY;
				this.doDamage(collision);
			}

		}else{
			this.destroyBullet();
		}
		
	}


	destroyBullet(){
		this.health = 0;
		this.checkDeath();
	}
 }

 class QABullet extends Bullet{
	constructor(stage, position, velocity, colour="blue", radius, steps, gun, damage=1000){
		super(stage, position, velocity, colour, radius, steps, gun, damage);
		this.health = Infinity; // Singularities shouldn't be able to be destroyed...

	}

	doDamage(collision){
		collision.actor.health -= this.damage;
		let score = collision.actor.hitWorth;
		let possibleKill = collision.actor.killWorth; 
		if(collision.actor.checkDeath() && (collision.actor instanceof NPC || collision.actor instanceof Player)){
			score += possibleKill;
			this.gun.owner.kills++;
		}
		this.gun.owner.score += score;
	}

	step(){
		super.step();
		this.velocity.x -= (this.velocity.x*this.velocity.x)/(this.velocity.x*Math.abs(this.velocity.x))*2; // Very elaborate way to 
		this.velocity.y -= (this.velocity.y*this.velocity.y)/(this.velocity.y*Math.abs(this.velocity.y))*2; // reduce speed
	}
 }

class RailBullet extends Bullet{
	doDamage(collision){
		collision.actor.health -= this.damage;
		let score = collision.actor.hitWorth;
		let possibleKill = collision.actor.killWorth; 
		if(collision.actor.checkDeath() && (collision.actor instanceof NPC || collision.actor instanceof Player)){
			score += possibleKill;
			this.gun.owner.kills++;
		}
		this.gun.owner.score += score;
	}
 }


class MeleeBullet extends Bullet{
	constructor(stage, position, velocity, colour="blue", radius, steps, gun, damage=100){
		super(stage, position, velocity, colour, radius, steps, gun, damage);
		// this.username = "";
		this.attackStart = position; // Point to start attack animation;
	}

	getAsset(){
		var shape = "c";
		if(this.rectangle)shape = "r";
		return {
			"position": {"x":this.position.x, "y": this.position.y},
			"shape": 'l',
			"radius": this.radius,
			"color": this.gun.colour,
			"look": {"x":this.lookX, "y":this.lookY},
			"start": {"x":this.gun.position.x, "y": this.gun.position.y},
			"health": -1,
			"maxHealth": -1,
			"username":""
		}
	}

	draw(context){

		context.strokeStyle = "black";
		context.beginPath();
		// context.lineWidth = 5;
		context.moveTo(this.gun.position.x + this.gun.lookX, this.gun.position.y + this.gun.lookY); // If you think about it the Gun of the blade "bullet" is 
																// is whoever is wielding it right?
		context.lineTo(this.position.x, this.position.y);			
		context.stroke();	
		context.closePath();
		
	}


	doDamage(collision){
		collision.actor.health -= this.damage;
		let score = collision.actor.hitWorth;
		let possibleKill = collision.actor.killWorth; 
		if(collision.actor.checkDeath() && (collision.actor instanceof NPC || collision.actor instanceof Player)){
			score += possibleKill;
			this.gun.owner.kills++;
		}
		this.gun.owner.score += score;

		collision.actor.position = collision.suggestedPos(this);
		// otherCollision = 
		// collision.actor.posistion = new Collision(true, this).suggestedPos(collision.actor);

		
	}
}

module.exports = {
	stage:Stage, // The stage representation
	player:Player, tricky:Tricky, agent:Agent, assassin:Assasin, soldier:Soldier, // The different players
	pair:Pair
}; 


