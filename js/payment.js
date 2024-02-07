// const APIKEY = "65c345cac384b99ce782ea34";

// // Get a reference to the cart items container
// var cartItemsContainer = document.getElementById('cart-items-container');

// function renderCartItem(item) {
//     // Create a div element for each item
//     var boxDiv = document.createElement('div');
//     boxDiv.classList.add('box');

//     // Create an image element and set its attributes
//     var image = document.createElement('img');
//     image.src = '/FED_Assignment_2/images/' + item.Name + '.png';
//     image.alt = 'Product Image';
//     boxDiv.appendChild(image);

//     // Create a div element for the text content
//     var textContainer = document.createElement('div');
//     textContainer.classList.add('text-container');

//     // Create a heading element for the product text
//     var title = document.createElement('h4');
//     title.textContent = item.Name;
//     textContainer.appendChild(title);

//     // Check if secondText exists before creating a paragraph element for it
//     var description = document.createElement('p');
//     description.textContent = 'Price: $' + item.Price;
//     textContainer.appendChild(description);

//     var quantity = document.createElement('p');
//     quantity.textContent = 'Quantity: ' + item.Quantity;
//     textContainer.appendChild(quantity);

//     // Append the text container to the box div
//     boxDiv.appendChild(textContainer);

//     // Append the box div to the cart items container
//     cartItemsContainer.appendChild(boxDiv);
// }

// function updateTotalPrice() {
//     var pointsInput = parseFloat(document.getElementById('pointsInput').value) || 0;
    
//     // Calculate the total price based on the conversion rate and user input points
//     var totalPrice = parseFloat(sessionStorage.getItem('totalPrice')) || 0;
//     var discountedPrice = totalPrice;

//     if (pointsInput > 0) {
//         discountedPrice -= pointsInput * 0.20;
//     }

//     // Update the total price display
//     var totalPriceDisplay = document.getElementById('total-price-display');
//     totalPriceDisplay.textContent = 'Total Price: $' + discountedPrice.toFixed(2);

//     var paymentButton = document.getElementById('paymentButton');
//     if (discountedPrice <= 0) {
//         paymentButton.disabled = true;
//     } else {
//         paymentButton.disabled = false;
//     }

//     var userAccount = JSON.parse(sessionStorage.getItem('userAccount'));
//     var availablePointsDisplay = document.getElementById('userPointsDisplay');
//     if (userAccount) {
//         var availablePoints = userAccount.point - pointsInput; // Deduct the entered points
//         availablePointsDisplay.textContent = 'Available Points: ' + availablePoints;
//         if (parseInt(pointsInput) > parseInt(userAccount.point)) {
//             alert('You cannot enter more points than your available points.');
//             document.getElementById('paymentButton').disabled = true; // Disable the payment button
//         } else {
//             document.getElementById('paymentButton').disabled = false; // Enable the payment button
//         }
//     } else {
//         availablePointsDisplay.textContent = 'Retrieving...';
//     }
// }

// var paymentForm = document.querySelector('form');

// // Add an event listener for the input event on points input field
// document.getElementById('pointsInput').addEventListener('input', updateTotalPrice);

// // Add an event listener for the form submission event
// paymentForm.addEventListener('submit', function(event) {
//     // Prevent the default form submission behavior
//     event.preventDefault();

//     updatepoint(event)
//     sessionStorage.removeItem('cartItems');
//     sessionStorage.removeItem('cartQuantity');
//     // Call the updatepoint function here if needed
//     alert("Payment made, points updated successfully")

    
//     paymentForm.reset();
// });

// // Call the updateTotalPrice function initially to set the initial total price display
// updateTotalPrice();


// function updatepoint(form) {
//     form.preventDefault();

//     // Retrieve user account information from sessionStorage
//     var userAccount = JSON.parse(sessionStorage.getItem('userAccount'));

//     if (!userAccount) {
//         console.error('User account not found in sessionStorage.');
//         return;
//     }

