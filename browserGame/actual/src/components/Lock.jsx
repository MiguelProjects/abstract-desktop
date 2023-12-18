import React, { useRef } from 'react';
import './style.css';
// import axios from 'axios';
// We didn't manage to implement ajax due to time constraints. However we did attempt to use axios.
// We left it commented out as proof that we were going to implement it, if time were permitting :/



class LockButton extends React.Component {
	constructor(props) {
		super(props);
	}
	render(props){
		return (
			<button onClick={this.props.clickHandler} value={this.props.num} > {this.props.num} </button>
		);
	}
}
class LockResult extends React.Component {
	constructor(props) {
		super(props);
	}
	render(props){
		return (
			<span> {this.props.message} </span>
		);
	}
}

class TestInput extends React.Component{
	constructor(props) {
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}
	render(props){
		return (
			// <input type="text" id="username" placeholder="User Name" className="textInput" required='required'/>
			<input type="text" id={this.props.id} placeholder={this.props.placeholder} className={this.props.class} required='required' onChange={this.props.registerHandler}/>
		);
	}
}

class Navigation extends React.Component{
	constructor(props) {
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}
	render(props){
		return(
			<div className='mainNav'>
				<TestButton clickHandler={this.registerHandler} class="introSubL" val="Main" id="navMain"/>
				<TestButton clickHandler={this.registerHandler} class="introSubCenter" val="About" id="navAbout"/>
				<TestButton clickHandler={this.registerHandler} class="introSubCenter" val="Play" id="navPlay"/>
				<TestButton clickHandler={this.registerHandler} class="introSubCenter" val="Instructions" id="navInstructions"/>
				<TestButton clickHandler={this.registerHandler} class="introSubR" val="Logout" id="navLogout"/>
				{/* <input type="button" id="mainNavMain" class="introSubL" value="Main"/>
				<input type="button" id="mainNavAbout" class="introSubCenter" value="About"/>
				<input type="button" id="mainNavPlay" class="introSubCenter" value="Play"/>
				<input type="button" id="mainNavInstructions" class="introSubCenter" value="Instructions"/>
				<input type="button" id="mainNavLogout" class="introSubR" value="Logout"/> */}
			</div>
		);
	}
}

class ClickHeader extends React.Component{
	constructor(props) {
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}
	render(props){
		return(
			<div id='headerSuriveMain' className="aboutHeaderClick" onClick={this.props.registerHandler} vaalue='.'>
			<h2 className='mainHeaderClick' vaalue='.'>Project survIvE</h2> 
			<span className='glitchHeader' vaalue='.'>CRUSH, ADAPT, PERFECT, SURVIVE</span>
		</div>
		);
	}
}

class TestButton extends React.Component {
	constructor(props) {
		super(props);
	}
	render(props){
		return (
			<input type="button" id={this.props.id} className={this.props.class} value={this.props.val} onClick={this.props.clickHandler}/>
			// <button onClick={this.props.clickHandler} value={this.props.num} > {this.props.num} </button>
		);
	}
}

class RegisterPage extends React.Component {
	constructor(props) {
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
		this.formHandler = this.props.formHandler.bind(this);
		this.radialHandler = this.props.radialHandler.bind(this);
	}

	render(props){
		return (
			<div id="ui_register">
			<p className='glitch'>01000001 01010101 01000100 01001001 01010100 01001111 01010010</p>
		<div className="loginStyle">
			<div className="deco1">
				<p className="glitch">IMPROBABLE</p>
				<p className="vertical">SUBJECT.ACCESS(KS_FRAG10).GRANT(ALLOW,PERMIT,PURGE);</p>
				<p className="glitch">ADAPT</p>
			</div>
			<section className="Intro">			
				<div className='IntroHeader'>
					<h1 className='noBottomMargin'>Welcome to: <br/>PROJECT survIvE</h1>
				</div>
				<span className='headerSlogan'>CRUSH, ADAPT, PERFECT, SURVIVE</span>
					<br/>
				<div className='TACenter'>
					Register new Subject
				</div>
				<form id='registerForm' className='IntroContent'>
					{/* <input type="text" id="registerUsername" placeholder="User Name" className="textInput" required="required"/> */}
					<TestInput id="username" placeholder="Username" class="textInput" registerHandler={this.formHandler}/>

					<p className="registerCenter">Select a Class</p>
					<div className = 'buttonHolder' id="pickClass" onChange={this.radialHandler}>
						<input type="radio" id="registerAgent" name="Type" value="Agent" required='required'/>
						<label htmlFor="agentRegister">Agent</label><br/>

						<input type="radio" id="registerTricky" name="Type" value="Tricky"/>
						<label htmlFor="trickyRegister">Tricky</label><br/>

						<input type="radio" id="registerSoldier" name="Type" value="Soldier"/>
						<label htmlFor="soldierRegister">Soldier</label><br/>

						<input type="radio" id="registerAssassin" name="Type" value="Assassin"/>
						<label htmlFor="assassinRegister">Assassin</label><br/>
					</div>

					<hr className='registerBar'/>
					
					<div className='buttonHolder'>
						<TestButton clickHandler={this.registerHandler} class="introSub" val="Enter" id="gameEnter"/>
					</div>
			    </form>
			</section>
			<div className="deco2">
				<p className="vertical">01000011 01001100 01001111 01010111 01001110</p>
				<p className="glitch">[REDACTED]</p>
				<p className="glitch"><br/><br/>EXPURGATION.INIT</p>
			</div>
		</div>
		<p className="TARight">01110111 01101000 01111001</p>
	</div>

		);
	}
}

class MainPage extends React.Component{
	constructor(props){
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}

