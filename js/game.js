class Game {
	static instance //Singleton instance of Game class

	constructor(rows, columns, playersCount) {
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

		this.players = [
			{ name: "Player 1", color: "pink", filledBoxes: 0 },
			{ name: "Player 2", color: "skyblue", filledBoxes: 0 },
			{ name: "Player 3", color: "lightgreen", filledBoxes: 0 },
			{ name: "Player 4", color: "magenta", filledBoxes: 0 },
			{ name: "Player 5", color: "yellow", filledBoxes: 0 },
			{ name: "Player 6", color: "orange", filledBoxes: 0 }
		]

		let p = this.players.length - playersCount
		for (let i = 0; i < p; i++)
			this.players.pop()

		this.currentPlayerIndex = 0
		this.currentPlayer = this.players[this.currentPlayerIndex]

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
		
		const player = this.players.reduce((prev, current) => {
			return prev.filledBoxes > current.filledBoxes ? prev : current
		});

		setTimeout(() => {
			let play = this.players[0].filledBoxes

			//Check for winner
			if (this.players.every((p) => p.filledBoxes == play)) {
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
		this.players.forEach((player, index) => {
			const div = document.createElement("div")
			div.classList.add("player")

			//Maintain filled boxes.
			const b = document.createElement("b")
			b.classList.add("filled-boxes")
			b.textContent = player.filledBoxes
			b.style.background = player.color
			this.players[index]["filledBoxesUI"] = b

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
			this.currentPlayerIndex = ++this.currentPlayerIndex % this.players.length
			this.currentPlayer = this.players[this.currentPlayerIndex]
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

const settingsUI = document.querySelector(".settings")
const rowsInput = document.querySelector("#rows")
const columnsInput = document.querySelector("#columns")
const playersInput = document.querySelector("#players-count")
const startBtn = document.querySelector(".start-btn")
const heading = document.querySelector(".heading")
const bgMusic = new Audio('./sounds/bgMusic.mp3');
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
		// Show the "Start Again" and "Exit" buttons
        document.querySelector('.start-again-btn').classList.remove('hidden');
        document.querySelector('.exit-btn').classList.remove('hidden');
		document.querySelector('.mute-btn').classList.remove('hidden');
		
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
};
const startAgainBtn = document.querySelector('.start-again-btn');
const exitBtn = document.querySelector('.exit-btn');
// Event listener for the Start button
startAgainBtn.addEventListener('click', () => {
    window.location.reload(); // Reload the page
});
// Event listener for the Exit button
exitBtn.addEventListener('click', () => {
	window.location.reload();
});