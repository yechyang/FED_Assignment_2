const APIKEY = "65afdc5f482ae93fcb54da42";

// Get a reference to the cart items container
var cartItemsContainer = document.getElementById('cart-items-container');

// Retrieve cart items from sessionStorage if available
var storedCartItems = JSON.parse(sessionStorage.getItem('cartItems'));

// Check if the container exists and cart items are available
if (cartItemsContainer && storedCartItems) {
    // Render the cart items inside the container
    storedCartItems.forEach(function(item) {
        renderCartItem(item);
    });

    var totalPriceDisplay = document.getElementById('total-price-display');
    var totalPrice = parseFloat(sessionStorage.getItem('totalPrice')) || 0;
    totalPriceDisplay.textContent = 'Total Price: $' + totalPrice.toFixed(2);
} else {
    console.error('Cart items container not found or no cart items in sessionStorage.');
}

function renderCartItem(item) {
    // Create a div element for each item
    var boxDiv = document.createElement('div');
    boxDiv.classList.add('box');

    // Create an image element and set its attributes
    var image = document.createElement('img');
    image.src = item.image;
    image.alt = 'Product Image';
    boxDiv.appendChild(image);

    // Create a div element for the text content
    var textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Create a heading element for the product text
    var title = document.createElement('h4');
    title.textContent = item.text;
    textContainer.appendChild(title);

    // Check if secondText exists before creating a paragraph element for it
    if (item.secondText) {
        var description = document.createElement('p');
        description.textContent = item.secondText;
        textContainer.appendChild(description);
    }

    // Append the text container to the box div
    boxDiv.appendChild(textContainer);

    // Append the box div to the cart items container
    cartItemsContainer.appendChild(boxDiv);
}



function updatepoint(form) {
    form.preventDefault();

    // Retrieve user account information from sessionStorage
    var userAccount = JSON.parse(sessionStorage.getItem('userAccount'));

    if (!userAccount) {
        console.error('User account not found in sessionStorage.');
        return;
    }

    // Calculate points earned based on the total price
    let totalPrice = parseFloat(sessionStorage.getItem('totalPrice')) || 0;
    let pointsEarned = Math.floor(totalPrice / 1);

    // Update user account object with new points
    userAccount.point += pointsEarned;

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
    fetch(`https://fedassg-a6f6.restdb.io/rest/account/${userAccount._id}`, settings)
        .then(response => response.json())
        .then(data => {
            console.log("Points updated successfully:", data);
        })
        .catch(error => {
            console.error("Error updating points:", error);
        });
}//end updateform function


var paymentForm = document.querySelector('form');

// Add an event listener for the form submission event
paymentForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Call the updatepoint function
    updatepoint(event);

    paymentForm.reset();
});