	render(props){
		return(
		<div id="ui_main" className="mainHolder">
		<ClickHeader registerHandler={this.registerHandler}/>	

		<div className="mainBody">
			<h1 className='pageTopBar'><span className="whiteGlitch">MAIN</span></h1>
			<Navigation registerHandler = {this.registerHandler}/>
			
			<div className='mainContent'>
				<div className='mainTableColumn'>
					<div className='mainTableRow'>
						<div>
						<h1 className='whiteGlitch'>Navigation</h1>
						<p className="ASCenter">
								Main: Edit profile, Statistics<br/>
								About: Lore, Classes, Enemies <br/>
								Instructions: Controls, Guns<br/>
						</p>
						</div>
						<table id="scoreTablePersonal" className='mainScorePersonal'>
							<caption className='whiteGlitch' style={{marginBottom:10}}>Personal Scores</caption>
							<tbody>
							<tr>
								<td><strong>Top Score</strong></td> 
								<td><strong>Kills</strong></td>
								<td><strong>Best Time</strong></td>
							</tr>
								
							<tr>
								<td id='personalScore'>0</td>
								<td id='personalKills'>0</td>
								<td id='personalTime'>00:00</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div className='mainTable'>
						<div id='tableContainer1'>
							<p className='WGCenter'>Top Scorers</p>
							<table id="scoreTableScores" className='mainScorePersonal'>
								<tbody>
								<tr>
									<td><strong>Rank</strong></td> 
									<td><strong>Score</strong></td>
									<td><strong>Name</strong></td>
								</tr>
									
								<tr>
									<td>1</td>
									<td id='score1'></td>
									<td id='nameScore1'></td>
								</tr>
								
								<tr>
									<td>2</td>
									<td id='score2'></td>
									<td id='nameScore2'></td>
								</tr>
								
								<tr>
									<td>3</td>
									<td id='score3'></td>
									<td id='nameScore3'></td>
								</tr>
								</tbody>
							</table>
						</div>
						<div id='tableContainer2'>
							<p className="WGCenter">Top Killers</p>
							<table id="scoreTableKills" className='mainScorePersonal'>
								<tbody>
								<tr>
									<td><strong>Rank</strong></td> 
									<td><strong>Kills</strong></td>
									<td><strong>Name</strong></td>
								</tr>
									
								<tr>
									<td>1</td>
									<td id='kills1'>5</td>
									<td id='nameKills1'></td>
								</tr>
								
								<tr>
									<td>2</td>
									<td id='kills2'>4</td>
									<td id='nameKills2'></td>
								</tr>
								
								<tr>
									<td>3</td>
									<td id='kills3'></td>
									<td id='nameKills3'></td>
								</tr>
								</tbody>
							</table>
						</div>
						<div id='tableContainer3'>
							<p className='WGCenter'>Top Survivors</p>
							<table id="scoreTableSurvive" className='mainScorePersonal'>
								<tbody>
								<tr>
									<td><strong>Rank</strong></td> 
									<td><strong>Time</strong></td>
									<td><strong>Name</strong></td>
								</tr>
									
								<tr>
									<td>1</td>
									<td id='survive1'></td>
									<td id='nameSurvive1'></td>
								</tr>
								
								<tr>
									<td>2</td>
									<td id='survive2'></td>
									<td id='nameSurvive2'></td>
								</tr>
								
								<tr>
									<td>3</td>
									<td id='survive3'></td>
									<td id='nameSurvive3'></td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className='buttonHolder'>
					<TestButton clickHandler={this.registerHandler} class="playButton" val="PLAY" id="playMain"/>
						{/* <input type="button" id="mainPlay" className="playButton" value="PLAY"/> */}
					</div>
				</div>
			</div>
		</div>
	</div>
		);
	}
}


// function updateTest(params){
// 	//params could be used 
// 	this.setState((prevState, props) => {
// 		return params;
// 	  });
// }

function firstConnection(){
	// this.data.class = this.props.class;
	// this.data.username = this.props.username;
	if(!this.ws){
		try{
			this.ws = new WebSocket(`ws://localhost:8082`);
		}catch(e){
			setLockValue("Register");
		}
	}
	this.data.first=true;
	this.sendData();
	this.data.first=false;
	document.removeEventListener('mousemove', this.lookTo);
	this.lookTo = this.reallookTo.bind(this);
	document.addEventListener('mousemove', this.lookTo);
}

function updateCanvasDataMove(data){
	if("up" in data) this.data.move.up=data.up;
	if("down" in data) this.data.move.down=data.down;
	if("left" in data) this.data.move.left=data.left;
	if("right" in data) this.data.move.right=data.right;
	this.sendData();
}


class Controller extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
			<table className="controller">
				<tbody>
					<tr>
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault(); updateCanvasDataMove({up:true, left:true}); }}
									onTouchEnd={()=>{updateCanvasDataMove({up:false, left:false}); }} value="🢄"/></td> 
	
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault(); updateCanvasDataMove({up:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({up:false});}} value="🢁"/></td>
	
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault(); updateCanvasDataMove({up:true, right:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({up:false, right:false});}} value="🢅"/></td>
					</tr>
					<tr>
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault(); updateCanvasDataMove({left:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({left:false});}} value="🢀"/></td>
	
						<td><input type="button"/></td>
	
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault(); updateCanvasDataMove({right:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({right:false});}} value="🢂"/></td>
					</tr>
					<tr>
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault(); updateCanvasDataMove({down:true, left:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({down:false, left:false});}} value="🢇"/></td>
	
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault();updateCanvasDataMove({down:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({down:false});}} value="🢃"/></td>
	
						<td><input type="button" onTouchStart={(event)=>{event.preventDefault();updateCanvasDataMove({down:true, right:true});}}
									onTouchEnd={()=>{updateCanvasDataMove({down:false, right:false});}} value="🢆"/></td> 
					</tr>
				</tbody>
				</table>
			</div>
		);
	}
}



class AboutPage extends React.Component{
	constructor(props){
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}

