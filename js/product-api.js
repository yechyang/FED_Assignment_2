// This event listener waits for the DOMContentLoaded event, which indicates that the HTML document has been completely loaded and parsed.
document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65afd4ed482ae9179a54da3e"; // DATABASE API KEY
    getContacts();
    
  function getContacts(limit = 20, all = true) {

    // Ajax Settings for making a GET request to the API
    let settings = {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    // Making the AJAX call to fetch contacts data from the API.
    fetch("https://fedassignment-d10c.restdb.io/rest/item", settings)
      .then(response => response.json())
      .then(response => {
        // Initialize an empty string to store the HTML content for displaying contacts.
        let content = "";

        // Loop through the response data and create HTML content for each contact.
        for (var i = 0; i < response.length && i < limit; i++) {
          let item = response[i];
          let imagePath = 'images/' + encodeURIComponent(item.Product) + '.png';
          console.log(imagePath);

          // Content for the HTML element for showing each product that is in the database
          content += `<div class="col-md-4">
            <div class="box text-center"> 
              <img src="${imagePath}" alt="${item.Product}">
              <p>${item.Product}</p>
              <p>&nbsp;&nbsp;&nbsp;$${item.Price}</p>
            </div>
          </div>`;
        }

        // Update the HTML content of the container with class 'box-container'.
        document.querySelector(".box-container .row").innerHTML = content;
        document.getElementById("loading-animation").style.display = "none"; // Hide the loading animation
        document.querySelector(".box-container").style.display = "block"; // Show the product boxes
      });
  };
});



