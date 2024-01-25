const APIKEY = "65afdc5f482ae93fcb54da42";

function contactform(form){
    form.preventDefault();

    let Name = document.getElementById("name").value;
    let Email = document.getElementById("email").value;
    let Message = document.getElementById("message").value;

    let jsondata = {
        "name": Name,
        "email": Email,
        "message": Message,
    };

    let settings = {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY,
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify(jsondata),
    }

    fetch("https://fedassg-a6f6.restdb.io/rest/feedback", settings)
        .then(response => response.json())
        .then(data => {
          console.log(data);

           const lottieContainer = document.getElementById("lottieContainer");
           lottieContainer.style.display = "block";

           setTimeout(() => {
            lottieContainer.style.display = "none";
          }, 8000);
        });

        document.getElementById("contactForm").reset();

    }
    