	render(props){
		return(
		<div id="ui_about" className='aboutHolder'>
		<ClickHeader registerHandler={this.registerHandler}/>	

		<div className='aboutContent'>
			<div className='aboutBody'>
				<h1 className='pageTopBar'><span className="whiteGlitch">ABOUT</span></h1>
				<Navigation registerHandler = {this.registerHandler}/>

				<h3 className='whiteGlitch'>==Project Information==</h3>
				<p>
					<strong>Project survIvE:</strong><br/>
					A series of military R and D projects spearheaded by the SEDERA branch of Nevada's MAD (Mutagenic Arms Defence) unit.
				</p>
				<p>
					<strong>Goal:</strong><br/>
					Create generations of physically, genetically, technologically, and mentally superior 
					supersoldiers as a special fighting force within the MAD unit. 
				</p>
				<p>
					<strong>Concept:</strong><br/>
					Originally developed by Doctors Arnold Rosenbloom and Sadia Sharmin in the late 20th century, survIvE's 
					initial protocols were developed to train the Headhunter division of 
					<span className='glitchAltered'>[REDACTED]</span>. 
					After the invention of the Improbability Drive by the CS (Counter Strike) Organization, the need for forces about to counter 
					reality bending was at an all time high. Through several decades of testing, optimal methods were found and 
					implemented - resulting in the current iteration of survIve. 
				</p>
				<p>
					<strong>Current Program:</strong><br/>
					The current program makes use of four types of genetically engineered soldiers, known as 'Subjects'. 
					Within the battlezone are obstacles, enemies, and weaponry for the subject to interact with.
					The large number of hostile forces teleported in and armed with weapons, effectively
					creates a <span className='glitchAltered'>One Against Everyone</span> scenario, which
					is ideal for our purposes. Ideally, the Subject would then attempt to eradicate any hostile forces in the area.
					Upon Subject success or termination, the Subject is taken in and their 
					memories are quickly harvested and stored in our database - where their performance can be analyzed and applied to further 
					our development efforts.
				</p>
				<p>
					<strong>Martin-Kay Lethality Score:</strong><br/>
					To measure the performance of Subjects the Martin-Kay Lethality Score, or 
					simply <span className='glitchAltered'>Score</span> for short, was developed. Score allows
					one to agregate all the relevant qualities that dictate an individual's lethality and place it into a numerical value. The unit was
					named after two subjects that performed so well as to cause scientists to question the very concept of lethality.
				</p>
				<hr className='whiteBar'/>
				<h3 className='whiteNoBottom'>==Subject Information==</h3>
				<p className="glitch">LEVEL 2 CLEARANCE REQUIRED</p>

				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>Subject Class: ASU204 - "Agent":</strong><br/>
					
					<p className='aboutDocContent5'>
						Description: Super soldier exceling in all fields, created through <span className='glitchAltered'>[REDACTED]</span>. 
						Has modified circulatory systems that allow an Adrenaline Rush.
					</p>
					<p className='aboutDocumentContent'>
						Ability: The procedures done to Agents gives them a short speed boost when they experience an Adrenaline Rush.
					</p>
					
				</div>
				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>Subject Class: ITU046- "Tricky":</strong><br/>
					<p className='aboutDocContent5'>
						Description: An anomaly created through successful trials of experiment MD-N5. 
						Able to teleport short distances. No other description allowed.<br/>
					</p>
					<p className='aboutDocumentContent'>
						Ability: A minor reality bender, the Tricky can displace themselves a significant distance away in an instant.
					</p>
					
				</div>
				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>Subject Class: SEU106 - "Soldier":</strong><br/>
					<p className='aboutDocContent5'>
					Description: AWOL Trained soldier. Subject type provided by Military as punishment for desertion. Skilled with explosives.
					Carries explosives.<br/>
					</p>
					<p className='aboutDocumentContent'>
						Ability: With their military training, the Soldier can detonate an explosive at their location without any self damage.
					</p>
				</div>
				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>Subject Class: MLU008 - "Mutant":</strong><br/>
					<p className='aboutDocContent5'>
					The first type of test subject devised at site 
					<span className='glitchAltered'>[REDACTED]</span>.
					Driven mad and insane by the procedures performed on him. Possesses unusual bodily growths.
					</p>
					<p className='aboutDocumentContent'>
						Ability: Able to extend a tendril, but has less mobility while doing so.<br/>
					</p>
				</div>
				<hr className='whiteBar'/>
				<h3 className='whiteNoBottom'>==Force Information==</h3>
				<p className="glitch">LEVEL 5 CLEARANCE REQUIRED</p>
				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>MAD Delta 6 - "Seekers":</strong><br/>
					<p className='aboutDocContent5'>
						Description: A facility trained offense unit, part of Squad D6. 
					</p>
					<p className='aboutDocumentContent'>
						Behaviour: Constantly pursues the subject, capable of using multiple weapons.
					</p>
				</div>

				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>MAD Psi 5 - "Archers":</strong><br/>
					<p className='aboutDocContent5'>
					Description: Special operatios unit sniper from Squad P5.
					</p>
					<p className='aboutDocumentContent'>
						Behaviour: Stands still and engages the Subject from long ranges with piercing rifles.
					</p>
				</div>
				<div className='aboutDocumentEntry' style={{marginBottom:10}}>
					<strong>MAD CV - "Bystanders":</strong><br/>
					<p className='aboutDocContent5'>
					Description: A <span className='glitchAltered'>[REDACTED]</span>
					thrown into the arena as punishment for failure.
					</p>
					<p className='aboutDocumentContent'>
						Behaviour: Flees from Subject, will engage if a firearm is provided.
					</p>
				</div>
				<div className='buttonHolder'>
				<TestButton clickHandler={this.registerHandler} class="playButton" val="PLAY" id="playAbout"/>
					{/* <input type="button" id="aboutPlay" className="playButton" value="PLAY"/> */}
				</div>
			</div>
		</div>
	</div>);
	}
}

