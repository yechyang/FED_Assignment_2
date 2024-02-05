const symbols = ['🍉', '🍊', '🍋', '🍌', '🍎', '🍇', '🍓', '🍒'];
const cardsContainer = document.getElementById('cards-container');
let firstCard = null;
let secondCard = null;
let canFlip = true;
let matchedCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCards() {
  const shuffledSymbols = [...symbols, ...symbols];
  shuffle(shuffledSymbols);

  shuffledSymbols.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = symbol;
    card.addEventListener('click', () => {
      if (!canFlip || card === firstCard || card.classList.contains('matched')) return;
      card.classList.add('flipped');
      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        checkMatch();
      }
    });
    cardsContainer.appendChild(card);
  });
}

function checkMatch() {
  canFlip = false;
  if (firstCard.textContent === secondCard.textContent) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCount += 2;
    if (matchedCount === symbols.length) {
      setTimeout(() => {
        alert('Congratulations! You win!');
      }, 500);
    }
    resetCards();
  } else {
    setTimeout(resetCards, 1000);
  }
}

function resetCards() {
  firstCard.classList.remove('flipped');
  secondCard.classList.remove('flipped');
  firstCard = null;
  secondCard = null;
  canFlip = true;
}

createCards();