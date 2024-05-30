class Game {
	static instance //Singleton instance of Game class

	constructor(rows, columns, playersCount, playerNames) {
		if (Game.instance == null) Game.instance = this

		this.playersUI = document.querySelector(".players")
		this.playerNameUI = document.querySelector(".player-turn .name")
		this.playerTurnBgUI = document.querySelector(".player-turn .bg")

		this.events = {
			edgeFill: [],
			boxFill: [],
			playerSwitch: [],
			playerWin: [],
		}



		players = [
			{ name: String(playerNames[0]), color: "pink", filledBoxes: 0 },
			{ name:  playerNames[1], color: "skyblue", filledBoxes: 0 },
			{ name:  playerNames[2], color: "lightgreen", filledBoxes: 0 },
			{ name:  playerNames[3], color: "magenta", filledBoxes: 0 },
			{ name:  playerNames[5], color: "yellow", filledBoxes: 0 },
			{ name:  playerNames[6], color: "orange", filledBoxes: 0 }
		]

		let p = players.length - playersCount
		for (let i = 0; i < p; i++)
			players.pop()

		this.currentPlayerIndex = 0
		this.currentPlayer = players[this.currentPlayerIndex]

		this.board = new Board(rows, columns)

		this.isGameover = false

		this.addPlayersUI()
		this.updatePlayerNameUI()

		//Adding event listeners for filling box, switching player and winning
		this.addEventListener("boxFill", () => this.onBoxFill())
		this.addEventListener("playerSwitch", () => this.onPlayerSwitch())
		this.addEventListener("playerWin", () => this.onPlayerWin())
	}

	//End Game
	onPlayerWin() {
		this.isGameover = true

		bgMusic.pause();
		let winSound = new Audio('./sounds/win.mp3');
		winSound.play();
		
		const player = players.reduce((prev, current) => {
			return prev.filledBoxes > current.filledBoxes ? prev : current
		});

		setTimeout(() => {
			let play = players[0].filledBoxes

			//Check for winner
			if (players.every((p) => p.filledBoxes == play)) {
				this.playerNameUI.parentElement.textContent = "Nobody wins"
				this.playerTurnBgUI.classList.add("no-win")
				this.playerTurnBgUI.style.background = "#eaeaea"
			} else {
				this.playerNameUI.parentElement.textContent = `${player.name} wins`
				this.playerTurnBgUI.classList.add("win")
				this.playerTurnBgUI.style.background = player.color
			}
		}, 500);
	}

	onPlayerSwitch() {
		this.updatePlayerNameUI();
	}

	//If a box if filled, increament players score with number of boxes filled by him/her and update UI
	onBoxFill() {
		this.currentPlayer.filledBoxes++
		this.updatePlayerScoreUI();
	}

	//Add players to UI
	addPlayersUI() {
		players.forEach((player, index) => {
			const div = document.createElement("div")
			div.classList.add("player")

			//Maintain filled boxes.
			const b = document.createElement("b")
			b.classList.add("filled-boxes")
			b.textContent = player.filledBoxes
			b.style.background = player.color
			players[index]["filledBoxesUI"] = b

			//Maintain player name.
			const span = document.createElement("span")
			span.textContent = player.name

			div.appendChild(b)
			div.appendChild(span)

			//Adding score and name to the element
			this.playersUI.appendChild(div)
		});
	}

	//Update player score UI used while switching player
	updatePlayerScoreUI() {
		this.currentPlayer.filledBoxesUI.innerText = this.currentPlayer.filledBoxes
	}

	//Update player name UI used while switching player
	updatePlayerNameUI() {
		this.playerNameUI.innerText = this.currentPlayer.name
		this.playerTurnBgUI.style.background = this.currentPlayer.color
	}

	eventExist(event) {
		return this.events.hasOwnProperty(event)
	}

	//Add event listeners
	addEventListener(event, callback) {
		if (!this.eventExist(event)) {
			console.error(`${event} event is not defined`)
			return
		}

		this.events[event].push(callback)
	}

	//Remove event listeners
	removeEventListener(event, callback) {
		if (!this.eventExist(event)) {
			console.error(`${event} event is not defined`)
			return
		}
		this.events[event].splice(this.events[event].indexOf(callback), 1)
	}

	//Invoke event listeners
	invokeEvent(event, args) {
		if (!this.eventExist(event)) {
			console.error(`${event} event is not defined`)
			return
		}
		this.events[event].forEach((callback) => callback(args))
	}

	//Switch player
	switchPlayer() {
		if (!this.isGameover) {
			this.currentPlayerIndex = ++this.currentPlayerIndex % players.length
			this.currentPlayer = players[this.currentPlayerIndex]
			this.invokeEvent("playerSwitch")
		}
	}
}

// Selecting the mute button and icon
const muteBtn = document.querySelector(".mute-btn");
const muteIcon = document.querySelector(".mute-btn i");

