//[STEP 0]: Make sure our document is A-OK
document.addEventListener("DOMContentLoaded", function () {
    // What kind of interface we want at the start 
    const APIKEY = "65abe6488efa9b5bc035743a";

    
    //[STEP 1]: Create our submit form listener
    document.getElementById("register-submit").addEventListener("click", function (e) {
      // Prevent default action of the button 
      e.preventDefault();
  
      //[STEP 2]: Let's retrieve form data
      // For now, we assume all information is valid
      // You are to do your own data validation
      let AccUsername = document.getElementById("Acc-username").value;
      let AccContact = document.getElementById("Acc-contact").value;
      let AccEmail = document.getElementById("Acc-email").value;
      let AccPassword = document.getElementById("Acc-password").value;
      let AccAddress = document.getElementById("Acc-address").value;
  
      //[STEP 3]: Get form values when the user clicks on send
      // Adapted from restdb API
      let jsondata = {
        "username": AccUsername,
        "contact": AccContact,
        "email": AccEmail,
        "password": AccPassword,
        "address": AccAddress,
      };
  
      //[STEP 4]: Create our AJAX settings. Take note of API key
      let settings = {
        method: "POST", //[cher] we will use post to send info
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
        beforeSend: function () {
          //@TODO use loading bar instead
          // Disable our button or show loading bar
          document.getElementById("register-submit").disabled = true;
          // Clear our form using the form ID and triggering its reset feature
          document.getElementById("add-contact-form").reset();
        }
      }
  
      //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
      fetch("https://fedassignment-d10c.restdb.io/rest/account", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          document.getElementById("register-submit").disabled = false;
          //@TODO update frontend UI 
          document.getElementById("add-update-msg").style.display = "block";
          setTimeout(function () {
            document.getElementById("add-update-msg").style.display = "none";
          }, 3000);

        });
    });
});