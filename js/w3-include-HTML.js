/*includeHTML();
function includeHTML() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("w3-include-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("w3-include-html");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          a.removeAttribute("w3-include-html");
          a.innerHTML = xhttp.responseText;
          z[i].parentNode.replaceChild(a, z[i]);
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}*/



function includeHTML(callback) {
  var elements = document.querySelectorAll('[w3-include-html]');
  var remaining = elements.length;

  if (remaining === 0) {
    if (callback) callback();
    return;
  }

  elements.forEach(function (element) {
    var file = element.getAttribute('w3-include-html');
    fetch(file)
      .then(response => response.text())
      .then(data => {
        element.innerHTML = data;
        remaining--;

        if (remaining === 0) {
          if (callback) callback();
        }
      })
      .catch(error => console.error('Error fetching included file:', error));
  });
}

function addImageClickListeners() {
  var boxes = document.querySelectorAll('.box');

  boxes.forEach(function (box) {
    var image = box.querySelector('img');

    box.addEventListener('click', function () {
      var paragraphs = box.querySelectorAll('p');
      var textContent = '';

      paragraphs.forEach(function (paragraph) {
        textContent += paragraph.textContent + ' ';
      });

      addToCart(image.src, textContent.trim());
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  includeHTML(function () {
    // Your existing script for handling cart interactions
    var cartTab = document.querySelector('.cartTab');
    var marketIcon = document.getElementById('marketIcon');
    var marketSpan = document.getElementById('marketSpan');

    // Check if cartTab and marketIcon exist
    if (cartTab && marketIcon) {
      marketIcon.addEventListener('click', function () {
        cartTab.style.display = (cartTab.style.display === 'none') ? 'block' : 'none';
      });

      // Check if the close button exists in the included HTML
      var closeBtn = cartTab.querySelector('.close');

      // Ensure that closeBtn is not null before using it
      if (closeBtn) {
        closeBtn.addEventListener('click', function () {
          cartTab.style.display = 'none';
        });
      }
    }

    var storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      cartTab.innerHTML = storedCart;
      addCartEventListeners(); // Add event listeners to the new cart items
    }

    // Retrieve market span value from sessionStorage
    var storedMarketSpan = sessionStorage.getItem('marketSpan');
      if (storedMarketSpan) {
        marketSpan.textContent = storedMarketSpan;
      }
  });
});

// Function to add items to the cart
function addToCart(imageSrc, text) {
  console.log('Adding to cart:', imageSrc, text);

  var cartTab = document.querySelector('.cartTab');
  var marketSpan = document.getElementById('marketSpan');

  var currentQuantity = parseInt(marketSpan.textContent);
  marketSpan.textContent = (currentQuantity + 1).toString();

  // Create a new cart item
  var newItem = document.createElement('div');
  newItem.classList.add('cart-item', 'added-item');

  // Create an image element and set its source
  var newImage = document.createElement('img');
  newImage.src = imageSrc;
  newItem.appendChild(newImage);

  // Create a paragraph element for the text
  var newText = document.createElement('p');
  newText.textContent = text;
  newItem.appendChild(newText);

  var plusSpan = document.createElement('span');
  plusSpan.textContent = '+';
  plusSpan.classList.add('plus-sign');
  newItem.appendChild(plusSpan);

  var oneSpan = document.createElement('span');
  oneSpan.textContent = '1';
  oneSpan.classList.add('one-sign');
  newItem.appendChild(oneSpan);

  var minusSpan = document.createElement('span');
  minusSpan.textContent = '-';
  minusSpan.classList.add('minus-sign');
  newItem.appendChild(minusSpan);

  // Append the new item to the cart
  cartTab.appendChild(newItem);

  plusSpan.addEventListener('click', function () {
    var currentQuantity = parseInt(oneSpan.textContent);
    oneSpan.textContent = (currentQuantity + 1).toString();
    updateMarketSpan(1);
  });

  // Event listener for the minus button
  minusSpan.addEventListener('click', function () {
    var currentQuantity = parseInt(oneSpan.textContent);
    if (currentQuantity > 1) {
      oneSpan.textContent = (currentQuantity - 1).toString();
      updateMarketSpan(-1);
    }
  });

  sessionStorage.setItem('cart', cartTab.innerHTML);
  sessionStorage.setItem('marketSpan', marketSpan.textContent);
}

function updateMarketSpan(change) {
  var marketSpan = document.getElementById('marketSpan');
  var currentQuantity = parseInt(marketSpan.textContent);
  marketSpan.textContent = (currentQuantity + change).toString();

  sessionStorage.setItem('marketSpan', marketSpan.textContent);
}