// Event listener for mute button
muteBtn.addEventListener("click", () => {
	if (bgMusic.paused) {
		bgMusic.play();
		muteIcon.classList.remove("fa-volume-off"); // Remove mute icon
		muteIcon.classList.add("fa-volume-up");    // Add unmute icon
	} else {
		bgMusic.pause();
		muteIcon.classList.remove("fa-volume-up");  // Remove unmute icon
		muteIcon.classList.add("fa-volume-off");   // Add mute icon
	}
});

// Declaring Global Variables
players = ["","","","","",""]
const settingsUI = document.querySelector(".settings")
const rowsInput = document.querySelector("#rows")
const columnsInput = document.querySelector("#columns")
const playersInput = document.querySelector("#players-count")
const readyBtn = document.querySelector(".ready-btn")
const startBtn = document.querySelector(".true-start-btn")
const heading = document.querySelector(".heading")
const bgMusic = new Audio('./sounds/bgMusic.mp3');


var game = null


readyBtn.addEventListener("click", () => {
	const playersCount = calculate(playersInput.value, 2, 6)
	bgMusic.volume = 0.1;
	bgMusic.play();
	showPlayerTextBox(playersCount)

});


startBtn.addEventListener("click", () => {
	const rows = calculate(rowsInput.value, 5, 30)
	const columns = calculate(columnsInput.value, 5, 30)
	const playersCount = calculate(playersInput.value, 2, 6)
	players[0]=document.querySelector("#player1").value
	players[1]=document.querySelector("#player2").value
	players[2]=document.querySelector("#player3").value
	players[3]=document.querySelector("#player4").value
	players[4]=document.querySelector("#player5").value
	players[5]=document.querySelector("#player6").value
	game = new Game(rows, columns, playersCount, players)
	settingsUI.style.display = "none"
	heading.style.display = "none"
});



function calculate(value, min, max) {
	return Math.min(Math.max(value, min), max)
=======
var game = null;
const rowsWarning = document.querySelector("#rows-warning");
const columnsWarning = document.querySelector("#columns-warning");
const playersWarning = document.querySelector("#players-warning");
var game = null


// get warning elements
const warnings = [rowsWarning, columnsWarning, playersWarning];

// Add event listeners to input fields to remove warnings when user starts entering input again
rowsInput.addEventListener("focus", () => {
	rowsWarning.style.display = "none";
});

columnsInput.addEventListener("focus", () => {
	columnsWarning.style.display = "none";
});

playersInput.addEventListener("focus", () => {
	playersWarning.style.display = "none";
});

startBtn.addEventListener("click", () => {

	// Get values of inputs
	const rows = parseInt(rowsInput.value);
	const columns = parseInt(columnsInput.value);
	const playersCount = parseInt(playersInput.value);

	const inputValues = [rows, columns, playersCount];

	// getting validity of inputs
	let validGame = validateForm(inputValues);

	// If any input is invalid, prevent starting the game
	if (validGame === true) {
		// Set background music volume and play
		bgMusic.volume = 0.1;
		bgMusic.play();

		//start game with valid inputs
		game = new Game(rows, columns, playersCount);
		settingsUI.style.display = "none";
		heading.style.display = "none";
		document.getElementById("theme-options").style.display = "none";
		document.getElementById("theme-button").style.display = "none";
	}
});


function validateForm(inputValues) {
	let valid = true;

	for (let i = 0; i < 3; i++) {
		let value = inputValues[i];
		let warning = warnings[i];

		let min = (i===2) ? 2 : 5;
		let max = (i===2) ? 6 : 30;

		if (value == null || value < min || value > max) {
			warning.style.display = "block";
			valid = false;
		}
	}

	return valid;
}



var game = null;

function startGame() {
	const rows = parseInt(document.getElementById('rows').value);
	const columns = parseInt(document.getElementById('columns').value);
	const playersCount = parseInt(document.getElementById('players-count').value);

	if (isNaN(rows) || isNaN(columns) || isNaN(playersCount) || rows < 5 || rows > 30 || columns < 5 || columns > 30 || playersCount < 2 || playersCount > 6) {
		alert('Please enter valid values for rows, columns between 5 and 30. players between 2 to 6');
		window.location.reload();
		return; // Don't start the game if inputs are invalid
	}
}

function exitGame() {
	window.location.reload();
}


function showPlayerTextBox(playersCount){
    var infoElements = document.getElementsByClassName("info");
    for (var i = 0; i < infoElements.length; i++) {
        infoElements[i].style.display= "none";
    }
    var settingsElements = document.getElementsByClassName("PlayerTextBox");
	settingsElements[0].style.display = "flex";

	var PlayerNamesElements = document.getElementsByClassName("playerNameField");
    for (var i = 0; i < PlayerNamesElements.length; i++) {
        PlayerNamesElements[i].style.display= "none";
    }
	
    var PlayerNamesElements = document.getElementsByClassName("playerNameField");
    for (var i = 0; i < playersCount; i++) {
        PlayerNamesElements[i].style.display= "flex";
    }
}

function hidePlayerTextBox(){
	document.getElementsByClassName("settings").style.visibility = "visible";
}