class InstructionPage extends React.Component{
	constructor(props){
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}
	render(props){
		return(
		<div id="ui_instruct" className='instructHolder'>
		<ClickHeader registerHandler={this.registerHandler}/>	
		{/* <div id='headerSuriveInstruction' className="aboutHeader">
			<h2 className='mainHeader'>Project survIvE</h2> 
			<span className='glitch' >CRUSH, ADAPT, PERFECT, SURVIVE</span>
		</div> */}

		<div className='instructContent'>
			<div className='instructionMain'>
				<h1 className='pageTopBar'><span className="whiteGlitch">INSTRUCTIONS</span></h1>
				<Navigation registerHandler = {this.registerHandler}/>
				<h3 className='WGCenter'>==Subject Instructions==</h3>
				<div className='noTop'>
					<strong>Controls:</strong><br/>
					<p className='instructLBT0'>
						Movement: 
						<span className="glitch">W</span>,
						<span className="glitch">A</span>,
						<span className="glitch">S</span>,
						<span className="glitch">D</span> 
						to move 
						<span className="glitch">UP</span>,
						<span className="glitch">LEFT</span>,
						<span className="glitch">DOWN</span>,
						<span className="glitch">RIGHT</span>.
					</p>
					<p className="instructLBT0">
						Aim and Shoot: Use the 
						<span className="glitch">Mouse</span> to 
						<span className="glitch">Aim</span> and the 
						<span className="glitch">Left Click</span> to 
						<span className="glitch">Shoot</span>.
					</p>
					<p className="instructLBT0">
						Class Ability: Press 
						<span className="glitch">E</span> to use your  
						<span className="glitch">Class Ability</span>.
					</p><br/>
					<strong>Mobile:</strong><br/>
                    <p className='instructLBT0'>
                        Movement: 
                        For mobile use the on screen <span className="glitch">Directional Buttons</span>.
                    </p>
                    <p className='instructLBT0'>
                        Shooting: 
                        For mobile <span className="glitch">Tap the Screen</span>.
                    </p>
                    <p className='instructLBT0'>
                        Abilities: 
                        For mobile <span className="glitch">Place two fingers </span>on the<span className="glitch"> right side of the screen.</span>.
                    </p>
				</div>
				<div className='instructTop'>
					<strong>Goal:</strong><br/>
					<p className="instructLBT5">
						Eliminate all threats in the arena. As you kill, your <span className="glitch">Score</span> increases. Make it high.
						No regrets. No remorse. You must <span className="glitch">Survive</span>.
					</p>
				</div>
				<div className='instructTop'>
					<strong>Miscellaneous Items:</strong><br/>
					<p className="instructLBT5">
						Scattered around the battle field are obstacles and supplies. <br/>
						Some may give you points when destroyed. Some may provide cover.
						<br/>
						Others carry supplies you can use. Be careful, your enemies can use these supplies as well.
					</p>
				</div>
				<div className='instructTop'>
					<strong>Crates:</strong><br/>
					<p className="instructLBT5">
						Blue: Destructible crates that provide score when destroyed.<br/>
						Black: Incredibly durable obstacles that serves as cover.<br/>
						White: Omni-crate that heals Subject and refills ammo.<br/>
						Green: Healing crate.<br/>
						Brown: Ammo crate.<br/>
						Grey: Weapon crate with a random weapon.<br/>
					</p>
				</div>
				<h3 className='WGCenter'>==Firearm Information==</h3>
				<div className='instructBT'>
					<strong>M29 Defence Weapon - "Pistol"</strong>
					<p className='instructLBT0'>
						A semiautomatic defence weapon. Strong but not overpowering.
					</p>
				</div>
				<div className='instructBT'>
					<strong>M03 Assault Rifle - "Rifle"</strong>
					<p className='instructLBT0'>
						A fully automatic rifle with a high fire rate.
					</p>
				</div>
				<div className='instructBT'>
					<strong>L01 Conduction Platform - "Railgun"</strong>
					<p className='instructLBT0'>
						Home developed long range, high firepower weapons platform.
					</p>
				</div>
				<div className='instructBT'>
					<strong>T07 Caustic Blaster - "Shotgun"</strong>
					<p className='instructLBT0'>
						Illegal weapon that fires spreads of projectiles made of toxic waste.
					</p>
				</div>
				<div className='instructBT'>
					<strong>E10 Condenser - "Quantum Annihilator"</strong>
					<p className='instructLBT0'>
						Experimental weapon. Shoots Singularities. May destroy reality.
					</p>
				</div>
				<div className='buttonHolder'>
				<TestButton clickHandler={this.registerHandler} class="playButton" val="PLAY" id="playInstruction"/>
					{/* <input type="button" id="instructionPlay" className="playButton" value="PLAY"/> */}
				</div>
			</div>
		</div>
	</div>

		);
	}
}

function getLeaderboard(){
	// axios.get('/api/auth/leaderboard/kills')
	
	// .then(res => {
	// 	let status = res.status;
	// 	if(status == 200){
	// 		let tmp = res.data;
	// 		let index = "p";
	// 		let j = 1;
	// 		var topKills = {}
	// 		for(let i in tmp){
	// 			topKills["p" + j.toString()] = tmp[i].kills;    
	// 			j++;  
	// 		}
	// 	}
	// 	updateGameUI("topKills", topKills);
	// });

	// axios.get('/api/auth/leaderboard/score')
	// .then(res => {
	// 	let status = res.status;
	// 	if(status == 200){
	// 		let tmp = res.data;
	// 		let index = "p";
	// 		let j = 1;
	// 		var topScore = {}
	// 		for(let i in tmp){
	// 			topScore["p" + j.toString()] = tmp[i].score;    
	// 			j++;  
	// 		}
	// 	}
	// 	updateGameUI("topScore", topScore);
	// });

	// axios.get('/api/auth/leaderboard/timeSurvived')
	// .then(res => {
	// 	let status = res.status;
	// 	if(status == 200){
	// 		let tmp = res.data;
	// 		let index = "p";
	// 		let j = 1;
	// 		var topTime = {}
	// 		for(let i in tmp){
	// 			topTime["p" + j.toString()] = tmp[i].timeSurvived;    
	// 			j++;  
	// 		}
	// 	}
	// 	updateGameUI("topTime", topTime);
	// });
	return false;
}


