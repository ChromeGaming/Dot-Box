

class Game {
    static instance // Singleton instance of Game class

    constructor(rows, columns, playersCount) {
        if (Game.instance == null) Game.instance = this

        this.playersUI = document.querySelector(".players")
        this.playerNameUI = document.querySelector(".player-turn .name")
        this.playerTurnBgUI = document.querySelector(".player-turn .bg")

        // Create timer element
        this.timerElement = document.createElement('span')
        this.timerElement.classList.add('timer')
        this.playerTurnBgUI.appendChild(this.timerElement)

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
        this.turnDuration = 10 // duration of each turn in seconds
        this.timer = null
        this.timeRemaining = this.turnDuration

        this.addPlayersUI()
        this.updatePlayerNameUI()

        // Adding event listeners for filling box, switching player, and winning
        this.addEventListener("boxFill", () => this.onBoxFill())
        this.addEventListener("playerSwitch", () => this.onPlayerSwitch())
        this.addEventListener("playerWin", () => this.onPlayerWin())

        this.startTimer() // Start the timer for the first player
    }

    // Timer functions
    startTimer() {
        this.timeRemaining = this.turnDuration
        this.updateTimerUI()

        this.timer = setInterval(() => {
            this.timeRemaining--
            this.updateTimerUI()

            if (this.timeRemaining <= 0) {
                this.stopTimer()
                this.switchPlayer()
            }
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    updateTimerUI() {
        this.timerElement.textContent = `Time left: ${this.timeRemaining}s`
    }

    // End Game
    onPlayerWin() {
        this.isGameover = true

        bgMusic.pause()
        let winSound = new Audio('./sounds/win.mp3')
        winSound.play()

        const player = this.players.reduce((prev, current) => {
            return prev.filledBoxes > current.filledBoxes ? prev : current
        })

        setTimeout(() => {
            let play = this.players[0].filledBoxes

            // Check for winner
            if (this.players.every((p) => p.filledBoxes == play)) {
                this.playerNameUI.parentElement.textContent = "Nobody wins"
                this.playerTurnBgUI.classList.add("no-win")
                this.playerTurnBgUI.style.background = "#eaeaea"
            } else {
                this.playerNameUI.parentElement.textContent = `${player.name} wins`
                this.playerTurnBgUI.classList.add("win")
                this.playerTurnBgUI.style.background = player.color
            }
        }, 500)
    }

    onPlayerSwitch() {
        this.updatePlayerNameUI()
        this.startTimer() // Start the timer for the new player
    }

    // If a box is filled, increment the player's score and update UI
    onBoxFill() {
        this.currentPlayer.filledBoxes++
        this.updatePlayerScoreUI()
    }

    // Add players to UI
    addPlayersUI() {
        this.players.forEach((player, index) => {
            const div = document.createElement("div")
            div.classList.add("player")

            // Maintain filled boxes.
            const b = document.createElement("b")
            b.classList.add("filled-boxes")
            b.textContent = player.filledBoxes
            b.style.background = player.color
            this.players[index]["filledBoxesUI"] = b

            // Maintain player name.
            const span = document.createElement("span")
            span.textContent = player.name

            div.appendChild(b)
            div.appendChild(span)

            // Adding score and name to the element
            this.playersUI.appendChild(div)
        })
    }

    // Update player score UI used while switching player
    updatePlayerScoreUI() {
        this.currentPlayer.filledBoxesUI.innerText = this.currentPlayer.filledBoxes
    }

    // Update player name UI used while switching player
    updatePlayerNameUI() {
        this.playerNameUI.innerText = this.currentPlayer.name
        this.playerTurnBgUI.style.background = this.currentPlayer.color
    }

    eventExist(event) {
        return this.events.hasOwnProperty(event)
    }

    // Add event listeners
    addEventListener(event, callback) {
        if (!this.eventExist(event)) {
            console.error(`${event} event is not defined`)
            return
        }

        this.events[event].push(callback)
    }

    // Remove event listeners
    removeEventListener(event, callback) {
        if (!this.eventExist(event)) {
            console.error(`${event} event is not defined`)
            return
        }
        this.events[event].splice(this.events[event].indexOf(callback), 1)
    }

    // Invoke event listeners
    invokeEvent(event, args) {
        if (!this.eventExist(event)) {
            console.error(`${event} event is not defined`)
            return
        }
        this.events[event].forEach((callback) => callback(args))
    }

    // Switch player
    switchPlayer() {
        if (!this.isGameover) {
            this.stopTimer()
            this.currentPlayerIndex = ++this.currentPlayerIndex % this.players.length
            this.currentPlayer = this.players[this.currentPlayerIndex]
            this.invokeEvent("playerSwitch")
        }
    }
}

// Declaring Global Variables

const settingsUI = document.querySelector(".settings")
const rowsInput = document.querySelector("#rows")
const columnsInput = document.querySelector("#columns")
const playersInput = document.querySelector("#players-count")
const startBtn = document.querySelector(".start-btn")
const heading = document.querySelector(".heading")
const bgMusic = new Audio('./sounds/bgMusic.mp3')
var game = null

startBtn.addEventListener("click", () => {
    bgMusic.volume = 0.1
    bgMusic.play()

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
class Game {
  static instance // Singleton instance of Game class


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

    // Adding event listeners for filling box, switching player and winning
    this.addEventListener("boxFill", () => this.onBoxFill())
    this.addEventListener("playerSwitch", () => this.onPlayerSwitch())
    this.addEventListener("playerWin", () => this.onPlayerWin())
  }

  // End Game
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

      // Check for winner
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

  // If a box is filled, increment player's score with number of boxes filled by him/her and update UI
  onBoxFill() {
    this.currentPlayer.filledBoxes++
    this.updatePlayerScoreUI();
  }

  // Add players to UI
  addPlayersUI() {
    this.players.forEach((player, index) => {
      const div = document.createElement("div")
      div.classList.add("player")

      // Maintain filled boxes.
      const b = document.createElement("b")
      b.classList.add("filled-boxes")
      b.textContent = player.filledBoxes
      b.style.background = player.color
      this.players[index]["filledBoxesUI"] = b

      // Maintain player name.
      const span = document.createElement("span")
      span.textContent = player.name

      div.appendChild(b)
      div.appendChild(span)

      // Adding score and name to the element
      this.playersUI.appendChild(div)
    });
  }

  // Update player score UI used while switching player
  updatePlayerScoreUI() {
    this.currentPlayer.filledBoxesUI.innerText = this.currentPlayer.filledBoxes
  }

  // Update player name UI used while switching player
  updatePlayerNameUI() {
    this.playerNameUI.innerText = this.currentPlayer.name
    this.playerTurnBgUI.style.background = this.currentPlayer.color
  }

  eventExist(event) {
    return this.events.hasOwnProperty(event)
  }

  // Add event listeners
  addEventListener(event, callback) {
    if (!this.eventExist(event)) {
      console.error(`${event} event is not defined`)
      return
    }
    this.events[event].push(callback)
  }

  // Remove event listeners
  removeEventListener(event, callback) {
    if (!this.eventExist(event)) {
      console.error(`${event} event is not defined`)
      return
    }
    this.events[event].splice(this.events[event].indexOf(callback), 1)
  }

  // Invoke event listeners
  invokeEvent(event, args) {
    if (!this.eventExist(event)) {
      console.error(`${event} event is not defined`)
      return
    }
    this.events[event].forEach((callback) => callback(args))
  }

  // Switch player
  switchPlayer() {
    if (!this.isGameover) {
      this.currentPlayerIndex = ++this.currentPlayerIndex % this.players.length
      this.currentPlayer = this.players[this.currentPlayerIndex]
      this.invokeEvent("playerSwitch")
    }
  }
}

// Declaring Global Variables

const settingsUI = document.querySelector(".settings")
const rowsInput = document.querySelector("#rows")
const columnsInput = document.querySelector("#columns")
const playersInput = document.querySelector("#players-count")
const startBtn = document.querySelector(".start-btn")
const resetBtn = document.querySelector(".reset-btn")
const heading = document.querySelector(".heading")
const bgMusic = new Audio('./sounds/bgMusic.mp3');
const muteButton = document.querySelector(".mute-btn");
const restartButton = document.querySelector(".restart-btn");

var game = null

startBtn.addEventListener("click", () => {
  bgMusic.volume = 0.1;
  bgMusic.play();
  const rows = calculate(rowsInput.value, 5, 30)
  const columns = calculate(columnsInput.value, 5, 30)
  const playersCount = calculate(playersInput.value, 2, 6)

  if (!validateInputs(rows, columns, playersCount)) {
    return;
  }

  game = new Game(rows, columns, playersCount)
  settingsUI.style.display = "none"
  heading.style.display = "none"
});

resetBtn.addEventListener("click", () => {
  rowsInput.value = 6;
  columnsInput.value = 6;
  playersInput.value = 2;
  document.querySelectorAll('.error-message').forEach(msg => msg.style.display = 'none');
  rowsInput.style.border = "1px solid #ccc";
  columnsInput.style.border = "1px solid #ccc";
  playersInput.style.border = "1px solid #ccc";
});

const video = document.getElementById('myVideo');
const video2 = document.getElementById('myVideo2');

const themeSelect = document.getElementById('theme-select');

themeSelect.addEventListener('change', () => {
  const selectedTheme = themeSelect.value;
  video.src = `./assets/${selectedTheme}.mp4`; // Update video source based on theme
  video2.src = `./assets/${selectedTheme}.mp4`; // Update video source based on theme

  var element = document.querySelector(".whole-background");
  var element2 = document.querySelector(".right-background");
  var element3 = document.querySelector(".score");

  if (selectedTheme == 2) {
    element.style.backgroundColor = "rgba(241, 41, 34, 0.957)";
    element2.classList.remove('hover-effect-1', 'hover-effect-2', 'hover-effect-3');
    element2.classList.add('hover-effect-2');
    element3.style.backgroundColor = "rgba(241, 41, 34, 0.957)";
  } else if (selectedTheme == 3) {
    element.style.backgroundColor = "rgba(79, 163, 221, 0.950)";
    element2.classList.remove('hover-effect-1', 'hover-effect-2', 'hover-effect-3');
    element2.classList.add('hover-effect-3');
    element3.style.backgroundColor = "rgba(79, 163, 221, 0.950)";
  } else {
    element.style.backgroundColor = "rgba(231, 181, 55, 0.979)";
    element2.classList.remove('hover-effect-1', 'hover-effect-2', 'hover-effect-3');
    element2.classList.add('hover-effect-1');
    element3.style.backgroundColor = "rgba(231, 181, 55, 0.979)";
  }
});

muteButton.addEventListener("click", () => {
  if (bgMusic.paused) { // Check if music is paused
    bgMusic.volume = 0.1;
    bgMusic.play();

    const rows = calculate(rowsInput.value, 5, 30)
    const columns = calculate(columnsInput.value, 5, 30)
    const playersCount = calculate(playersInput.value, 2, 6)


    game = new Game(rows, columns, playersCount)
    settingsUI.style.display = "none"
    heading.style.display = "none"

})


	game = new Game(rows, columns, playersCount)
	settingsUI.style.display = "none"
	heading.style.display = "none"
});


function calculate(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

  });

  const video = document.getElementById('myVideo');
  const video2 = document.getElementById('myVideo2');
  
  const themeSelect = document.getElementById('theme-select');

  themeSelect.addEventListener('change', () => {
    const selectedTheme = themeSelect.value;
    video.src = `./assets/${selectedTheme}.mp4`; // Update video source based on theme
    video2.src = `./assets/${selectedTheme}.mp4`; // Update video source based on theme
  });



  muteButton.addEventListener("click", () => {
    if (bgMusic.paused) { // Check if music is paused
      bgMusic.volume = 0.1;
      bgMusic.play();
      muteButton.textContent = "Mute"; // Update to "Mute" on play
      
    } else {
      bgMusic.pause();
      muteButton.textContent = "Unmute"; // Update to "Mute" on play
    }
  });

    muteButton.textContent = "Mute"; // Update to "Mute" on play
  } else {
    bgMusic.pause();
    muteButton.textContent = "Unmute"; // Update to "Mute" on play
  }
});

