const APIKEY = "65c345cac384b99ce782ea34";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
const foodSize = 20;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

//if (!isUserLoggedIn()) {
    //alert("Please log in to play the game. Click OK to log in.");
    //window.location.href = "/FED_Assignment_2/sign-in.html";
//} else {
    // User is logged in, proceed with the game initialization
    document.addEventListener("keydown", direction);
//}

let d;

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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = (i === 0) ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, foodSize, foodSize);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d === "LEFT") snakeX -= box;
  if (d === "UP") snakeY -= box;
  if (d === "RIGHT") snakeX += box;
  if (d === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 ||
    snakeX >= canvas.width ||
    snakeY < 0 ||
    snakeY >= canvas.height || 
    collision(newHead, snake)
  ) {
    gameOver();
  }

  snake.unshift(newHead);

  document.getElementById("score").innerText = score;
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function startGame() {
    game = setInterval(draw, 100);
}


function gameOver() {
  clearInterval(game);
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


function isUserLoggedIn() {
    // Check if the currentUserAccount exists in sessionStorage
    var currentUserAccount = sessionStorage.getItem("userAccount");
    return currentUserAccount !== null;
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
  
    fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Points updated successfully:", data);
      })
      .catch(error => {
        console.error("Error updating points:", error);
      });
  }