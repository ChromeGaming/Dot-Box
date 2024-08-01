class Game {
	static instance; // Singleton instance of Game class

	constructor(playersInfo) {
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

		this.currentPlayerIndex = 0;
		this.currentPlayer = this.players[this.currentPlayerIndex];
	}

	makeBoard(rows, columns) {
		this.board = new Board(rows, columns);

		this.isGameover = false;

		// Timer properties
		this.timeLeft = 30;
		this.timer = null;
		this.timerDisplay = null;
		this.isTimerStarted = false;

		this.addPlayersUI();
		this.updateScoreboard();
		this.updatePlayerNameUI();
		this.makeScoreboardDraggable();
		this.createTimerUI();

		// Adding event listeners for filling box, switching player, and winning
		this.addEventListener("boxFill", () => this.onBoxFill());
		this.addEventListener("playerSwitch", () => this.onPlayerSwitch());
		this.addEventListener("playerWin", () => this.onPlayerWin());
		this.addEventListener("edgeFill", () => this.onEdgeFill());
	}

	// Create timer UI
	createTimerUI() {
		const timerContainer = document.createElement("div");
		timerContainer.id = "timer-container";
		timerContainer.innerHTML = `
            <div id="timer">30</div>
            <div id="timer-label">seconds left</div>
        `;
		document.body.appendChild(timerContainer);
		this.timerDisplay = document.getElementById("timer");
	}

	// Start or restart the timer
	startTimer() {
		clearInterval(this.timer);
		this.timeLeft = 30;
		this.updateTimerDisplay();
		this.timer = setInterval(() => {
			this.timeLeft--;
			this.updateTimerDisplay();
			if (this.timeLeft <= 0) {
				clearInterval(this.timer);
				this.switchPlayer();
			}
		}, 1000);
	}

	// Update timer display
	updateTimerDisplay() {
		if (this.timerDisplay) {
			this.timerDisplay.textContent = this.timeLeft;
		}
	}

	// End Game
	onPlayerWin() {
		this.isGameover = true;
		this.removeEventListener("boxFill");
		clearInterval(this.timer); // Stop the timer

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
		if (this.isTimerStarted) {
			this.startTimer(); // Restart timer for the new player
		}
	}

	// If a box is filled, increment players' score with the number of boxes filled by him/her and update UI
	onBoxFill() {
		this.currentPlayer.filledBoxes++;
		this.updatePlayerScoreUI();
		this.updateScoreboard();
		if (this.isTimerStarted) {
			this.startTimer(); // Restart timer when a move is made
		}
	}

	// New method to handle edge fill event
	onEdgeFill() {
		if (!this.isTimerStarted) {
			this.isTimerStarted = true;
			this.startTimer();
		} else {
			this.startTimer(); // Restart timer when a move is made
		}
	}

	// Add players to UI
	addPlayersUI() {
		const scoreboard = document.querySelector(".scoreboard");
		scoreboard.innerHTML = ""; // Clear existing content

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

			// Maintain player avatar in the scoreboard
			const avatarSrc = player.avatarID;

			// Create scoreboard element
			const scoreDiv = document.createElement("div");
			scoreDiv.classList.add("score", `player${index + 1}-score`);
			scoreDiv.innerHTML = `
				<img src="${avatarSrc}" class="avatar-sm">
				<span>${player.name}</span>
				<span id="player${index + 1}-score">0</span>
			`;
			scoreDiv.style.backgroundColor = player.color;
			scoreboard.appendChild(scoreDiv);
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

	updateScoreboard() {
		this.players.forEach((player, index) => {
			const scoreElement = document.getElementById(`player${index + 1}-score`);
			if (scoreElement) {
				scoreElement.textContent = player.filledBoxes;
			}
		});
	}

	makeScoreboardDraggable() {
		const scoreboardContainer = document.querySelector(".scoreboard-container");
		let isDragging = false;
		let currentX;
		let currentY;
		let initialX;
		let initialY;
		let xOffset = 0;
		let yOffset = 0;

		scoreboardContainer.addEventListener("mousedown", dragStart);
		document.addEventListener("mousemove", drag);
		document.addEventListener("mouseup", dragEnd);

		function dragStart(e) {
			initialX = e.clientX - xOffset;
			initialY = e.clientY - yOffset;

			if (e.target === scoreboardContainer) {
				isDragging = true;
			}
		}

		function drag(e) {
			if (isDragging) {
				e.preventDefault();
				currentX = e.clientX - initialX;
				currentY = e.clientY - initialY;

				xOffset = currentX;
				yOffset = currentY;

				setTranslate(currentX, currentY, scoreboardContainer);
			}
		}

		function dragEnd(e) {
			initialX = currentX;
			initialY = currentY;

			isDragging = false;
		}

		function setTranslate(xPos, yPos, el) {
			el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
		}
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
const playersInput = Number(localStorage.getItem("playersCount"));
const bgMusic = new Audio("../assets/sounds/bgMusic.mp3");
var game = null;

document.addEventListener("DOMContentLoaded", () => {
	bgMusic.volume = 0.1;
	bgMusic.play();

	const playersCount = calculate(playersInput, 2, 6);
	renderPlayerInputs(playersCount);
	editAvatar();

	const storedTheme = localStorage.getItem("selectedTheme");
	const video = document.getElementById("myVideo");
	video.src = `/assets/videos/${storedTheme}.mp4`;

	const musicToggleBtn = document.getElementById("sound-toggle");
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
	playerInputsDiv.innerHTML = "";
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
		div.innerHTML = `<label for="playerName${i}" class="player-label ${
			colors[i - 1]
		}">Player ${i}</label>
		<div class="avatar">
		<img src="/assets/avatars/${i}.png" alt="avatar" class="player-avatar" id="avatar${i}">
		<button id="${i}" class="edit-avatar"><i class="fa-solid fa-pencil"></i></button>
		</div>
		<input type="text" id="playerName${i}" placeholder="Player ${i}" value="Player ${i}" class="playerNames">
		<div class="player-colors">
		${colors
			.map(
				(color, index) =>
					`<label class="rad-label">
						<input type="radio" class="playerColor" name="color${i}" value="${color}" ${
						index === i - 1 ? "checked" : ""
					} onclick="validateColor(this)">
					<div class="rad-design ${color}"></div></label>`
			)
			.join("")}
			</div>
		`;
		playerInputsDiv.appendChild(div);
	}
}

function validateColor(selectedRadio) {
	const selectedColors = document.querySelectorAll(
		'input[type="radio"]:checked'
	);

	// Check if the selected color is already chosen by another player
	let isValid = true;
	selectedColors.forEach((colorRadio) => {
		if (
			colorRadio !== selectedRadio &&
			colorRadio.value === selectedRadio.value
		) {
			isValid = false;
			alert("This color is already selected by another player");
		}
	});

	if (!isValid) {
		// Set the default color
		selectedRadio.checked = false;

		const defaultRadio = document.querySelector(
			`input[name="${selectedRadio.name}"][checked]`
		);
		if (defaultRadio) {
			defaultRadio.checked = true;
		}
	}
}

function savePlayers() {
	const playersCount = calculate(playersInput, 2, 6);
	const playerData = [];
	for (let i = 1; i <= playersCount; i++) {
		const name = document.getElementById(`playerName${i}`).value;
		const color = document.querySelectorAll(
			`input[name="color${i}"]:checked`
		)[0].value;
		const filledBoxes = 0;
		const avatarID = document.querySelector(`#avatar${i}`).src;
		playerData.push({ name, color, filledBoxes, avatarID });
	}
	localStorage.setItem("playerData", JSON.stringify(playerData));
}

// Start the game
playBtn.addEventListener("click", () => {
	savePlayers();
	document.getElementById("playerSetup").style.display = "none";
	const playersInfo = JSON.parse(localStorage.getItem("playerData"));
	const size = difficultyCalc();
	game = new Game(playersInfo);
	game.makeBoard(size[0], size[1]);
});

const difficultyCalc = () => {
	const difficulty = localStorage.getItem("selectedDifficulty");
	const dimensions = {
		easy: [5, 5],
		normal: [10, 10],
		hard: [20, 20],
		expert: [30, 30],
	};
	const result = dimensions[difficulty.toLowerCase()];
	return result;
};

function editAvatar() {
	const editButton = document.querySelectorAll(".edit-avatar");
	const avatarWindow = document.querySelector("#avatarWindow");
	editButton.forEach((avatar) => {
		avatar.addEventListener("click", () => {
			avatarWindow.style.display = "flex";
			saveAvatar(avatar.id, avatarWindow);
		});
	});
}

function saveAvatar(id, tab) {
	const selectAvatar = document.querySelectorAll(".selectAvatar");
	selectAvatar.forEach((choice) => {
		choice.addEventListener("click", () => {
			const selectedAvatar = choice.children[0].src;
			document.querySelector("#saveAvatar").addEventListener("click", () => {
				const playerAvatar = document.querySelector(`#avatar${id}`);
				playerAvatar.src = selectedAvatar;
				tab.style.display = "none";
			});
		});
	});
	document.querySelector("#closeWindow").addEventListener("click", () => {
		tab.style.display = "none";
	});
}
