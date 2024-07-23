class Game {
	static instance; // Singleton instance of Game class

	constructor(rows, columns, playersInfo) {
		if (Game.instance == null) Game.instance = this;

		this.playersUI = document.querySelector(".players");
		this.playerNameUI = document.querySelector(".player-turn .name");
		this.playerTurnBgUI = document.querySelector(".player-turn .bg");

		this.events = {
			edgeFill: [],
			boxFill: [],
			playerSwitch: [],
			playerWin: [],
		};

		this.players = playersInfo;
		// this.players = [
		// 	{ name: "Player 1", color: "pink", filledBoxes: 0 },
		// 	{ name: "Player 2", color: "skyblue", filledBoxes: 0 },
		// 	{ name: "Player 3", color: "lightgreen", filledBoxes: 0 },
		// 	{ name: "Player 4", color: "magenta", filledBoxes: 0 },
		// 	{ name: "Player 5", color: "yellow", filledBoxes: 0 },
		// 	{ name: "Player 6", color: "orange", filledBoxes: 0 },
		// ];

		this.currentPlayerIndex = 0;
		this.currentPlayer = this.players[this.currentPlayerIndex];

		this.board = new Board(rows, columns);

		this.isGameover = false;

		this.addPlayersUI();
		this.updatePlayerNameUI();

		// Adding event listeners for filling box, switching player, and winning
		this.addEventListener("boxFill", () => this.onBoxFill());
		this.addEventListener("playerSwitch", () => this.onPlayerSwitch());
		this.addEventListener("playerWin", () => this.onPlayerWin());
	}

	// End Game
	onPlayerWin() {
		this.isGameover = true;
		this.removeEventListener("boxFill");

		let winSound = new Audio("../assets/sounds/win.mp3");
		winSound.play();

		// Determine winner or draw
		const winner = this.determineWinner(this.players);

		// Display the result
		if (winner === "DRAW") {
			this.playerNameUI.parentElement.textContent = "DRAW";
			this.playerTurnBgUI.classList.add("win");
			this.playerTurnBgUI.style.background = "#eaeaea";
		} else {
			this.playerNameUI.parentElement.textContent = `${winner.name} wins`;
			this.playerTurnBgUI.classList.add("win");
			this.playerTurnBgUI.style.background = winner.color;
		}

		// Open the win overlay
		document.getElementById("win-overlay").style.height = "100%";
	}

	determineWinner(players) {
		// Find the maximum number of filled boxes
		const maxBoxes = Math.max(...players.map((player) => player.filledBoxes));

		// Find how many players have the maximum number of filled boxes
		const result = players.filter((player) => player.filledBoxes === maxBoxes);

		if (result.length > 1) {
			return "DRAW";
		} else {
			return result[0];
		}
	}

	onPlayerSwitch() {
		this.updatePlayerNameUI();
	}

	// If a box is filled, increment players' score with the number of boxes filled by him/her and update UI
	onBoxFill() {
		this.currentPlayer.filledBoxes++;
		this.updatePlayerScoreUI();
	}

	// Add players to UI
	addPlayersUI() {
		this.players.forEach((player, index) => {
			const div = document.createElement("div");
			div.classList.add("player");

			// Maintain filled boxes.
			const b = document.createElement("b");
			b.classList.add("filled-boxes");
			b.textContent = player.filledBoxes;
			b.style.background = player.color;
			this.players[index]["filledBoxesUI"] = b;

			// Maintain player name.
			const span = document.createElement("span");
			span.textContent = player.name;

			div.appendChild(b);
			div.appendChild(span);

			// Adding score and name to the element
			this.playersUI.appendChild(div);
		});
	}

	// Update player score UI used while switching player
	updatePlayerScoreUI() {
		this.currentPlayer.filledBoxesUI.innerText = this.currentPlayer.filledBoxes;
	}

	// Update player name UI used while switching player
	updatePlayerNameUI() {
		this.playerNameUI.innerText = this.currentPlayer.name;
		this.playerTurnBgUI.style.background = this.currentPlayer.color;
	}

	eventExist(event) {
		return this.events.hasOwnProperty(event);
	}

	// Add event listeners
	addEventListener(event, callback) {
		if (!this.eventExist(event)) {
			console.error(`${event} event is not defined`);
			return;
		}

		this.events[event].push(callback);
	}

	// Remove event listeners
	removeEventListener(event, callback) {
		if (!this.eventExist(event)) {
			console.error(`${event} event is not defined`);
			return;
		}
		this.events[event].splice(this.events[event].indexOf(callback), 1);
	}

	// Invoke event listeners
	invokeEvent(event, args) {
		if (!this.eventExist(event)) {
			console.error(`${event} event is not defined`);
			return;
		}
		this.events[event].forEach((callback) => callback(args));
	}

	// Switch player
	switchPlayer() {
		if (!this.isGameover) {
			this.currentPlayerIndex = ++this.currentPlayerIndex % this.players.length;
			this.currentPlayer = this.players[this.currentPlayerIndex];
			this.invokeEvent("playerSwitch");
		}
	}
}

