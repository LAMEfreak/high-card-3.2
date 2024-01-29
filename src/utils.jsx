// Preload all cards
export const imageUrls = [
  '/cards/Clubs-Ace.svg',
  '/cards/Clubs-2.svg',
  '/cards/Clubs-3.svg',
  '/cards/Clubs-4.svg',
  '/cards/Clubs-5.svg',
  '/cards/Clubs-6.svg',
  '/cards/Clubs-7.svg',
  '/cards/Clubs-8.svg',
  '/cards/Clubs-9.svg',
  '/cards/Clubs-10.svg',
  '/cards/Clubs-Jack.svg',
  '/cards/Clubs-Queen.svg',
  '/cards/Clubs-King.svg',
  '/cards/Hearts-Ace.svg',
  '/cards/Hearts-2.svg',
  '/cards/Hearts-3.svg',
  '/cards/Hearts-4.svg',
  '/cards/Hearts-5.svg',
  '/cards/Hearts-6.svg',
  '/cards/Hearts-7.svg',
  '/cards/Hearts-8.svg',
  '/cards/Hearts-9.svg',
  '/cards/Hearts-10.svg',
  '/cards/Hearts-Jack.svg',
  '/cards/Hearts-Queen.svg',
  '/cards/Hearts-King.svg',
  '/cards/Diamonds-Ace.svg',
  '/cards/Diamonds-2.svg',
  '/cards/Diamonds-3.svg',
  '/cards/Diamonds-4.svg',
  '/cards/Diamonds-5.svg',
  '/cards/Diamonds-6.svg',
  '/cards/Diamonds-7.svg',
  '/cards/Diamonds-8.svg',
  '/cards/Diamonds-9.svg',
  '/cards/Diamonds-10.svg',
  '/cards/Diamonds-Jack.svg',
  '/cards/Diamonds-Queen.svg',
  '/cards/Diamonds-King.svg',
  '/cards/Spades-Ace.svg',
  '/cards/Spades-2.svg',
  '/cards/Spades-3.svg',
  '/cards/Spades-4.svg',
  '/cards/Spades-5.svg',
  '/cards/Spades-6.svg',
  '/cards/Spades-7.svg',
  '/cards/Spades-8.svg',
  '/cards/Spades-9.svg',
  '/cards/Spades-10.svg',
  '/cards/Spades-Jack.svg',
  '/cards/Spades-Queen.svg',
  '/cards/Spades-King.svg',
  
]


// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, card name and card rank are the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardRank = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "Ace";
        // Ace has higher rank than all other cards
        cardRank = 14;
      } else if (cardName === "11") {
        cardName = "Jack";
      } else if (cardName === "12") {
        cardName = "Queen";
      } else if (cardName === "13") {
        cardName = "King";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: cardRank,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Export functionality to create a shuffled 52-card deck
export const makeShuffledDeck = () => shuffleCards(makeDeck());
