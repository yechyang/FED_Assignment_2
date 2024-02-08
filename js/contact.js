const APIKEY = "65afdc5f482ae93fcb54da42"; // Database API KEY

// Function to handle form submission
function contactform(form){
    form.preventDefault(); // Prevent the default form submission behavior

    // Retrieving the input values
    let Name = document.getElementById("name").value;
    let Email = document.getElementById("email").value;
    let Message = document.getElementById("message").value;

    // Create JSON to include the input values
    let jsondata = {
        "name": Name,
        "email": Email,
        "message": Message,
    };

    // Define fetch settings for POST request
    let settings = {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
    }

    // Sending the POST to the database link
    fetch("https://fedassg-a6f6.restdb.io/rest/feedback", settings)
        .then(response => response.json()) // Parse response JSON
        .then(data => {
          console.log(data);

          // Displaying the lottie animation i got after POSTING sucess
           const lottieContainer = document.getElementById("lottieContainer");
           lottieContainer.style.display = "block";

           // Hiding the animation after 8 seconds
           setTimeout(() => {
            lottieContainer.style.display = "none";
          }, 8000);
        });

        document.getElementById("contactForm").reset(); // Resetting the form after form submission

    }
    