//     // Calculate points earned based on the total price
//     var discountedPriceString = document.getElementById('total-price-display').textContent;
//     var discountedPrice = parseFloat(discountedPriceString.replace('Total Price: $', ''));
//     var pointsInput = parseFloat(document.getElementById('pointsInput').value) || 0;
//     var earnedPoints = Math.floor(discountedPrice / 1); // Assuming 1 point per $14 spent
//     var deductedPoints = pointsInput;

//     // Update user account object with new points
//     userAccount.point += earnedPoints - deductedPoints;

//     sessionStorage.setItem('userAccount', JSON.stringify(userAccount));

//     let settings = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "x-apikey": APIKEY,
//             "Cache-Control": "no-cache"
//         },
//         body: JSON.stringify(userAccount) // Send the updated user account object in the body
//     }

//     // Send PUT request to update user account
//     fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
//         .then(response => response.json())
//         .then(data => {
//             console.log("Points updated successfully:", data);
//         })
//         .catch(error => {
//             console.error("Error updating points:", error);
//         });
// }//end updateform function



// document.addEventListener("DOMContentLoaded", function () {
//     const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

//     if (storedUserAccount && storedUserAccount.username) {
//         fetch(`https://fedtest2-4198.restdb.io/rest/account?q={"username":"${storedUserAccount.username}"}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-apikey": APIKEY,
//                 "Cache-Control": "no-cache"
//             },
//         })
//         .then(response => response.json())
//         .then(userAccounts => {
//             if (userAccounts.length > 0) {
//                 const userAccount = userAccounts[0];
//                 const userPoints = userAccount.point;
//                 // Display the points on the webpage
//                 document.getElementById("userPointsDisplay").textContent = `Available Points: ${userPoints}`;
//                 sendCartDataToServer(userAccount);
//                 totalprice(userAccount)
//                 userAccount.cartItems.forEach(function(cartItem) {
//                     renderCartItem(cartItem);
//                 });
//             } else {
//                 console.log(`User ${storedUserAccount.username} not found.`);
//             }
//             document.getElementById("loading-animation").style.display = "none"; // Hide the loading animation
//         })
//         .catch(error => {
//             console.error("Error fetching user account:", error);
//         });
//     } else {
//         alert("No user account found in sessionStorage or username missing.");
//     }
// });


// function sendCartDataToServer(userAccount) {
//     if (!userAccount) {
//         console.error('User account not found in sessionStorage.');
//         return;
//     }
//     // Retrieve cart items from sessionStorage
//     var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

//     userAccount.cartItems = userAccount.cartItems || [];

//     cartItems.forEach(function(cartItem) {
//         // Extract relevant information from the current cart item
//         var productName = cartItem.text;
//         var productPrice = parseFloat(cartItem.secondText.replace('$', ''));
//         var cartQuantity = cartItem.quantity;
    
//         // Create an object with the extracted information for the current item
//         var itemData = {
//             "Name": productName,
//             "Price": productPrice,
//             "Quantity": cartQuantity
//         };
    
//         // Push the itemData object into the userAccount.cartItems array
//         userAccount.cartItems.push(itemData);
//     });

//     // Set up the AJAX settings
//     var settings = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "x-apikey": APIKEY,
//             "Cache-Control": "no-cache",
//         },
//         body: JSON.stringify(userAccount),
//     };

//     // Send the AJAX request
//     fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
//         .then(response => response.json())
//         .then(data => {
//             console.log("Cart data sent to server:", data);
//         })
//         .catch(error => {
//             console.error("Error sending cart data to server:", error);
//         });
// }



// function totalprice(userAccount) {
//     if (!userAccount) {
//         console.error('User account not found in sessionStorage.');
//         return;
//     }
//     // Retrieve total price from sessionStorage
//     var totalPriceString = sessionStorage.getItem('totalPrice');
//     var totalPrice = parseFloat(totalPriceString);

