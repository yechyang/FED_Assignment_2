document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afdc5f482ae93fcb54da42";
    const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

    if (storedUserAccount && storedUserAccount.username) {
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