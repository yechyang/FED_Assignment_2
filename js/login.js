// document.addEventListener("DOMContentLoaded", function () {
//     const APIKEY = "65afdc5f482ae93fcb54da42";
//     const loginForm = document.getElementById("login"); // Assuming you have a login form with id="login-form"
//     const userAccountContainer = document.getElementById("user-account-container");

//     const storedHTML = sessionStorage.getItem("userAccountContainerHTML");
//     const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

//     if (storedHTML) {
//         userAccountContainer.innerHTML = storedHTML;
//         getAccount();
//     } else {
//         getAccount();
//     }

//     function getAccount(limit = 20, all = true) {
//         let settings = {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-apikey": APIKEY,
//                 "Cache-Control": "no-cache"
//             },
//         }

//         fetch("https://fedassg-a6f6.restdb.io/rest/account", settings)
//             .then(response => response.json())
//             .then(accounts => {
//                 loginForm.addEventListener("submit", function (event) {
//                     event.preventDefault(); // Prevent default form submission behavior
//                     const username = loginForm.elements["username"].value;
//                     const password = loginForm.elements["password"].value;
//                     const account = accounts.find(acc => acc.username === username && acc.password === password);
//                     if (account) {
//                         sessionStorage.setItem("userAccount", JSON.stringify(account));
//                         const welcomeMessage = "<span class='black-text'>Welcome " + username + "</span>";
//                         userAccountContainer.innerHTML = welcomeMessage;
//                         sessionStorage.setItem("userAccountContainerHTML", userAccountContainer.outerHTML);
//                         //alert("Logged in successfully!"); 
//                         document.getElementById("login").reset();
//                         alert("Logged in")
//                     } else {
//                         alert("Invalid username or password");
//                     }
//                 });
//             })
//             .catch(error => {
//                 console.error("Error fetching accounts:", error);
//             });
//     }
// });


// Execute when DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afdc5f482ae93fcb54da42"; // DATABASE API KEY
    const loginForm = document.getElementById("login"); // the form with the login id
    const userAccountContainer = document.getElementById("user-account-container");
    const chatContainer = document.getElementById("chat-container");

    // Retrieving information on userAccountContainerHTML and userAccount from SessionStorage
    const storedHTML = sessionStorage.getItem("userAccountContainerHTML");
    const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

    // Check if user account HTML is stored
    if (storedHTML) {
        userAccountContainer.innerHTML = storedHTML; // If stored, set the user account container HTML and fetch account data
        getAccount();
    } else {
        getAccount(); // If not stored, directly fetch account data
    }

    /// GETTING the user account
    function getAccount(limit = 20, all = true) {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        }

        // Fetch the user account from the database
        fetch("https://fedassg-a6f6.restdb.io/rest/account", settings)
            .then(response => response.json())
            .then(accounts => {
                loginForm.addEventListener("submit", function (event) { // EventListener for the form submission
                    event.preventDefault(); // Prevent default form submission behavior
                    const username = loginForm.elements["username"].value;
                    const password = loginForm.elements["password"].value;
                    const account = accounts.find(acc => acc.username === username && acc.password === password);
                    if (account) {
                        // Show the chat container
                        chatContainer.style.display = "block";

                        // Store user account data in sessionStorage
                        sessionStorage.setItem("userAccount", JSON.stringify(account));
                        const welcomeMessage = "<span class='black-text'>Welcome " + username + "</span>";
                        userAccountContainer.innerHTML = welcomeMessage;
                        sessionStorage.setItem("userAccountContainerHTML", userAccountContainer.outerHTML);
                        //alert("Logged in successfully!"); 
                        document.getElementById("login").reset(); // Clearing the login form using reset
                        alert("Logged in");
                    } else {
                        alert("Invalid username or password");
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching accounts:", error);
            });
    }
});

// Function to handle sending messages in the chat same as the chatbot in the game.js
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

    // Lowering all the user input for better consistency and leading them to the page they enter
    switch(userInput.toLowerCase()) {
        case "list":
            botMessage.textContent = "Displaying All the pages";
            botMessage.textContent = "Home, Men, Women, About, Contact, Game, Payment Page."
            break;
        case "home":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
            break;
        case "men":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "Men.html";
            }, 2000);
            break;
        case "women":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "Women.html";
            }, 2000);
            break;
        case "about":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "about.html";
            }, 2000);
            break;
        case "contact":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "contact.html";
            }, 2000);
            break;
        case "game":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "game.html";
            }, 2000);
            break;
        case "payment":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "payment.html";
            }, 2000);
            break;
        case "men product":
            botMessage.textContent = "Processing.....";
            setTimeout(function() {
                window.location.href = "men-product.html";
            }, 2000);
            break;
        default:
            botMessage.textContent = "I didn't understand that. Please choose a proper page."; // Print "Error" message when user enter something unrecognisable
            break;
    }

    // Showing the bot message
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