restartButton.addEventListener("click", () => {
  window.location.reload();
});

function calculate(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function validateInputs(rows, columns, playersCount) {
  let isValid = true;

  if (rows < 5 || rows > 30) {
    document.getElementById('rows-error').style.display = 'block';
    rowsInput.style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById('rows-error').style.display = 'none';
    rowsInput.style.border = "2px solid green";
  }

  if (columns < 5 || columns > 30) {
    document.getElementById('columns-error').style.display = 'block';
    columnsInput.style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById('columns-error').style.display = 'none';
    columnsInput.style.border = "2px solid green";
  }

  if (playersCount < 2 || playersCount > 6) {
    document.getElementById('players-error').style.display = 'block';
    playersInput.style.border = "2px solid red";
    isValid = false;
  } else {
    document.getElementById('players-error').style.display = 'none';
    playersInput.style.border = "2px solid green";
  }

  return isValid;
}

rowsInput.addEventListener("keyup", () => {
  if (rowsInput.value < 5 || rowsInput.value > 30) {
    document.getElementById('rows-error').style.display = 'block';
    rowsInput.style.border = "2px solid red";
  } else {
    document.getElementById('rows-error').style.display = 'none';
    rowsInput.style.border = "2px solid green";
  }
});

columnsInput.addEventListener("keyup", () => {
  if (columnsInput.value < 5 || columnsInput.value > 30) {
    document.getElementById('columns-error').style.display = 'block';
    columnsInput.style.border = "2px solid red";
  } else {
    document.getElementById('columns-error').style.display = 'none';
    columnsInput.style.border = "2px solid green";
  }
});

playersInput.addEventListener("keyup", () => {
  if (playersInput.value < 2 || playersInput.value > 6) {
    document.getElementById('players-error').style.display = 'block';
    playersInput.style.border = "2px solid red";
  } else {
    document.getElementById('players-error').style.display = 'none';
    playersInput.style.border = "2px solid green";
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
  }

});

