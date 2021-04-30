const shuffleGrid = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  console.log(cards[0].children);
  return cards;
};

// Get all cards
let cards = document.querySelectorAll('.card');
const grid = document.getElementById('grid');
let clickedCards = [];

// Randomize grid
const randomizeCards = () => {
  cards = shuffleGrid([...cards]);
  console.log(cards);
  grid.innerHTML = '';
  cards.forEach((card) => {
    grid.appendChild(card);
    console.log(card.children);
  });
};

const revealCard = (target) => {
  target.classList.remove('hide');
  target.classList.add('disabled');
};

const checkCards = (target) => {
  clickedCards.push(target);
  if (clickedCards.length === 2) {
    if (clickedCards[0].dataset.color === clickedCards[1].dataset.color) {
      match();
    } else {
      unmatch();
    }
    clickedCards = [];
  }
};

const match = () => {
  clickedCards.forEach((card) => {
    card.classList.add('match');
  });
};

const unmatch = () => {
  clickedCards.forEach((card) => {
    card.classList.add('hide');
    card.classList.remove('disabled');
  });
};

const checkWin = () => {
  const matches = document.querySelectorAll('.card-back.match');
  return matches.length === 16 ? true : false;
};

const ResetGame = () => {
  if (checkWin()) startGame();
};

const startGame = () => {
  document.querySelectorAll('.card-back').forEach((card) => {
    card.classList.add('hide');
    card.classList.remove('match');
    card.classList.remove('disabled');
  });
  randomizeCards();
};
startGame();

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    revealCard(e.target);
    setTimeout(() => {
      checkCards(e.target);
    }, 500);
    setTimeout(() => {
      ResetGame();
    }, 9500);
  });
});
