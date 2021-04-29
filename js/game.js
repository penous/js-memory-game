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
  target.classList.toggle('show');
  target.classList.toggle('disabled');
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
  console.log(clickedCards);
};

const match = () => {
  clickedCards.forEach((card) => {
    card.classList.add('match');
  });
};

const unmatch = () => {
  console.log();
};

cards.forEach((card) => {
  card.addEventListener('click', (e) => {
    revealCard(e.target);
    checkCards(e.target);
    // console.log(e.target);
  });
});