function updateHud(params){
	this.setState((prevState, props)=>{
		return {time:params.time,
			health:params.health,
			ammo:params.ammo,
			weapon:params.weapon,
			score:params.score,
			kills:params.kills,
			time:params.time,
			special:params.special,
			class:params.class,
			topKills: prevState.topKills,
			topTime: prevState.topTime,
			topScore: prevState.topScore
		};
	});
}


function updateGameUI(choice, data){
	this.setState((prevState, props)=>{
		let cp = prevState;
		cp[choice] = data;
		return cp;
	});
}

class GameUI extends React.Component{
	constructor(props){
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
		this.state={
			time:0,
			health:100,
			ammo:0,
			weapon:"N/A",
			score:0,
			kills:0,
			time:0,
			special:"N/A",
			class:"N/A",
			topKills: {p1:"N/A",p2:"N/A",p3:"N/A",p4:"N/A",p5:"N/A"},
			topTime: {p1:"N/A",p2:"N/A",p3:"N/A",p4:"N/A",p5:"N/A"},
			topScore: {p1:"N/A",p2:"N/A",p3:"N/A",p4:"N/A",p5:"N/A"}
		}
		updateHud = updateHud.bind(this);
		updateGameUI = updateGameUI.bind(this);
	}

	




	render(props){
		return(
		<div id="ui_inGame">
		<div className="gameHudTL"> 
			<div id='gamebar1' className='gameHudPadding'>
				<p>
					<span className="glitch">HEALTH:</span>
					<span id='liveHealth' className="whiteGlitch">{this.state.health}</span>
				</p>
				
				<p>
					<span className="glitch">ABILITY:</span>
					<span id='liveAbility' className="whiteGlitch">{this.state.special}</span>
				</p>
			</div>
		</div>
		{/* <div className="gameHudTR"> 
			<div id='gamebar2' className='gameHudPadding'>
				<p>
					<span className="whiteGlitch">1:</span><span className="whiteGlitch" id="p1">{this.state.topScore.p1}</span>
				</p>
				
				<p>
					<span className="whiteGlitch">2:</span><span className="whiteGlitch" id="p2">{this.state.topScore.p2}</span>
				</p>
				<p>
					<span className="whiteGlitch">3:</span><span className="whiteGlitch" id="p3">{this.state.topScore.p3}</span>
				</p>
				<p>
					<span className="whiteGlitch">4:</span><span className="whiteGlitch" id="p4">{this.state.topScore.p4}</span>
				</p>
				<p>
					<span className="whiteGlitch">5:</span><span className="whiteGlitch" id="p5">{this.state.topScore.p5}</span>
				</p>
			</div>
		</div> */}

		<div className="gameHudBL"> 
			<div id='gamebar3' className='gameHudPadding'>
				<p>
					<span className="glitch">WEAPON:</span>
					<span id='liveWeapon' className="whiteGlitch">{this.state.weapon}</span>
				</p>
				<p>
					<span className="glitch">AMMO:</span>
					<span id='liveAmmo' className="whiteGlitch">{this.state.ammo}</span>
				</p>
			</div>
		</div>

		<div className="gameHudBR">
			<div id='gamebar4' className='gameHudPadding'>
				<p>
					<span className="glitch">SCORE:</span>
					<span id='liveScores' className="whiteGlitch">{this.state.score}</span>
				</p>
				<p>
					<span className="glitch">KILLS:</span>
					<span id='liveKills' className="whiteGlitch">{this.state.kills}</span>
				</p>
				<p>
					<span className="glitch">TIME:</span>
					<span id='liveTime' className="whiteGlitch">{this.state.time}</span>
				</p>
			</div>
		</div>
	</div>
		);
	}
}

class PauseUI extends React.Component{
	constructor(props){
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
	}
	render(props){
		return(

			<div id="ui_pause" className='pauseMain'>
			<h3 className='pauseGlitch'>PAUSED</h3>	
			<p>
				<strong>Controls:</strong><br/>
				<p className='instructLBT0'>
					Movement: 
					<span className="glitch">W</span>,
					<span className="glitch">A</span>,
					<span className="glitch">S</span>,
					<span className="glitch">D</span> 
					to move 
					<span className="glitch">UP</span>,
					<span className="glitch">LEFT</span>,
					<span className="glitch">DOWN</span>,
					<span className="glitch">RIGHT</span>.
				</p>
				<br/>
				<p className='instructLBT5'>
					Aim and Shoot: Use the 
					<span className="glitch">Mouse</span> to 
					<span className="glitch">Aim</span> and the 
					<span className="glitch">Left Click</span> to 
					<span className="glitch">Shoot</span>.
				</p>
				<br/>
					<p className='instructLBT5'>
						Class Ability: Press 
						<span className="glitch">E</span> to use your  
						<span className="glitch">Class Ability</span>.
					</p>
			</p>
	
		
		<div className='bottom10'>
			<strong>Game Statistics:</strong><br/>
			<div>
				Kills:
				<input type="text" id='pauseKills' className='gameOverText' placeholder="42069" />
			</div>
			<div>
				Time:
				<input type="text" id='pauseTime' className='gameOverText' placeholder="420:69"/>
			</div>
			<div>
				Score:
				<input type="text" id='pauseScore' className='gameOverText' placeholder="42069"/>
			</div>
			<TestButton clickHandler={this.registerHandler} class="playButton" val="LEAVE" id="leave"/>
		</div>
		
		</div>

		);
	}
}

function updateGO(params){
	this.setState((prevState, props)=>{
		return params;
	});
}

