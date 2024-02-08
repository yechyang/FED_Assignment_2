// Executing once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afdc5f482ae93fcb54da42"; // Database API KEY
    const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount")); // Getting userAccount from SessionStorage

    // Making sure the SessionStorage has userAccount
    if (storedUserAccount && storedUserAccount.username) {
        // Getting the userAccount data
        fetch(`https://fedassg-a6f6.restdb.io/rest/account?q={"username":"${storedUserAccount.username}"}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        })
        .then(response => response.json())
        .then(userAccounts => {
            if (userAccounts.length > 0) {
                const userAccount = userAccounts[0];
                const userPoints = userAccount.point;
                // Display the points on the webpage
                document.getElementById("userPointsDisplay").textContent = `Available Points: ${userPoints}`;
            } else {
                console.log(`User ${storedUserAccount.username} not found.`);
            }
        })
        .catch(error => {
            console.error("Error fetching user account:", error);
        });
    } else {
        console.log("No user account found in sessionStorage or username missing.");
    }
});

// Function to send user message and generate bot response
function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");

    // Display user message
    var userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Check user input and respond accordingly
    var botMessage = document.createElement("div");
    botMessage.classList.add("bot-message");

    // Lower case the input for consistency and letting user select where they want go
    switch(userInput.toLowerCase()) {
        case "list":
            botMessage.textContent = "Games available: hangman, minigames, snake";
            break;
        case "hangman":
            botMessage.textContent = "Let's play SnowHangman!";
            setTimeout(function() {
                window.location.href = "hangman.html";
            }, 2000);
            break;
        case "memory":
            botMessage.textContent = "Let's play Memory Game";
            setTimeout(function() {
                window.location.href = "memory-game.html";
            }, 2000);
            break;
        case "minigames":
            botMessage.textContent = "Let's play Minigames!";
            setTimeout(function() {
                window.location.href = "minigames.html";
            }, 2000);
            break;
        case "snake":
            botMessage.textContent = "Let's play snake game!";
            setTimeout(function() {
                window.location.href = "snake.html";
            }, 2000);
            break;
        default:
            botMessage.textContent = "I didn't understand that. Please choose from hangsnowman, spinthewheel, or clicker.";
            break;
    }
    // Show the bot reply of the message
    chatBox.appendChild(botMessage);

    // Scroll chat box to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear user input field
    document.getElementById("user-input").value = "";
}

// Event Listener for handling the user input when user press the enter button on the keyboard
document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage(); 
    }
});