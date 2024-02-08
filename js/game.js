document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afd4ed482ae9179a54da3e";
    const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

    if (storedUserAccount && storedUserAccount.username) {
        fetch(`https://fedassignment-d10c.restdb.io/rest/account?q={"username":"${storedUserAccount.username}"}`, {
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

    chatBox.appendChild(botMessage);

    // Scroll chat box to bottom
    chatBox.scrollTop = chatBox.scrollHeight;

    // Clear user input field
    document.getElementById("user-input").value = "";
}


document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});