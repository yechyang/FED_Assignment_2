window.addEventListener('load', function () {
  const APIKEY = "65afdc5f482ae93fcb54da42";
  var marketIcon = document.getElementById('market-icon');
  var cartTab = document.querySelector('.cartTab');
  var boxContainer = document.querySelector('.box-container'); // Adjust to your actual container class
  var shoppingCartList = document.querySelector('.shopping-cart-list');
  var totalPriceElement = document.getElementById('total-price'); // Add an element with id 'total-price' to display the total
  var cartQuantitySpan = document.getElementById('cart-quantity');
  
  // Initialize total price
  var totalPrice = 0;
  var cartQuantity = 0;
  
  // Retrieve cart items from sessionStorage if available
  var storedCartItems = JSON.parse(sessionStorage.getItem('cartItems'));
  if (storedCartItems) {
    storedCartItems.forEach(function(item) {
      addToCart(item.image, item.text, item.secondText, false);
    });
  }
  
  if (marketIcon) {
    marketIcon.addEventListener('click', function () {
      toggleCartDisplay();
    });
  }

  // Close cart when clicking outside of it
  document.body.addEventListener('click', function(event) {
    var isClickInsideCart = cartTab.contains(event.target) || marketIcon.contains(event.target);
    if (!isClickInsideCart) {
      cartTab.style.display = 'none';
    }
  });

  // Delegate click event handling to the parent container
  boxContainer.addEventListener('click', function (event) {
    var clickedBox = event.target.closest('.box');

    if (clickedBox) {
      // Get product details from the clicked box
      var productImage = clickedBox.querySelector('img').getAttribute('src');
      
      var productNameElement = clickedBox.querySelector('p:nth-child(2)');
      var firstProductText = productNameElement ? productNameElement.textContent.trim() : '';
      
      var productPriceElement = clickedBox.querySelector('p:nth-child(3)');
      var secondProductText = productPriceElement ? productPriceElement.textContent.trim() : '';

      // You can now use the product details to add it to the shopping cart
      if (isUserLoggedIn()) {
        addToCart(productImage, firstProductText, secondProductText);
      } else {
        alert("Please log in to add items to the cart.");
      }
    }
  });
  function toggleCartDisplay() {
    if (cartTab.style.display === 'none' || cartTab.style.display === '') {
      cartTab.style.display = 'block';
    } else {
      cartTab.style.display = 'none';
    }
  }

  function addToCart(image, text, secondText, addToSessionStorage = true) {
    var listItem = document.createElement('li');

    // Create a container for the image, text, and buttons
    var contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    // Create an image element
    var imageElement = document.createElement('img');
    imageElement.src = image;
    imageElement.alt = 'Product Image';

    // Create a paragraph element for the first paragraph
    var textElement = document.createElement('p');
    textElement.textContent = text;

    // Create a paragraph element for the second paragraph
    var secondTextElement = document.createElement('p');
    secondTextElement.textContent = secondText;

    // Create spans for plus, minus, and quantity
    var plusSpan = document.createElement('span');
    plusSpan.textContent = '+';
    plusSpan.classList.add('plus-sign');

    var oneSpan = document.createElement('span');
    oneSpan.textContent = '1';
    oneSpan.classList.add('one-sign');

    var minusSpan = document.createElement('span');
    minusSpan.textContent = '-';
    minusSpan.classList.add('minus-sign');

    // Append the image and text to the content container
    contentContainer.appendChild(imageElement);
    contentContainer.appendChild(textElement);
    contentContainer.appendChild(secondTextElement);

    // Append the spans
    contentContainer.appendChild(minusSpan);
    contentContainer.appendChild(oneSpan);
    contentContainer.appendChild(plusSpan);

    // Append the content container to the list item
    listItem.appendChild(contentContainer);

    // Append the new list item to the shopping cart list
    if (shoppingCartList) {
      shoppingCartList.appendChild(listItem);

      // Extract the price from the second paragraph and update the total price
      var productPrice = parseFloat(secondText.replace('$', ''));
      totalPrice += productPrice;

      // Update the total price element
      if (totalPriceElement) {
        totalPriceElement.textContent = 'Total Price: $' + totalPrice.toFixed(2);
        sessionStorage.setItem('totalPrice', totalPrice.toFixed(2));
      }

      cartQuantity++;
      if (cartQuantitySpan) {
        cartQuantitySpan.textContent = cartQuantity.toString();
      }
  
      // Add event listeners to plus and minus spans
      plusSpan.addEventListener('click', function () {
        var quantity = parseInt(oneSpan.textContent);
        oneSpan.textContent = (quantity + 1).toString();
        // Update the total price when quantity changes
        totalPrice += productPrice;
        totalPriceElement.textContent = 'Total Price: $' + totalPrice.toFixed(2);

        cartQuantity++;
        if (cartQuantitySpan) {
          cartQuantitySpan.textContent = cartQuantity.toString();
        }
        updateCartItemQuantity(itemData, quantity + 1);
        sessionStorage.setItem('totalPrice', totalPrice.toFixed(2));
      });

      minusSpan.addEventListener('click', function () {
        var quantity = parseInt(oneSpan.textContent);
        if (quantity > 1) {
          oneSpan.textContent = (quantity - 1).toString();
          // Update the total price when quantity changes
          totalPrice -= productPrice;
          totalPriceElement.textContent = 'Total Price: $' + totalPrice.toFixed(2);

          cartQuantity--;
          if (cartQuantitySpan) {
            cartQuantitySpan.textContent = cartQuantity.toString();
          }
          updateCartItemQuantity(itemData, quantity - 1);
          sessionStorage.setItem('totalPrice', totalPrice.toFixed(2));
        }
      });

      if (addToSessionStorage) {
        var storedCartQuantity = parseInt(sessionStorage.getItem('cartQuantity')) || 0;
        sessionStorage.setItem('cartQuantity', storedCartQuantity + 1);
        // Store item in sessionStorage
        var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        var itemData = {
          image: image,
          text: text,
          secondText: secondText,
          quantity: 1
        };
        cartItems.push(itemData);
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
      }

      // Log to console for verification (you can remove this line in the final version)
      console.log('Product added to cart:', { image, text, secondText });
    } else {
      console.error('Shopping cart list not found.');
    }
  }

  var removeAllButton = document.getElementById('remove-all');
  if (removeAllButton) {
    removeAllButton.addEventListener('click', function () {
      // Clear the shopping cart and reset the total price
      if (shoppingCartList) {
        shoppingCartList.innerHTML = '';
        totalPrice = 0;
        cartQuantity = 0;
        if (totalPriceElement) {
          totalPriceElement.textContent = 'Total Price: $0.00';
        }
        if (cartQuantitySpan) {
          cartQuantitySpan.textContent = '0';
        }

        // Remove cartItems from sessionStorage
        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('cartQuantity')
        sessionStorage.removeItem('totalPrice')
      }
    });
  }

 /* function sendCartDataToServer(cartItem, cartQuantity) {
    var userAccount = JSON.parse(sessionStorage.getItem('userAccount'));
    if (!userAccount) {
        console.error('User account not found in sessionStorage.');
        return;
    }
    // Extract relevant information from the current cart item
    var productName = cartItem.querySelector('p:nth-child(2)').textContent.trim();
    var productPriceText = cartItem.querySelector('p:nth-child(3)').textContent.trim();
    var productPrice = parseFloat(productPriceText.replace('$', ''));

    // Create an object with the extracted information
    var itemData = {
      "Name": productName,
      "Price": productPrice,
      "Quantity": cartQuantity,
    };

    // Ensure userAccount has a cartItems array
    userAccount.cartItems = userAccount.cartItems || [];

    // Append the new item to the cartItems array
    userAccount.cartItems.push(itemData);

    sessionStorage.setItem('userAccount', JSON.stringify(userAccount));

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
    fetch(`https://fedassg-a6f6.restdb.io/rest/account/${userAccount._id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Cart data sent to server:", data);
      })
      .catch(error => {
        console.error("Error sending cart data to server:", error);
      });
  }
});*/


function isUserLoggedIn() {
  // Check if the currentUserAccount exists in sessionStorage
  var currentUserAccount = sessionStorage.getItem("userAccount");
  return currentUserAccount !== null;
} 


function updateCartItemQuantity(itemData, newQuantity) {
  // Find the item in cartItems array and update its quantity
  var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
  var index = cartItems.findIndex(item => item.text === itemData.text && item.secondText === itemData.secondText);
  if (index !== -1) {
      cartItems[index].quantity = newQuantity;
      sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
}
});