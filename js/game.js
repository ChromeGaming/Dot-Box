var players_dict = [
    { name: "Player 1", color: "pink", filledBoxes: 0 },
    { name: "Player 2", color: "skyblue", filledBoxes: 0 },
    { name: "Player 3", color: "lightgreen", filledBoxes: 0 },
    { name: "Player 4", color: "magenta", filledBoxes: 0 },
    { name: "Player 5", color: "yellow", filledBoxes: 0 },
    { name: "Player 6", color: "orange", filledBoxes: 0 },
];

class Game {
    static instance; // Singleton instance of Game class

    constructor(rows, columns, playersCount) {
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
        console.log("The original player dict: ")
        printDict()

         // Retrieve the players_dict and game settings from localStorage
    // const players_dicts = JSON.parse(localStorage.getItem('players_dict'));
    // const { rows, columns, playersCount } = JSON.parse(localStorage.getItem('game_settings'));
        // name1 = localStorage.getItem("name1");


        this.players = players_dict
        console.log("The game's player dict: ", this.players)
        

        let p = this.players.length - playersCount;
        for (let i = 0; i < p; i++) this.players.pop();

        this.currentPlayerIndex = 0;
        this.currentPlayer = this.players[this.currentPlayerIndex];
    }
    
    makeBoard(rows, columns)
    {
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
        const timerContainer = document.createElement('div');
        timerContainer.id = 'timer-container';
        timerContainer.innerHTML = `
            <div id="timer">30</div>
            <div id="timer-label">seconds left</div>
        `;
        document.body.appendChild(timerContainer);
        this.timerDisplay = document.getElementById('timer');
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
        const scoreboard = document.querySelector('.scoreboard');
        scoreboard.innerHTML = ''; // Clear existing content

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
        this.players.forEach((player, index) => {
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
            this.currentPlayerIndex = ++this.currentPlayerIndex % this.players.length;
            this.currentPlayer = this.players[this.currentPlayerIndex];
            this.invokeEvent("playerSwitch");
        }
    }
}

// Declaring Global Variables
const rowsInput = Number(localStorage.getItem("rows"));
const columnsInput = Number(localStorage.getItem("columns"));
const playersInput = Number(localStorage.getItem("players"));
const bgMusic = new Audio("../assets/sounds/bgMusic.mp3");
var game = null;

document.addEventListener("DOMContentLoaded", () => {
    bgMusic.volume = 0.1;
    bgMusic.play();

    console.log("Inside Dom Loader", players_dict)
    if (localStorage.getItem("NameChanged"))
    {
        players_dict[0].name = localStorage.getItem("name1");
        players_dict[1].name = localStorage.getItem("name2");
        players_dict[2].name = localStorage.getItem("name3");
        players_dict[3].name = localStorage.getItem("name4");
        players_dict[4].name = localStorage.getItem("name5");
        players_dict[5].name = localStorage.getItem("name6");
    }
    const rows = calculate(rowsInput, 5, 30);
    const columns = calculate(columnsInput, 5, 30);
    const playersCount = calculate(playersInput, 2, 6);

    

    game = new Game(rows, columns, playersCount);
    game.makeBoard(rows, columns)
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

function showPlayerTextBox(){
    playersCount = Number(document.getElementById("players-count").value)
    
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


readyBtn.addEventListener("click", () => {
	const playersCount = calculate(playersInput.value, 2, 6)
	bgMusic.volume = 0.1;
	bgMusic.play();
	showPlayerTextBox(playersCount)

});


function startGame() {
	const rows = calculate(rowsInput.value, 5, 30)
	const columns = calculate(columnsInput.value, 5, 30)
	const playersCount = calculate(playersInput.value, 2, 6)


    // for (let i = 0; i < playersCount; i++) {
    //     const playerNum = i + 1;
    //     const playerId = "#player" + playerNum;
    //     const playerInput = document.querySelector(playerId);

    //     if (playerInput) {
    //         players_dict[i].name = playerInput.value;
    //     }
    // }


    try {
        players_dict[0].name=document.querySelector("#player1").value
        players_dict[1].name=document.querySelector("#player2").value
        players_dict[2].name=document.querySelector("#player3").value
        players_dict[3].name=document.querySelector("#player4").value
        players_dict[4].name=document.querySelector("#player5").value
        players_dict[5].name=document.querySelector("#player6").value
        
    } catch (TypeError) {
        ;
    }

    try
    {
        localStorage.setItem("NameChanged", "yes");
        localStorage.setItem("name1", players_dict[0].name);
        localStorage.setItem("name2", players_dict[1].name);
        localStorage.setItem("name3", players_dict[2].name);
        localStorage.setItem("name4", players_dict[3].name);
        localStorage.setItem("name5", players_dict[4].name);
        localStorage.setItem("name6", players_dict[5].name);
    }
    catch (TypeError) {
        ;
    }
    
    printDict()

    // Store the updated players_dict and game settings in localStorage
    // localStorage.setItem('players_dicts', JSON.stringify(players_dict));
    // localStorage.setItem('game_settings', JSON.stringify({ rows, columns, playersCount }));

	game = new Game(rows, columns, playersCount)
    window.location.href = "./pages/game.html";
    game.makeBoard(rows, columns)
	settingsUI.style.display = "none"
	heading.style.display = "none"
};

function hideInstructions(){
    console.log("Inside Hide Instructs")
	document.getElementById("instructions").style.display = "none";
}

function hidePlayerTextBox(){
	document.getElementsByClassName("settings").style.visibility = "visible";
}

function printDict() {
    console.log("Here's the", players_dict)
}