class GameOverUI extends React.Component{
	constructor(props){
		super(props);
		this.registerHandler = this.props.registerHandler.bind(this);
		this.state={
			kills:0,
			time:0,
			score:0
		}
		updateGO = updateGO.bind(this);
	}
	render(props){
		return(
			<div id="ui_gameOver" className='gameOverHolder' style={{top:'30%'}}>
		<h3 className='glitchCenter'>
			Subject Perished
		</h3>
		<h3 className='TACenter'>"Retrieve the remains.<br/>We must continue."</h3>
		<div>
			Kills:
			<input type="text" id='gameOverKills' className='gameOverText' value={this.state.kills} readonly/>
		</div>
		<div>
			Time:
			<input type="text" id='gameOverTime' className='gameOverText' value={this.state.time} readonly/>
		</div>
		<div>
			Score:
			<input type="text" id='gameOverScore' className='gameOverText' value={this.state.score}  readonly/>
		</div>
		<div className='gameOverButtons'>
		<TestButton clickHandler={this.registerHandler} class="introSubL" val="Play Again" id="gameOverPlay"/>
		<TestButton clickHandler={this.registerHandler} class="introSubR" val="Logout" id="gameOverLogOut"/>
			{/* <input type="button" id="gameOverRetry" className="introSubL" value="Play gain"/>
			<input type="button" id="gameOverLogOut" className="introSubR" value="Log Out"/> */}
		</div>
	</div>
		);
	}
}



function fakeLookTo(){
	console.log("We stopped an error");
}

class CanvasComponent extends React.Component {
	constructor(props){
		super(props);
		this.state={
			details:{"health":100, "score":0, "kills":0,"radius":0, "position":{"x":0, "y":0}, "time":0.0, "playerMove":{"x":0, "y":0}},
			assets:{}
		}

		
		this.width = 1000;
		this.height = 1000;
		this.pause = false;
		console.log("username:" + this.props.username + ",  class:" + this.props.class);
		this.data={
			first:false,
			move:{up:false, down:false, right:false, left:false},
			shoot: false,
			shootRelease: false,
			special:false,
			class: this.props.class,
			username: this.props.username,
			lookAt: {x:0, y:0}
		}


		// axios.post('/api/user', {username:this.props.username})
		// .then(res => {
		// 	let status = res.status;
		// 	if(status != 200){
		// 		alert("Username Invalid, will enter as Guest");
		// 		value = "XXX";
		// 		leaderboard = false;
		// 	}
		// }).then(() =>{
		// 	if(leaderboard){
		// 		axios.post('/api/auth/leaderboard', {username:this.props.username})
		// 		.then(res => {
		// 			let status = res.status;
		// 			if(status != 200){
		// 				alert("Username Invalid, will enter as Guest");
		// 				value = "XXX";
		// 				leaderboard = false;
		// 			}
		// 		});
		// 	}
		// });

		this.touchData = {};

		// updateTest = updateTest.bind(this);
		firstConnection = firstConnection.bind(this);
		updateCanvasDataMove = updateCanvasDataMove.bind(this);
		
		this.doThing = this.doThing.bind(this);

		// Event Handlers
		this.moveByKey = this.moveByKey.bind(this);
		this.stopMove = this.stopMove.bind(this);
		this.lookTo = fakeLookTo.bind(this);
		this.shoot = this.shoot.bind(this);
		this.shootRelease = this.shootRelease.bind(this);
		this.updateTouch = this.updateTouch.bind(this);

		this.draw = this.draw.bind(this);
		this.sendData = this.sendData.bind(this);
		this.checkDeath = this.checkDeath.bind(this);

		// try{
		// 	this.ws = new WebSocket(`ws://localhost:8082`);
		// }catch(e){
		// 	setLockValue("Register");
		// }
		this.connect = true;
		this.details = {};
		this.assets = {};

	}
	
	

    componentDidMount() {

		

		try{
			this.ws = new WebSocket(`ws://localhost:8082`);
		}catch(e){
			setLockValue("Register");
		}

		document.querySelector("#root").addEventListener("click", (event)=>{
			event.preventDefault();
		}, false);		

        this.updateCanvas();

		this.ws.onopen = function (event) {
			console.log("connected");
			firstConnection();
		};

		this.ws.onclose =  (event) => {
			console.log("bye bye server");
		};

		this.ws.onmessage =  (event)=>{
			console.log("message recieved");
			var message=JSON.parse(event.data);
			console.log(message);
			this.setState((prevState, props) => {
				return message;
			});
			//updateTest(message);
			getLeaderboard();
			this.checkDeath();

			var params ={
				time:this.state.details.time,
				health: this.state.details.health,
				ammo: this.state.details.ammo,
				weapon:this.state.details.gun,
				score:this.state.details.score,
				kills:this.state.details.kills,
				time:this.state.details.time,
				special:this.state.details.special,
				class:this.data.class
			}
			updateHud(params);
		}
		


		document.addEventListener('keydown', this.moveByKey);
        document.addEventListener('keyup', this.stopMove);
        document.addEventListener('mousemove', this.lookTo);
        document.addEventListener('mousedown', this.shoot);
        document.addEventListener('mouseup', this.shootRelease);
		

		this.refs.canvas.addEventListener('touchend', (event) => { this.updateTouch("touchend", event); });
		this.refs.canvas.addEventListener('touchmove', (event) => { this.updateTouch("touchmove", event); });
		this.refs.canvas.addEventListener('touchstart', (event) => { this.updateTouch("touchstart", event) ;});


    }


	componentWillUnmount(){
		// close connection
		document.removeEventListener('keydown', this.moveByKey);
        document.removeEventListener('keyup', this.stopMove);
        document.removeEventListener('mousemove', this.lookTo);
        document.removeEventListener('mousedown', this.shoot);
        document.removeEventListener('mouseup', this.shootRelease);

		document.removeEventListener('touchend', (event) => { this.updateTouch("touchend", event); });
		document.removeEventListener('touchmove', (event) => { this.updateTouch("touchmove", event); });
		document.removeEventListener('touchstart', (event) => { this.updateTouch("touchstart", event) ;});

		
	}