// Declaring Global Variables

const rowsInput = Number(localStorage.getItem("rows"));
const columnsInput = Number(localStorage.getItem("columns"));
const playersInput = Number(localStorage.getItem("playersCount"));
const bgMusic = new Audio("../assets/sounds/bgMusic.mp3");
var game = null;

document.addEventListener("DOMContentLoaded", () => {
	bgMusic.volume = 0.1;
	bgMusic.play();

	const playersCount = calculate(playersInput, 2, 6);
	renderPlayerInputs(playersCount);

	const storedTheme = localStorage.getItem("selectedTheme");
	const video = document.getElementById("myVideo");
	video.src = `/assets/videos/${storedTheme}.mp4`;

	const musicToggleBtn = document.getElementById("music-toggle");
	musicToggleBtn.addEventListener("click", () => {
		if (bgMusic.paused) {
			bgMusic.play();
			musicToggleBtn.innerText = "Music On";
		} else {
			bgMusic.pause();
			musicToggleBtn.innerText = "Music Off";
		}
	});
});

function calculate(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

function renderPlayerInputs(count) {
	const playerInputsDiv = document.getElementById("playerInputs");
	playerInputsDiv.innerHTML = ""; // Clear existing inputs
	const colors = [
		"pink",
		"skyblue",
		"lightgreen",
		"yellow",
		"magenta",
		"orange",
	];
	for (let i = 1; i <= count; i++) {
		const div = document.createElement("div");
		div.classList.add("player-input");
		div.innerHTML = `
			<label for="playerName${i}">Player ${i} Name:</label>
			<input type="text" id="playerName${i}" placeholder="Player ${i}" value="Player ${i}">
			<label for="playerColor${i}">Player ${i} Color:</label>
			<select id="playerColor${i}" onchange="validateColors()">
			${colors
				.map(
					(color, index) =>
						`<option value="${color}" ${
							index === i - 1 ? "selected" : ""
						}>${color}</option>`
				)
				.join("")}

			<select id="playerColor${i}" value="${i}">
				<option value="pink">Pink</option>
				<option value="skyblue">Skyblue</option>
				<option value="lightgreen">Light Green</option>
				<option value="yellow">Yellow</option>
				<option value="magenta">Magenta</option>
				<option value="orange">Orange</option>
			</select>
		`;
		playerInputsDiv.appendChild(div);
	}
}

function validateColors() {
	const playersCount = calculate(playersInput, 2, 6);
	const selectedColors = new Set();
	for (let i = 1; i <= playersCount; i++) {
		const colorSelect = document.getElementById(`playerColor${i}`);
		const color = colorSelect.value;
		if (selectedColors.has(color)) {
			alert(
				`Color ${color} is already selected. Please choose a different color.`
			);
			colorSelect.value = "";
		} else {
			selectedColors.add(color);
		}
	}
}

function savePlayers() {
	const playersCount = calculate(playersInput, 2, 6);
	const playerData = [];
	for (let i = 1; i <= playersCount; i++) {
		const name = document.getElementById(`playerName${i}`).value;
		const color = document.getElementById(`playerColor${i}`).value;
		const filledBoxes = 0;
		playerData.push({ name, color, filledBoxes });
	}
	console.log(playerData);
	localStorage.setItem("playerData", JSON.stringify(playerData));
}

// Start the game
playBtn.addEventListener("click", () => {
	savePlayers();
	document.getElementById("playerSetup").style.display = "none";
	const rows = calculate(rowsInput, 5, 30);
	const columns = calculate(columnsInput, 5, 30);
	const playersInfo = JSON.parse(localStorage.getItem("playerData"));
	game = new Game(rows, columns, playersInfo);
});
