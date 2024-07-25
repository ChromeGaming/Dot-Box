class Game {
    static instance; // Singleton instance of Game class

    constructor(rows, columns, playersCount, playerNames) {
        if (Game.instance == null) Game.instance = this;

        // playersUI = document.querySelector("#players-count");
        this.playerNameUI = document.querySelector(".player-turn .name");
        this.playerTurnBgUI = document.querySelector(".player-turn .bg");

        this.events = {
            edgeFill: [],
            boxFill: [],
            playerSwitch: [],
            playerWin: [],
        };

        

		players = [
			{ name: String(playerNames[0]), color: "pink", filledBoxes: 0 },
			{ name:  playerNames[1], color: "skyblue", filledBoxes: 0 },
			{ name:  playerNames[2], color: "lightgreen", filledBoxes: 0 },
			{ name:  playerNames[3], color: "magenta", filledBoxes: 0 },
			{ name:  playerNames[5], color: "yellow", filledBoxes: 0 },
			{ name:  playerNames[6], color: "orange", filledBoxes: 0 }
        ]

        // players = players

        let p = players.length - playersCount;
        for (let i = 0; i < p; i++) players.pop();

        this.currentPlayerIndex = 0;
        this.currentPlayer = players[this.currentPlayerIndex];

        this.board = new Board(rows, columns);

        this.isGameover = false;

        this.addPlayersUI();
        this.updateScoreboard();
        this.updatePlayerNameUI();
        this.makeScoreboardDraggable();

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
        const winner = this.determineWinner(players);

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
        this.updateScoreboard();
    }

    // Add players to UI
    addPlayersUI() {

        const scoreboard = document.querySelector('.scoreboard');
        scoreboard.innerHTML = ''; // Clear existing content

        players.forEach((player, index) => {
            const div = document.createElement("div");
            div.classList.add("player");

            // Maintain filled boxes.
            const b = document.createElement("b");
            b.classList.add("filled-boxes");
            b.textContent = player.filledBoxes;
            b.style.background = player.color;
            players[index]["filledBoxesUI"] = b;

            // Maintain player name.
            const span = document.createElement("span");
            span.textContent = player.name;

            div.appendChild(b);
            div.appendChild(span);

            // Adding score and name to the element
            playersUI.appendChild(div);

            // Create scoreboard element
            const scoreDiv = document.createElement('div');
            scoreDiv.classList.add('score', `player${index + 1}-score`);
            scoreDiv.innerHTML = `
                <span>${player.name}</span>
                <span id="player${index + 1}-score">0</span>
            `;
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
        players.forEach((player, index) => {
            const scoreElement = document.getElementById(`player${index + 1}-score`);
            if (scoreElement) {
                scoreElement.textContent = player.filledBoxes;
            }
        });
    }

    makeScoreboardDraggable() {
        const scoreboardContainer = document.querySelector('.scoreboard-container');
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
            this.currentPlayerIndex = ++this.currentPlayerIndex % players.length;
            this.currentPlayer = players[this.currentPlayerIndex];
            this.invokeEvent("playerSwitch");
        }
    }
}

// Declaring Global Variables
players = ["","","","","",""]
const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const playersInput = document.getElementById("players-count");
const bgMusic = new Audio("../assets/sounds/bgMusic.mp3");
const readyBtn = document.querySelector(".ready-btn")
const startBtn = document.querySelector(".true-start-btn")
var game = null;

readyBtn.addEventListener("click", () => {
    players = document.getElementById("players-count")
	const playersCount = calculate(Number(players.value), 2, 6)
	showPlayerTextBox(playersCount);

});


startBtn.addEventListener("click", () => {
	const playersCount = calculate(playersInput.value, 2, 6)
	const rows = calculate(rowsInput.value, 5, 30)
	const columns = calculate(columnsInput.value, 5, 30)
	players[0]=document.querySelector("#player1").value
	players[1]=document.querySelector("#player2").value
	players[2]=document.querySelector("#player3").value
	players[3]=document.querySelector("#player4").value
	players[4]=document.querySelector("#player5").value
	players[5]=document.querySelector("#player6").value
    console.log("Hereeee5")
    window.location.href = "./pages/game.html";
	game = new Game(rows, columns, playersCount, players)
    console.log("Here?")
	// settingsUI.style.display = "none"
	// heading.style.display = "none"
});

document.addEventListener("DOMContentLoaded", () => {
    bgMusic.volume = 0.1;
    bgMusic.play();

    const rows = calculate(rowsInput, 5, 30);
    const columns = calculate(columnsInput, 5, 30);
    const playersCount = calculate(playersInput, 2, 6);

    game = new Game(rows, columns, playersCount);
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

function showPlayerTextBox(playersCount){
    
    console.log(playersCount)

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
    
    hideInstructions()
}

function hideInstructions(){
    console.log("Inside Hide Instructs")
	document.getElementById("instructions").style.display = "none";
}

function hidePlayerTextBox(){
	document.getElementsByClassName("settings").style.visibility = "visible";
}