	checkDeath(){
		if(this.state.details.health <= 0){
			// this.ws.close();
			setLockValue("GameOver");
			var params ={
				time:this.state.details.time,
				health: this.state.details.health,
				ammo: this.state.details.ammo,
				weapon:this.state.details.gun,
				score:this.state.details.score,
				kills:this.state.details.kills,
				time:this.state.details.time,
				special:this.state.details.special,
				class:this.data.class
			}
			updateHud(params);
			updateGO(params);

			document.removeEventListener('keydown', this.moveByKey);
			document.removeEventListener('keyup', this.stopMove);
			document.removeEventListener('mousemove', this.lookTo);
			document.removeEventListener('mousedown', this.shoot);
			document.removeEventListener('mouseup', this.shootRelease);

			document.removeEventListener('touchend', (event) => { this.updateTouch("touchend", event); });
			document.removeEventListener('touchmove', (event) => { this.updateTouch("touchmove", event); });
			document.removeEventListener('touchstart', (event) => { this.updateTouch("touchstart", event) ;});
			
			this.ws.close();
		}
		
	}


	componentDidUpdate(){
		console.log(this.state.test);
		this.updateCanvas();		
		
	}

	doThing(){
		this.setState((prevState, props) => {
			return {test: prevState.test+1};
		});
	}

	updateTouch(eventType, event){
		event.preventDefault();
		setLockValue("TouchPlay");

		var cRect = this.refs.canvas.getBoundingClientRect();
		
		if(eventType == "touchend"){
			this.shootRelease(event);
		}	
		if(eventType == "touchmove" ){
			this.lookTo(event.touches[event.touches.length - 1]);
			var i = 0;
			var right_touches = 0;
			var keep = true;
			for(i; i < event.touches.length; i++){
				if(event.touches[i].clientX - cRect.left> this.width/2) right_touches ++;
				if (right_touches >= 2 && keep){
					event.key = 'e';
					this.moveByKey(event);	
					keep = false;
				}
			}

		} 
		
		
		if(eventType == "touchstart"){
			
			var i = 0;
			var right_touches = 0;
			var keep = true;
			for(i; i < event.touches.length; i++){
				if(event.touches[i].clientX  - cRect.left > this.width/2) right_touches ++
				if (right_touches >= 2 && keep){
					event.key = 'e';
					this.moveByKey(event);	
					keep = false;
				}
			}
			
			
			if(keep){
				this.shoot();
				this.lookTo(event.touches[event.touches.length - 1]);
			}
		
		}

	}

	moveByKey(event){
		var key = event.key;

		if(key != 'e') setLockValue("Play");
			
		if(key == 'w')
				this.data.move.up=true;
		if(key == 'a')
				this.data.move.left=true;
		if(key == 's')
				this.data.move.down=true;
		if(key == 'd')    
				this.data.move.right=true; 
		if(key == 'e')
				this.data.special=true;
		if(key == 'Escape')
			if(!this.pause){
					setLockValue("Paused");
					this.pause = true;
			}else{
					setLockValue("Play");
					this.pause = false;
			}             
				
		this.sendData();
		this.data.special=false;
		this.data.first=false;
			
	}

	sendData(){

		try{
			this.ws.send(JSON.stringify(this.data));
		}catch(e){
	
			setLockValue("Register");
	
		}
	}

	// ------new------ 

	shoot(event){
		// event.preventDefault();
		this.data.shoot=true;
		this.sendData();
		this.data.shoot=false;
	}

	shootRelease(event){
		event.preventDefault();
		this.data.shoot=false;
		this.data.shootRelease=true;
		this.sendData();
		this.data.shootRelease=false;
		this.data.first=false;
	}


	reallookTo(event){

		if(this.ws){
			var cRect = this.refs.canvas.getBoundingClientRect();

			let mouseX = Math.round(event.clientX - cRect.left);
			let mouseY = Math.round(event.clientY - cRect.top);

			this.data.lookAt = {x:mouseX, y:mouseY};
			this.sendData();
			return true;
		}else{
			return false;
		}	
		
	}

	stopMove(event){
		var key = event.key;
			
		if(key == 'w')
				this.data.move.up=false;
		if(key == 'a')
				this.data.move.left=false;
		if(key == 's')
				this.data.move.down=false;
		if(key == 'd')    
				this.data.move.right=false; 
		// if(key == 'e')
		// 		this.data.special=true;           
				
		this.sendData();
		this.data.first=false;
		// this.data.special=false;
	}

	draw(asset, context){
		if(asset.shape == "c"){
		
			context.fillStyle = asset.color;
			context.strokeStyle = "black";
			context.beginPath();
			context.arc(asset.position.x, asset.position.y, asset.radius, 0, 2 * Math.PI, false); 
			context.fill();   
			// context.closePath();


			
			context.moveTo(asset.position.x, asset.position.y);
			// context.beginPath();
			context.lineTo(asset.position.x + asset.look.x, asset.position.y+asset.look.y);
			context.stroke();   
			
			context.closePath();

		}else if (asset.shape == "r"){
			context.fillStyle = asset.color;
			context.strokeStyle = "black";
			context.beginPath();
			context.rect(asset.position.x - asset.radius, asset.position.y - asset.radius, asset.radius*2, asset.radius*2);
			context.fill();
			context.stroke();
			context.closePath();
		}else{
			context.strokeStyle = asset.color;
			context.beginPath();
			// context.lineWidth = 5;
			context.moveTo(asset.start.x, asset.start.y); 
			context.lineTo(asset.position.x, asset.position.y);			
			context.stroke();	
			context.closePath();
		}
		if(asset.health != -1){
			var startPos = {"x":asset.position.x - asset.radius, "y":asset.position.y + asset.radius + 2};
		
			// Black background
			context.fillStyle = "black";
			context.beginPath();
			context.rect(startPos.x - 1, startPos.y - 1, 2*asset.radius + 2, 6);
			context.fill();
			context.closePath()

			// Red to show how much health lost
			context.fillStyle = "red";
			context.beginPath();
			context.rect(startPos.x, startPos.y, 2*asset.radius, 4);
			context.fill();
			context.closePath()

			// Red to show how much health lost
			context.fillStyle = "green";
			context.beginPath();
			context.rect(startPos.x, startPos.y, (asset.health/asset.maxHealth)*2*asset.radius, 4);
			context.fill();
			context.closePath()
		}

		if(asset.username != ""){
			context.fillStyle = "red";
			context.font = "12px Arial";
			context.textAlign = "center"; 
			context.fillText(asset.username, asset.position.x, asset.position.y - asset.radius - 1);
		}
	}

