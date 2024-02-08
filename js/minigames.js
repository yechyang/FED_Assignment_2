const APIKEY = "65afdc5f482ae93fcb54da42"; // DATABASE API KEY
// This Minigames.js consist of 4 games.
// Guess the number Game
// Generating random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 8;

// Function to check user guesses 
function checkGuess() {
  const guessInput = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  // Validate the user input for number that is out of 1 to 100
  if (isNaN(guessInput) || guessInput < 1 || guessInput > 100) {
    message.textContent = "Please enter a valid number between 1 and 100."; 
    return;
  }
  let pointsEarned = 0; // Setting pointsEarned to 0 

  // Decrement the attempts as user guess
  attempts--;

  // Check if the guess is correct
  if (guessInput === randomNumber) {
    message.textContent = `Congratulations! You guessed the number ${randomNumber} correctly!`;
    pointsEarned = 10; // Earn 10 points when the guess is correct

    updatePoints(pointsEarned) // Updating the points
    
    disableInput(); // Disable input after correct guess
  } else if (guessInput < randomNumber) {
    message.textContent = `Too low! You have ${attempts} attempts left.`;
  } else {
    message.textContent = `Too high! You have ${attempts} attempts left.`;
  }

  // Check if the user has run out of attempts
  if (attempts === 0) {
    message.textContent = `Sorry, you've run out of attempts. The number was ${randomNumber}.`;
    disableInput(); // Disable again
  }
}

// Function to disable input fields and buttons
function disableInput() {
  document.getElementById("guessInput").setAttribute("disabled", "true");
  document.querySelector("button").setAttribute("disabled", "true");
}



// Function for Changing games
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


// Rock Paper Scissors Game
function playerChoice(choice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = document.getElementById("result");
  let pointsEarned = 0;

  // Determine the winner based on player's choice and computer's choice
  if (choice === computerChoice) {
    result.textContent = "It's a tie!";
  } else if (
    (choice === "rock" && computerChoice === "scissors") ||
    (choice === "paper" && computerChoice === "rock") ||
    (choice === "scissors" && computerChoice === "paper")
  ) {
    result.textContent = `You win! Computer chose ${computerChoice}.`;
    pointsEarned = 5; // Earn 5 points for winning
  } else {
    result.textContent = `You lose! Computer chose ${computerChoice}.  Try Again`;
    pointsEarned = -5; // Lose 5 points for losing
  }

  updatePoints(pointsEarned); // Update points earned
}


// Whack A Mole Game
// Function to start the Whack A Mole game
const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restartButton');
let score = 0;
let lastHole;
let timeUp = false;
let gameTimeout;
let gameInProgress = false; 
let pointsEarned

// Function to make the mole pop up at different timing
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min); 
}

// Function to make the mole pop up at different hole
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Function to make the mole peep and not peep
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

// Function to calculate the points 
function calculatePoints() {
  if (score > 8) {
    pointsEarned = 10; // if more than 8 increase by 10
  } else {
    pointsEarned = -10; // if less than 8 decrease by 10
  }
  updatePoints(pointsEarned); // Updating point
}

holes.forEach(hole => hole.addEventListener('click', bonk));
restartButton.addEventListener('click', startGame); // Add event listener to the restart button



// Tic Tac Toe Game
let currentPlayer = 'X'; // Player = 'X'
let moves = ['', '', '', '', '', '', '', '', '']; // Store moves made on the game board
let gameActive = true; // Showing game is active

// Define winning combinations for Tic Tac Toe
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

// Function to check for a winner or draw
function checkWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      gameActive = false; // Game ends when a winner is found
      return moves[a]; // Return the winning symbol (X or O)
    }
  }
  if (moves.includes('')) {
    return null; // Continue the game if there are empty cells
  } else {
    gameActive = false; // Game ends in a draw
    return 'Draw';
  }
}

// Function for the computer's move in Tic Tac Toe
function botMove() {
  let emptyCells = [];
  for (let i = 0; i < 9; i++) {
    if (moves[i] === '') {
      emptyCells.push(i); //Finding the empty cells and make decison
    }
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex]; // Randomly select empty cells
  moves[cellIndex] = currentPlayer; // Updating the moves 
  gameBoard.children[cellIndex].innerText = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch among users and bots
}

// Function to handle a player's move in Tic Tac Toe
function playerMove(cellIndex) {
  if (!gameActive || moves[cellIndex] !== '') return;
  
  moves[cellIndex] = currentPlayer; // Updating the moves 
  gameBoard.children[cellIndex].innerText = currentPlayer; // Update with user moves
  let pointsEarned = 0; // Initialize point to 0

  // Check for a winner after the player's move
  const winner = checkWinner();
  if (winner) {
    if (winner === 'Draw') {
      statusDisplay.innerText = "It's a draw!";
    } else {
      statusDisplay.innerText = `${winner} wins!`;
      pointsEarned = 5 // Win earn 5 points
    }
    gameActive = false; // Ending the game
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
          pointsEarned = -5 // Lose will lose 5 points
        }
        gameActive = false; // Ending the game
      }
    }
  }
  updatePoints(pointsEarned) // Update points earned
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';  // Reset current player
  moves = ['', '', '', '', '', '', '', '', '']; // Clear all the X and O
  gameActive = true;
  statusDisplay.innerText = '';
  Array.from(gameBoard.children).forEach(cell => {
    cell.innerText = ''; // Clear all cells on the game board
  });
}


// Function to update user points in the database
function updatePoints(pointsEarned) {
  let userAccount = JSON.parse(sessionStorage.getItem('userAccount')); // Getting userAccount from SessionStorage
  if (!userAccount) {
    console.error('User account not found in sessionStorage.'); // No user account return
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

  // Send a PUT Request to update the points of the user account
  fetch(`https://fedassg-a6f6.restdb.io/rest/account/${userAccount._id}`, settings)
    .then(response => response.json())
    .then(data => {
      console.log("Points updated successfully:", data);
    })
    .catch(error => {
      console.error("Error updating points:", error);
    });
}

// Function to check if the user is logged in
function isUserLoggedIn() {
  // Check if the currentUserAccount exists in sessionStorage
  var currentUserAccount = sessionStorage.getItem("userAccount");
  return currentUserAccount !== null;
}

// Event Listener for the Loaded DOM to check if user is logged
document.addEventListener('DOMContentLoaded', function() {
  if (!isUserLoggedIn()) {
    alert("Please log in to play the game. Click OK to log in.");
    window.location.href = "sign-in.html"; // Redirect to the login page
    return;
  }
});