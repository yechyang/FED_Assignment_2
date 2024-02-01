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