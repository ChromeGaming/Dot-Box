class Game {
  static instance; // Singleton instance of Game class

  constructor(rows, columns, playersCount) {
    if (Game.instance == null) Game.instance = this;

    this.playersUI = document.querySelector(".players");
    this.playerNameUI = document.querySelector(".player-turn .name");
    this.playerTurnBgUI = document.querySelector(".player-turn .bg");
    this.rankingTableBody = document.querySelector("#ranking-table tbody");

    this.events = {
      edgeFill: [],
      boxFill: [],
      playerSwitch: [],
      playerWin: [],
    };

    this.players = [
      { name: "Player 1", color: "pink", filledBoxes: 0 },
      { name: "Player 2", color: "skyblue", filledBoxes: 0 },
      { name: "Player 3", color: "lightgreen", filledBoxes: 0 },
      { name: "Player 4", color: "magenta", filledBoxes: 0 },
      { name: "Player 5", color: "yellow", filledBoxes: 0 },
      { name: "Player 6", color: "orange", filledBoxes: 0 },
    ];

    let p = this.players.length - playersCount;
    for (let i = 0; i < p; i++) this.players.pop();

    this.currentPlayerIndex = 0;
    this.currentPlayer = this.players[this.currentPlayerIndex];

    this.board = new Board(rows, columns);

    this.isGameover = false;

    this.addPlayersUI();
    this.updatePlayerNameUI();
    this.updateRankingTable();

    // Adding event listeners for filling box, switching player, and winning
    this.addEventListener("boxFill", () => this.onBoxFill());
    this.addEventListener("playerSwitch", () => this.onPlayerSwitch());
    this.addEventListener("playerWin", () => this.onPlayerWin());
  }

  // End Game
  // End Game
  onPlayerWin() {
    this.isGameover = true;

    bgMusic.pause();
    let winSound = new Audio("./sounds/win.mp3");
    winSound.play();

    const maxBoxes = Math.max(
      ...this.players.map((player) => player.filledBoxes)
    );
    const potentialWinners = this.players.filter(
      (player) => player.filledBoxes === maxBoxes
    );

    setTimeout(() => {
      if (potentialWinners.length > 1) {
        // Check for tie
        this.playerNameUI.parentElement.textContent = "Nobody wins";
        this.playerTurnBgUI.classList.add("no-win");
        this.playerTurnBgUI.style.background = "#eaeaea";
      } else {
        // Declare the winner
        const winner = potentialWinners[0];
        this.playerNameUI.parentElement.textContent = `${winner.name} wins`;
        this.playerTurnBgUI.classList.add("win");
        this.playerTurnBgUI.style.background = winner.color;
      }
    }, 500);
  }

  onPlayerSwitch() {
    this.updatePlayerNameUI();
  }

  // If a box is filled, increment player's score with the number of boxes filled by him/her and update UI
  onBoxFill() {
    this.currentPlayer.filledBoxes++;
    this.updatePlayerScoreUI();
    this.updateRankingTable();
  }

  // Add players to UI
  addPlayersUI() {
    this.players.forEach((player, index) => {
      const div = document.createElement("div");
      div.classList.add("player");

      // Maintain filled boxes
      const b = document.createElement("b");
      b.classList.add("filled-boxes");
      b.textContent = player.filledBoxes;
      b.style.background = player.color;
      this.players[index]["filledBoxesUI"] = b;

      // Maintain player name
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

  updateRankingTable() {
    // Sort players by filled boxes in descending order
    const sortedPlayers = [...this.players].sort(
      (a, b) => b.filledBoxes - a.filledBoxes
    );

    // Clear existing rows
    this.rankingTableBody.innerHTML = "";

    // Populate ranking table
    sortedPlayers.forEach((player, index) => {
      const row = document.createElement("tr");

      const rankCell = document.createElement("td");
      rankCell.textContent = index + 1;

      const playerCell = document.createElement("td");
      playerCell.textContent = player.name;

      const scoreCell = document.createElement("td");
      scoreCell.textContent = player.filledBoxes;

      row.appendChild(rankCell);
      row.appendChild(playerCell);
      row.appendChild(scoreCell);

      this.rankingTableBody.appendChild(row);
    });
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

const settingsUI = document.querySelector(".settings");
const rowsInput = document.querySelector("#rows");
const columnsInput = document.querySelector("#columns");
const playersInput = document.querySelector("#players-count");
const startBtn = document.querySelector(".start-btn");
const heading = document.querySelector(".heading");
const bgMusic = new Audio("./sounds/bgMusic.mp3");
var game = null;

startBtn.addEventListener("click", () => {
  bgMusic.volume = 0.1;
  bgMusic.play();
  const rows = calculate(rowsInput.value, 5, 30);
  const columns = calculate(columnsInput.value, 5, 30);
  const playersCount = calculate(playersInput.value, 2, 6);

  game = new Game(rows, columns, playersCount);
  settingsUI.style.display = "none";
  heading.style.display = "none";
});

function calculate(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
