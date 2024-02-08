// Code refered from https://www.codingnepalweb.com/build-hangman-game-html-javascript/
const APIKEY = "65afd4ed482ae9179a54da3e"; // DATABASE API KEY

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("difficultyModal"); // Displaying the difficulty option when DOM is loaded
    modal.style.display = "block";
});

const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");

// Event listeners for the difficulty buttons when clicked 
easyBtn.addEventListener("click", function() {
    startGame("easy"); // For easy mode
});

hardBtn.addEventListener("click", function() {
    startGame("hard"); // For hard mode
});


let timerInterval;

// Function to start the game based on the selected difficulty
function startGame(difficulty) {
    if (!isUserLoggedIn()) {
        alert("Please log in to play the game. Click OK to log in.");
        window.location.href = "sign-in.html"; // Redirect to the login page if user not logged in
        return;
    }
    // Reset the game with the selected difficulty
    // For example, you can set maxGuesses based on difficulty
    if (difficulty === "easy") {
        maxGuesses = 6; // Set maxGuesses for easy difficulty
    } else if (difficulty === "hard") {
        maxGuesses = 5; // Set maxGuesses for hard difficulty
        startTimer(180);
    } 
    getRandomWord();
    document.getElementById("difficultyModal").style.display = "none"; // Hide the difficulty modal
}

// Function to start the timer for the hard difficulty
function startTimer(duration) {
    let timerDisplay = document.getElementById("timer");

    let timer = duration;
    timerDisplay.textContent = formatTime(timer);

    // Update timer every second
    timerInterval = setInterval(function () {
        timer--;
        timerDisplay.textContent = formatTime(timer);

        // End the game if time runs out
        if (timer <= 0) {
            clearInterval(timerInterval);
            ending(false);
        }
    }, 1000);
}

// Formatting the time to MM:SS format (Month and second)
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const timerElement = document.getElementById("timer");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
let maxGuesses = 6; // Default max guesses

const resetGame = () => {
    // Resetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.jpg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const ending = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");

    // Calculating the total Points after the game end
    let pointsEarned = 0;
    if (isVictory) {
        if (maxGuesses === 6) {
            pointsEarned = 10; // For easy difficulty
        } else {
            pointsEarned = 20; // For hard difficulty
        }
    }

    // Getting the userAccount point
    var userAccount = JSON.parse(sessionStorage.getItem('userAccount'));

    if (!userAccount) {
        console.error('User account not found in sessionStorage.');
        return;
    }

    userAccount.point += pointsEarned; // The userAccount point plus the points that user earned

    sessionStorage.setItem('userAccount', JSON.stringify(userAccount)); // Update the sessionstorage with the new points earned

    let settings = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(userAccount) // Send the updated user account object in the body
    }

    fetch(`https://fedassg-a6f6.restdb.io/rest/account/${userAccount._id}`, settings)
    .then(response => response.json())
    .then(data => {
        console.log("Points updated successfully:", data);
    })
    .catch(error => {
        console.error("Error updating points:", error);
    });
}


const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.jpg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return ending(false);
    if(correctLetters.length === currentWord.length) return ending(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Event listener to handle play again button click
playAgainBtn.addEventListener("click", function() {
    location.reload();
});

// Function to check if the user is logged in
function isUserLoggedIn() {
    // Check if the currentUserAccount exists in sessionStorage
    var currentUserAccount = sessionStorage.getItem("userAccount");
    return currentUserAccount !== null;
}