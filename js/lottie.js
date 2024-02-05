var loader = document.getElementById("lottie");

//hiding loader after it page has loaded
//window.addEventListener("load", function(){
//    loader.style.display = "none";
//})

function hideLoader() {
    loader.style.display = "none";
}

// Hide the loader after a certain period of time (time taken to load was too fast to see animation) (e.g., 3000 milliseconds = 3 seconds)
setTimeout(hideLoader, 5000);

// Event listener to hide the loader when the page has fully loaded
//window.addEventListener("load", function(){
//    hideLoader();
//});