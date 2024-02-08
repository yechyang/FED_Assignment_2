// Code referred from https://www.youtube.com/watch?v=M0egyNvsN-Y
const APIKEY = "65afdc5f482ae93fcb54da42"; // DATABASE API KEY
// Emojis to be displayed on the game board
const emojis = ["&#128512;", "&#128512;", "&#128513;", "&#128513;", "&#128514;", "&#128514;", "&#128507;", "&#128507;",
                "&#128516;", "&#128516;", "&#128517;", "&#128517;", "&#128511;", "&#128511;", "&#128509;", "&#128509;"];
var shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1); // Shuffle the emojis array to randomize their order

// Loop through the shuffled emojis array to create game boxes
for ( var i=0; i < emojis.length; i++){
    let box = document.createElement('div')
    box.className = 'item'; // Set the class name for styling
    box.innerHTML = shuf_emojis[i] // Set the inner HTML of the box to display an emoji
    
    // Add click event listener to each box
    box.onclick = function(){
        this.classList.add('boxOpen') // Add class to indicate box is open
        setTimeout(function(){
            if(document.querySelectorAll('.boxOpen').length > 1){
                // Check if the emojis in the two open boxes match
                if(document.querySelectorAll('.boxOpen')[0].innerHTML == 
                document.querySelectorAll('.boxOpen')[1].innerHTML){
                    document.querySelectorAll('.boxOpen')[0].classList.add // Add class to indicate matched boxes
                    ('boxMatch')
                    document.querySelectorAll('.boxOpen')[1].classList.add
                    ('boxMatch')
        
                    document.querySelectorAll('.boxOpen')[1].classList.remove // Remove class to indicate open boxes
                    ('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove
                    ('boxOpen')
                
                    // Check if all boxes are matched
                    if(document.querySelectorAll('.boxMatch').length == 
                    emojis.length){
                        updatePoints(10); // Update points earned
                        alert('Congrats! You win 10 points.') // Show the amount of points earned once all the emojis are matched
                    }
        
                } 
                else{
                    // If emojis do not match, remove class to indicate open boxes
                    document.querySelectorAll('.boxOpen')[1].classList.remove
                    ('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove
                    ('boxOpen')
                }
            }
        },500) // timer for the flip back of card 
    }
    
    document.querySelector('.game').appendChild(box);
}

// Function to update user points in the database
function updatePoints(pointsEarned) {
    let userAccount = JSON.parse(sessionStorage.getItem('userAccount')); // Getting userAccount from SessionStorage
    if (!userAccount) {
      console.error('User account not found in sessionStorage.'); // No user account return
      return;
    }
  
    // Add pointsEarned to user's points
    userAccount.point += pointsEarned;
  
    sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
  
    let settings = {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "x-apikey": APIKEY, // Ensure API key is securely managed
          "Cache-Control": "no-cache"
      },
      body: JSON.stringify(userAccount) // Send the updated user account object in the body
    };
    
    // Send a PUT Request to update the points of the user account
    fetch(`https://fedassg-a6f6.restdb.io/rest/account/${userAccount._id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Points updated successfully:", data);
      })
      .catch(error => {
        console.error("Error updating points:", error);
      });
  }