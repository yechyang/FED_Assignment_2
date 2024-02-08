// Inspired by https://www.codingnepalweb.com/create-snake-game-htm-css-javascript/ (Inspired but didn't copy)
const APIKEY = "65afdc5f482ae93fcb54da42"; // DATABASE API KEY

// Get the canvas element and its context for drawing
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Size of each box in the game grid
const box = 20;
const foodSize = 20;

// Initialize the snake's starting position and direction
let snake = [{ x: 9 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

// Check if user is logged if not redirect to login page
if (!isUserLoggedIn()) {
    alert("Please log in to play the game. Click OK to log in.");
    window.location.href = "sign-in.html";
} else {
    // User is logged in, proceed with the game initialization
    document.addEventListener("keydown", direction);
}

// Variable to store the snake's current direction
let d;

// Function to handle keyboard input and update the snake's direction accordingly arrow keys and WASD keys
function direction(event) {
    if ((event.key === "a" || event.key === "A" || event.keyCode == 37) && d !== "RIGHT") {
        d = "LEFT";
    } else if ((event.key === "w" || event.key === "W" || event.keyCode == 38) && d !== "DOWN") {
        d = "UP";
    } else if ((event.key === "d" || event.key === "D" || event.keyCode == 39) && d !== "LEFT") {
        d = "RIGHT";
    } else if ((event.key === "s" || event.key === "S" || event.keyCode == 40) && d !== "UP") {
        d = "DOWN";
    }
}

let pointsAwarded = false;

// Function to draw the game elements on the canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // For the snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // For the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, foodSize, foodSize);

  // Update the snake's position based on its direction
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

   // Check if the snake has eaten the food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    // Generate new food at a random position
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
  } else {
    snake.pop(); // Remove the tail segment of the snake
  }

  let newHead = { x: snakeX, y: snakeY };

  // Check for collisions with walls or itself
  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height || 
    collision(newHead, snake)
  ) {
    gameOver();
  }

  // Add the new head to the beginning of the snake array
  snake.unshift(newHead);

  document.getElementById("score").innerText = score;
}

// Function to check for collisions between the snake's head and its body
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Function to start the game
function startGame() {
    game = setInterval(draw, 100);
}

// Function for gameover 
function gameOver() {
  clearInterval(game);
  // Awarding points according to the score obtain after the game end, updating the point
  if (score >= 25){
    updatePoints(20)
  }
  else if (score >= 15){
    updatePoints(10)
  }
  else if (score >= 10){
    updatePoints(5)
  }
  alert("Game Over! Your score: " + score);
  window.location.reload();
}

// Function to check if the user is logged in
function isUserLoggedIn() {
    // Check if the currentUserAccount exists in sessionStorage
    var currentUserAccount = sessionStorage.getItem("userAccount");
    return currentUserAccount !== null;
}

// Function to update user points in the database
function updatePoints(pointsEarned) {
    let userAccount = JSON.parse(sessionStorage.getItem('userAccount'));  // Getting userAccount from SessionStorage
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