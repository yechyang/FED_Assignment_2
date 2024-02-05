const APIKEY = "65afdc5f482ae93fcb54da42";
// Guess the number
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 8;

function checkGuess() {
  const guessInput = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (isNaN(guessInput) || guessInput < 1 || guessInput > 100) {
    message.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }
  let pointsEarned = 0;
  attempts--;
  if (guessInput === randomNumber) {
    message.textContent = `Congratulations! You guessed the number ${randomNumber} correctly!`;
    pointsEarned = 10;

    updatePoints(pointsEarned)
    
    disableInput();
  } else if (guessInput < randomNumber) {
    message.textContent = `Too low! You have ${attempts} attempts left.`;
  } else {
    message.textContent = `Too high! You have ${attempts} attempts left.`;
  }

  if (attempts === 0) {
    message.textContent = `Sorry, you've run out of attempts. The number was ${randomNumber}.`;
    disableInput();
  }
}

function disableInput() {
  document.getElementById("guessInput").setAttribute("disabled", "true");
  document.querySelector("button").setAttribute("disabled", "true");
}



// Changing games
function changeGame() {
  const dropdown = document.getElementById('dropdown1');
  const selectedGame = dropdown.value;

  // Hide all game containers
  document.getElementById('numberGame').style.display = 'none';
  document.getElementById('rpsGame').style.display = 'none';
  document.getElementById('whackamole').style.display = 'none';
  document.getElementById('ttt').style.display = 'none';

  // Show the selected game container
  document.getElementById(selectedGame).style.display = 'block';
}


// Rock Paper Scissors
function playerChoice(choice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = document.getElementById("result");
  let pointsEarned = 0;

  if (choice === computerChoice) {
    result.textContent = "It's a tie!";
  } else if (
    (choice === "rock" && computerChoice === "scissors") ||
    (choice === "paper" && computerChoice === "rock") ||
    (choice === "scissors" && computerChoice === "paper")
  ) {
    result.textContent = `You win! Computer chose ${computerChoice}.`;
    pointsEarned = 5;
  } else {
    result.textContent = `You lose! Computer chose ${computerChoice}.  Try Again`;
    pointsEarned = -5;
  }

  updatePoints(pointsEarned);
}


// Whack A Mole
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
let score = 0;
let lastHole;
let timeUp = false;
let gameTimeout;
let gameInProgress = false;
let pointsEarned

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  const mole = hole.querySelector('.mole');
  hole.classList.add('up');
  mole.style.display = 'block'; // Show the mole
  gameTimeout = setTimeout(() => {
    hole.classList.remove('up');
    mole.style.display = 'none'; // Hide the mole
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  if (gameInProgress) {

    return;
  }
  score = 0;
  scoreDisplay.textContent = score;
  timeUp = false;
  gameInProgress = true; // Set game in progress flag
  peep();
  setTimeout(() => {
    timeUp = true;
    gameInProgress = false;
    calculatePoints();
  }, 10000); // Game duration: 10 seconds
}

function bonk(e) {
  if (!e.isTrusted) return; // Prevent fake click events
  if (!this.classList.contains('up')) return; // Prevent cheating by clicking when mole isn't visible
  score++;
  this.classList.remove('up');
  scoreDisplay.textContent = score;
}

function calculatePoints() {
  if (score > 8) {
    pointsEarned = 10;
  } else {
    pointsEarned = -10;
  }
  updatePoints(pointsEarned);
}

holes.forEach(hole => hole.addEventListener('click', bonk));
restartButton.addEventListener('click', startGame); // Add event listener to the restart button



// Tic Tac Toe
let currentPlayer = 'X';
let moves = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const gameBoard = document.getElementById('gameBoard');
const statusDisplay = document.getElementById('status');

function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      gameActive = false;
      return moves[a];
    }
  }
  if (moves.includes('')) {
    return null;
  } else {
    gameActive = false;
    return 'Draw';
  }
}

function botMove() {
  let emptyCells = [];
  for (let i = 0; i < 9; i++) {
    if (moves[i] === '') {
      emptyCells.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];
  moves[cellIndex] = currentPlayer;
  gameBoard.children[cellIndex].innerText = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function playerMove(cellIndex) {
  if (!gameActive || moves[cellIndex] !== '') return;
  
  moves[cellIndex] = currentPlayer;
  gameBoard.children[cellIndex].innerText = currentPlayer;
  let pointsEarned = 0;
  const winner = checkWinner();
  if (winner) {
    if (winner === 'Draw') {
      statusDisplay.innerText = "It's a draw!";
    } else {
      statusDisplay.innerText = `${winner} wins!`;
      pointsEarned = 5
    }
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
      botMove();
      const botWinner = checkWinner();
      if (botWinner) {
        if (botWinner === 'Draw') {
          statusDisplay.innerText = "It's a draw!";
        } else {
          statusDisplay.innerText = `${botWinner} wins!`;
          pointsEarned = -5
        }
        gameActive = false;
      }
    }
  }
  updatePoints(pointsEarned)
}

function resetGame() {
  currentPlayer = 'X';
  moves = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.innerText = '';
  Array.from(gameBoard.children).forEach(cell => {
    cell.innerText = '';
  });
}



function updatePoints(pointsEarned) {
  let userAccount = JSON.parse(sessionStorage.getItem('userAccount'));
  if (!userAccount) {
    console.error('User account not found in sessionStorage.');
    return;
  }

  // Add pointsEarned to user's points
  userAccount.point += pointsEarned;

  sessionStorage.setItem('userAccount', JSON.stringify(userAccount));

  let settings = {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY, // Ensure API key is securely managed
        "Cache-Control": "no-cache"
    },
    body: JSON.stringify(userAccount) // Send the updated user account object in the body
  };

  fetch(`https://fedassg-a6f6.restdb.io/rest/account/${userAccount._id}`, settings)
    .then(response => response.json())
    .then(data => {
      console.log("Points updated successfully:", data);
    })
    .catch(error => {
      console.error("Error updating points:", error);
    });
}