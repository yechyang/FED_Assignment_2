const randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;

function checkGuess() {
  const guessInput = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (isNaN(guessInput) || guessInput < 1 || guessInput > 100) {
    message.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts--;

  if (guessInput === randomNumber) {
    message.textContent = `Congratulations! You guessed the number ${randomNumber} correctly!`;
    disableInput();
  } else if (guessInput < randomNumber) {
    message.textContent = `Too low! You have ${attempts} attempts left.`;
  } else {
    message.textContent = `Too high! You have ${attempts} attempts left.`;
  }

  if (attempts === 0) {
    message.textContent = `Sorry, you've run out of attempts. The number was ${randomNumber}.`;
    disableInput();
  }
}

function disableInput() {
  document.getElementById("guessInput").setAttribute("disabled", "true");
  document.querySelector("button").setAttribute("disabled", "true");
}