//     // Update user account's total price
//     userAccount.totalprice = (userAccount.totalprice || 0) + totalPrice;

//     // Set up the AJAX settings
//     var settings = {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "x-apikey": APIKEY,
//             "Cache-Control": "no-cache",
//         },
//         body: JSON.stringify(userAccount),
//     };

//     // Send the AJAX request
//     fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
//         .then(response => response.json())
//         .then(data => {
//             console.log("Total price updated:", data);
//         })
//         .catch(error => {
//             console.error("Error updating total price:", error);
//         });
// }















const APIKEY = "65c345cac384b99ce782ea34";

// Get a reference to the cart items container
var cartItemsContainer = document.getElementById('cart-items-container');

function renderCartItem(item) {
    // Create a div element for each item
    var boxDiv = document.createElement('div');
    boxDiv.classList.add('box');

    // Create an image element and set its attributes
    var image = document.createElement('img');
    image.src = '/FED_Assignment_2/images/' + item.Name + '.png';
    image.alt = 'Product Image';
    boxDiv.appendChild(image);

    // Create a div element for the text content
    var textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Create a heading element for the product text
    var title = document.createElement('h4');
    title.textContent = item.Name;
    textContainer.appendChild(title);

    // Check if secondText exists before creating a paragraph element for it
    var description = document.createElement('p');
    description.textContent = 'Price: $' + item.Price;
    textContainer.appendChild(description);

    var quantity = document.createElement('p');
    quantity.textContent = 'Quantity: ' + item.Quantity;
    textContainer.appendChild(quantity);

    // Append the text container to the box div
    boxDiv.appendChild(textContainer);

    // Append the box div to the cart items container
    cartItemsContainer.appendChild(boxDiv);
}

function updateTotalPrice() {
    var pointsInput = parseFloat(document.getElementById('pointsInput').value) || 0;

    // Fetch the user account from the database
    var storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));
    if (!storedUserAccount || !storedUserAccount.username) {
        console.error('User account not found in sessionStorage or username missing.');
        return;
    }

    fetch(`https://fedtest2-4198.restdb.io/rest/account?q={"username":"${storedUserAccount.username}"}`, {
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
            var userAccount = userAccounts[0];
            var totalPrice = userAccount.totalprice || 0;

            // Calculate the discounted price based on the conversion rate and user input points
            var discountedPrice = totalPrice;
            if (pointsInput > 0) {
                discountedPrice -= pointsInput * 0.20;
            }

            // Update the total price display
            var totalPriceDisplay = document.getElementById('total-price-display');
            totalPriceDisplay.textContent = 'Total Price: $' + discountedPrice.toFixed(2);

            var paymentButton = document.getElementById('paymentButton');
            if (discountedPrice <= 0) {
                paymentButton.disabled = true;
            } else {
                paymentButton.disabled = false;
            }

            var availablePointsDisplay = document.getElementById('userPointsDisplay');
            var availablePoints = userAccount.point - pointsInput; // Deduct the entered points
            availablePointsDisplay.textContent = 'Available Points: ' + availablePoints;
            if (parseInt(pointsInput) > parseInt(userAccount.point)) {
                alert('You cannot enter more points than your available points.');
                document.getElementById('paymentButton').disabled = true; // Disable the payment button
            } else {
                document.getElementById('paymentButton').disabled = false; // Enable the payment button
            }
        } else {
            console.log(`User ${storedUserAccount.username} not found.`);
        }
        document.getElementById("loading-animation").style.display = "none"; // Hide the loading animation
    })
    .catch(error => {
        console.error("Error fetching user account:", error);
    });
}

var paymentForm = document.querySelector('form');

// Add an event listener for the input event on points input field
document.getElementById('pointsInput').addEventListener('input', updateTotalPrice);

// Add an event listener for the form submission event
paymentForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    updatepoint(event)
    sessionStorage.removeItem('cartItems');
    sessionStorage.removeItem('cartQuantity');
    // Call the updatepoint function here if needed
    alert("Payment made, points updated successfully")

    
    paymentForm.reset();
});

