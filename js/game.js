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


