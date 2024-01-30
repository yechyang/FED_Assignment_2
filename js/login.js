// document.addEventListener("DOMContentLoaded", function () {
//     const APIKEY = "65afdc5f482ae93fcb54da42";
//     const loginForm = document.getElementById("login"); // Assuming you have a login form with id="login-form"
//     const userAccountContainer = document.getElementById("user-account-container");
    
//     getAccount();
    
// function getAccount(limit = 20, all = true) {
//     let settings = {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "x-apikey": APIKEY,
//             "Cache-Control": "no-cache"
//         },
//     }

//     fetch("https://fedassg-a6f6.restdb.io/rest/account", settings)
//         .then(response => response.json())
//         .then(accounts => {
//             loginForm.addEventListener("submit", function (event) {
//                 event.preventDefault(); // Prevent default form submission behavior
//                 const username = loginForm.elements["username"].value;
//                 const password = loginForm.elements["password"].value;
//                 const account = accounts.find(acc => acc.username === username && acc.password === password);
//                 if (account) {
//                     userAccountContainer.innerHTML = "<span class='black-text'>Welcome " + username + "</span>";
//                     //alert("Logged in successfully!"); 
//                     document.getElementById("login").reset();
//                 } else {    
//                     alert("Invalid username or password");
//                 }
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching accounts:", error);
//         });
//     }
// });





// document.addEventListener("DOMContentLoaded", function () {
//     const APIKEY = "65afdc5f482ae93fcb54da42";
//     const loginForm = document.getElementById("login"); // Assuming you have a login form with id="login-form"
//     const userAccountContainer = document.getElementById("user-account-container");

//     const storedHTML = sessionStorage.getItem("userAccountContainerHTML");

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
//                         const welcomeMessage = "<span class='black-text'>Welcome " + username + "</span>";
//                         userAccountContainer.innerHTML = welcomeMessage;
//                         sessionStorage.setItem("userAccountContainerHTML", userAccountContainer.outerHTML);
//                         //alert("Logged in successfully!"); 
//                         document.getElementById("login").reset();
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





document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afdc5f482ae93fcb54da42";
    const loginForm = document.getElementById("login"); // Assuming you have a login form with id="login-form"
    const userAccountContainer = document.getElementById("user-account-container");

    const storedHTML = sessionStorage.getItem("userAccountContainerHTML");
    const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

    if (storedHTML) {
        userAccountContainer.innerHTML = storedHTML;
        getAccount();
    } else {
        getAccount();
    }

    function getAccount(limit = 20, all = true) {
        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        }

        fetch("https://fedassg-a6f6.restdb.io/rest/account", settings)
            .then(response => response.json())
            .then(accounts => {
                loginForm.addEventListener("submit", function (event) {
                    event.preventDefault(); // Prevent default form submission behavior
                    const username = loginForm.elements["username"].value;
                    const password = loginForm.elements["password"].value;
                    const account = accounts.find(acc => acc.username === username && acc.password === password);
                    if (account) {
                        sessionStorage.setItem("userAccount", JSON.stringify(account));
                        const welcomeMessage = "<span class='black-text'>Welcome " + username + "</span>";
                        userAccountContainer.innerHTML = welcomeMessage;
                        sessionStorage.setItem("userAccountContainerHTML", userAccountContainer.outerHTML);
                        //alert("Logged in successfully!"); 
                        document.getElementById("login").reset();
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