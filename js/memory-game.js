// Code referred from https://www.youtube.com/watch?v=M0egyNvsN-Y
const APIKEY = "65afd4ed482ae9179a54da3e";
const emojis = ["&#128512;", "&#128512;", "&#128513;", "&#128513;", "&#128514;", "&#128514;", "&#128507;", "&#128507;",
                "&#128516;", "&#128516;", "&#128517;", "&#128517;", "&#128511;", "&#128511;", "&#128509;", "&#128509;"];
var shuf_emojis = emojis.sort(() => (Math.random() > .5) ? 2 : -1);
for ( var i=0; i < emojis.length; i++){
    let box = document.createElement('div')
    box.className = 'item';
    box.innerHTML = shuf_emojis[i]
        
    box.onclick = function(){
        this.classList.add('boxOpen')
        setTimeout(function(){
            if(document.querySelectorAll('.boxOpen').length > 1){
                if(document.querySelectorAll('.boxOpen')[0].innerHTML ==
                document.querySelectorAll('.boxOpen')[1].innerHTML){
                    document.querySelectorAll('.boxOpen')[0].classList.add
                    ('boxMatch')
                    document.querySelectorAll('.boxOpen')[1].classList.add
                    ('boxMatch')
        
                    document.querySelectorAll('.boxOpen')[1].classList.remove
                    ('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove
                    ('boxOpen')
        
                    if(document.querySelectorAll('.boxMatch').length == 
                    emojis.length){
                        updatePoints(10);
                        alert('Congrats! You win 10 points.')
                    }
        
                } 
                else{
                    document.querySelectorAll('.boxOpen')[1].classList.remove
                    ('boxOpen')
                    document.querySelectorAll('.boxOpen')[0].classList.remove
                    ('boxOpen')
                }
            }
        },500)
    }
    
    document.querySelector('.game').appendChild(box);
}

function updatePoints(pointsEarned) {
    let userAccount = JSON.parse(sessionStorage.getItem('userAccount'));
    if (!userAccount) {
      console.error('User account not found in sessionStorage.');
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
  
    fetch(`https://fedassignment-d10c.restdb.io/rest/account/${userAccount._id}`, settings)
      .then(response => response.json())
      .then(data => {
        console.log("Points updated successfully:", data);
      })
      .catch(error => {
        console.error("Error updating points:", error);
      });
  }