    updateCanvas() {
        const context = this.refs.canvas.getContext('2d');

		context.translate(-this.state.details.playerMove.x, -this.state.details.playerMove.y);
		
		context.clearRect(-this.width, -this.height, 3*this.width, 3*this.height);

		
		// console.log("... just checking");
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
		
		for(let a in this.state.assets){
			context.beginPath();
			this.draw(this.state.assets[a], context);
			context.closePath(); // just incase
			context.beginPath();
			context.closePath();
		}



		context.translate(this.state.details.playerMove.x, this.state.details.playerMove.y);
    }
    render() {
        return (
			<div id="map">
			
            <canvas ref="canvas" width={1000} height={1000}/>
			</div>
        );
    }
}


function setLockValue(v){
	this.setState( (prevState, props) => {
		return { pageStatus:v};
	});
}

function getInfoFromLock(){
	return {class:this.class, username:this.username};
}


class Lock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			//store account status here too
			pageStatus: "Register",
		}
		this.username = 'XXX';
		this.class = '';
		this.lockButtonClickHandler = this.lockButtonClickHandler.bind(this);
		this.formInputHandler = this.formInputHandler.bind(this);
		this.radialInputHandler = this.radialInputHandler.bind(this);
		setLockValue = setLockValue.bind(this);
		getInfoFromLock = getInfoFromLock.bind(this);
	}
	radialInputHandler(e){
		var value = e.target.value;
		var id = e.target.id;
		console.log(id);
		console.log(value);
		console.log("this is a radial input");
		// this.setState((prevState,props)=>{
		// 	return{class:value, pageStatus:prevState.pageStatus, username:prevState.username};
		// });
		this.class = value;
		console.log("class:" + this.class);
		console.log("not implemented");
	}

	formInputHandler(e){
		var value = e.target.value;
		var id = e.target.id;
		var leaderboard = true;

		console.log(id);
		console.log(value);
		console.log("this is a text input");
		this.username = value;
	}

	lockButtonClickHandler(e){
		var value = e.target.value;
		var classs= e.target.className;
		console.log(e);
		console.log(value);
		console.log(classs);
		
		console.log("this is in lock");

		this.setState( (prevState, props) => {
			console.log("changing state: this is previous state:");
			console.log(prevState.pageStatus);
			console.log("end previous status");
			if(value === 'Enter'){
				return { pageStatus: "Main"}
			}
			if(value === 'Main' || value === 'LEAVE' ){
				return {pageStatus: "Main"}
			}
			if(value === 'About'){
				return {pageStatus: "About"}
			}
			if(value === 'Play' || value === 'PLAY'){
				return {pageStatus: "Play"}
			}
			if(value === 'Instructions'){
				return {pageStatus: "Instruction"}
			}
			if(value === 'Logout' || value === 'Play Again'){
				window.location.reload(false);
				return {pageStatus: "Register"}
			}
			if(classs === 'mainHeaderClick' || classs === 'glitchHeader' || classs === 'aboutHeaderClick'){
				return {pageStatus: "Main"}
			}
		});
	}

	render(){
		if(this.state.pageStatus === 'Register'){
			return(
			<div>
				<RegisterPage registerHandler={this.lockButtonClickHandler} formHandler={this.formInputHandler} radialHandler={this.radialInputHandler}/>
			</div>
			);
		}
		else if(this.state.pageStatus === 'Main'){
			return(
			<div>
				<MainPage registerHandler = {this.lockButtonClickHandler}/>
			</div>
			);
		}
		else if(this.state.pageStatus === 'About'){
			return(
			<div>
				<AboutPage registerHandler = {this.lockButtonClickHandler}/>
			</div>
			);
		}
		else if(this.state.pageStatus === 'Instruction'){
			return(
			<div>
				<InstructionPage registerHandler = {this.lockButtonClickHandler}/>
			</div>
			);
		}
		else if(this.state.pageStatus === 'Play'){
			return(
			<div className='showGame'>
				<CanvasComponent username = {this.username} class = {this.class}/>
				<GameUI registerHandler = {this.lockButtonClickHandler}/>
				
				{/* <GameOverUI registerHandler = {this.lockButtonClickHandler}/> */}
				{/* <PauseUI registerHandler = {this.lockButtonClickHandler}/> */}
			</div>
			);
		}
		else if(this.state.pageStatus === 'TouchPlay'){
			return(
			<div className='showGame'>
				<CanvasComponent username = {this.username} class = {this.class}/>
				<GameUI registerHandler = {this.lockButtonClickHandler}/>
				<Controller/>
				
				{/* <GameOverUI registerHandler = {this.lockButtonClickHandler}/> */}
				{/* <PauseUI registerHandler = {this.lockButtonClickHandler}/> */}
			</div>
			);
		}
		else if(this.state.pageStatus === 'Paused'){
			return(
			<div className='showGame'>
				<CanvasComponent username = {this.username} class = {this.class}/>
				<GameUI registerHandler = {this.lockButtonClickHandler}/>
				{/* <GameOverUI registerHandler = {this.lockButtonClickHandler}/> */}
				<PauseUI registerHandler = {this.lockButtonClickHandler}/>
			</div>
			);
		}
		else if(this.state.pageStatus === 'GameOver'){
			return(
			<div className='showGame'>
				<CanvasComponent username = {this.username} class = {this.class}/>
				<GameUI registerHandler = {this.lockButtonClickHandler}/>
				<GameOverUI registerHandler = {this.lockButtonClickHandler}/>
				{/* <PauseUI registerHandler = {this.lockButtonClickHandler}/> */}
			</div>
			);
		}
		//else case tbd
		return(
			<div>
				<RegisterPage registerHandler = {this.lockButtonClickHandler} formHandler={this.formInputHandler}/>
			</div>
			);
	}
}

export {Lock};