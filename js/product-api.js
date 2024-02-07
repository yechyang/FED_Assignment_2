document.addEventListener("DOMContentLoaded", function () {
    const APIKEY = "65c345cac384b99ce782ea34";
    getContacts();
    
  function getContacts(limit = 20, all = true) {

    //[STEP 7]: Create our AJAX settings
    let settings = {
      method: "GET", //[cher] we will use GET to retrieve info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    //[STEP 8]: Make our AJAX calls
    // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
    // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
    fetch("https://fedtest2-4198.restdb.io/rest/item", settings)
      .then(response => response.json())
      .then(response => {
        let content = "";

        for (var i = 0; i < response.length && i < limit; i++) {
          let item = response[i];
          let imagePath = '/FED_Assignment_2/images/' + encodeURIComponent(item.Product) + '.png';
          console.log(imagePath);

          content += `<div class="col-md-4">
            <div class="box text-center"> 
              <img src="${imagePath}" alt="${item.Product}">
              <p>${item.Product}</p>
              <p>&nbsp;&nbsp;&nbsp;$${item.Price}</p>
            </div>
          </div>`;
        }

        document.querySelector(".box-container .row").innerHTML = content;
        document.getElementById("loading-animation").style.display = "none"; // Hide the loading animation
        document.querySelector(".box-container").style.display = "block"; // Show the product boxes
      });
  };
});