// Call the updateTotalPrice function initially to set the initial total price display
updateTotalPrice();


function updatepoint(form) {
    form.preventDefault();

    // Retrieve user account information from sessionStorage
    var userAccount = JSON.parse(sessionStorage.getItem('userAccount'));

    if (!userAccount) {
        console.error('User account not found in sessionStorage.');
        return;
    }

    // Calculate points earned based on the total price
    var discountedPriceString = document.getElementById('total-price-display').textContent;
    var discountedPrice = parseFloat(discountedPriceString.replace('Total Price: $', ''));
    var pointsInput = parseFloat(document.getElementById('pointsInput').value) || 0;
    var earnedPoints = Math.floor(discountedPrice / 1); // Assuming 1 point per $14 spent
    var deductedPoints = pointsInput;

    // Update user account object with new points
    userAccount.point += earnedPoints - deductedPoints;

    sessionStorage.setItem('userAccount', JSON.stringify(userAccount));

    let settings = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(userAccount) // Send the updated user account object in the body
    }

    // Send PUT request to update user account
    fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Points updated successfully:", data);
        })
        .catch(error => {
            console.error("Error updating points:", error);
        });
}//end updateform function



document.addEventListener("DOMContentLoaded", function () {
    const storedUserAccount = JSON.parse(sessionStorage.getItem("userAccount"));

    if (storedUserAccount && storedUserAccount.username) {
        fetch(`https://fedtest2-4198.restdb.io/rest/account?q={"username":"${storedUserAccount.username}"}`, {
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
                sendCartDataToServer(userAccount);
                totalprice(userAccount)
                userAccount.cartItems.forEach(function(cartItem) {
                    renderCartItem(cartItem);
                });
            } else {
                console.log(`User ${storedUserAccount.username} not found.`);
            }
            document.getElementById("loading-animation").style.display = "none"; // Hide the loading animation
        })
        .catch(error => {
            console.error("Error fetching user account:", error);
        });
    } else {
        alert("No user account found in sessionStorage or username missing.");
    }
});


function sendCartDataToServer(userAccount) {
    if (!userAccount) {
        console.error('User account not found in sessionStorage.');
        return;
    }
    // Retrieve cart items from sessionStorage
    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    userAccount.cartItems = userAccount.cartItems || [];

    cartItems.forEach(function(cartItem) {
        // Extract relevant information from the current cart item
        var productName = cartItem.text;
        var productPrice = parseFloat(cartItem.secondText.replace('$', ''));
        var cartQuantity = cartItem.quantity;
    
        // Create an object with the extracted information for the current item
        var itemData = {
            "Name": productName,
            "Price": productPrice,
            "Quantity": cartQuantity
        };
    
        // Push the itemData object into the userAccount.cartItems array
        userAccount.cartItems.push(itemData);
    });

    // Set up the AJAX settings
    var settings = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify(userAccount),
    };

    // Send the AJAX request
    fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Cart data sent to server:", data);
        })
        .catch(error => {
            console.error("Error sending cart data to server:", error);
        });
}



function totalprice(userAccount) {
    if (!userAccount) {
        console.error('User account not found in sessionStorage.');
        return;
    }
    // Retrieve total price from sessionStorage
    var totalPriceString = sessionStorage.getItem('totalPrice');
    var totalPrice = parseFloat(totalPriceString);

    // Update user account's total price
    userAccount.totalprice = (userAccount.totalprice || 0) + totalPrice;

    // Set up the AJAX settings
    var settings = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
        body: JSON.stringify(userAccount),
    };

    // Send the AJAX request
    fetch(`https://fedtest2-4198.restdb.io/rest/account/${userAccount._id}`, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Total price updated:", data);
        })
        .catch(error => {
            console.error("Error updating total price:", error);
        });
}