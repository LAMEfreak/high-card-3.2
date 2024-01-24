import "./App.css";
import PlayerCounter from "./components/PlayerCounter.jsx";
import PlayingCard from "./components/PlayingCard.jsx";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";

// Check winner of round
const checkWinner = (card1, card2) => {
  if (card1.rank > card2.rank) {
    return 0;
  } else if (card1.rank < card2.rank) {
    return 1;
  } else {
    return 2;
  }
};

function App() {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  // gameState tracks the game state: 'start', 'play' and 'end'
  const [gameState, setGameState] = useState("start");
  // score tracker
  const [roundScore, setRoundScore] = useState([0, 0]);

  const dealCards = () => {
    if (gameState === 'start') setGameState("play")
    const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
    setCurrCards(newCurrCards);
    const winner = checkWinner(newCurrCards[0], newCurrCards[1]);
    setRoundScore(updateRoundScore(roundScore, winner));
    checkLastRound();
  };

  const checkLastRound = () => {
    // Check no more cards, determine winner and end game
    if (cardDeck.length === 0) {
      // Change background color with transition
      document.body.style.backgroundColor = "#0d3e5d";
      document.body.style.transition = "background-color 0.5s ease";
      setGameState("end");
      return generateWinnerMessage();
    }
  };

  // Update round score
  const updateRoundScore = (roundScore, winner) => {
    const newRoundScore = [...roundScore];
    newRoundScore[winner] += 1;
    return newRoundScore;
  };

  const generateWinnerMessage = () => {
    let winner;
    if (roundScore[0] > roundScore[1]) {
      winner = 1;
    } else if (roundScore[0] < roundScore[1]) {
      winner = 2;
    } else {
      winner = 0;
    }
    let message;
    {
      winner !== 0
        ? (message = `Player ${winner} wins!`)
        : (message = `It's a draw!`);
    }
    return message;
  };

  const restartRound = () => {
    document.body.style.backgroundColor = "#242424";
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setGameState("start");
    setRoundScore([0, 0]);
  };

  // You can access your current components state here, as indicated below
  const currCardElems = currCards.map(({ name, suit }) => (
    // Give each list element a unique key
    // Use string interpolation to retrieve image of card
    <div key={`${name}${suit}`} className="card-container">
      <PlayingCard name={name} suit={suit} />
    </div>
  ));

  return (
    <>
      <div className="card">
        <h1>React High Card</h1>
        {gameState === "end" && (
          <div className="winner">{generateWinnerMessage()}</div>
        )}
        {gameState !== "start" && (
          <div className="cards-wrapper">
            <PlayerCounter playerNumber={1} roundScore={roundScore[0]} />
            {currCardElems}
            <PlayerCounter playerNumber={2} roundScore={roundScore[1]} />
          </div>
        )}
        {gameState === "start" && <h2>Click Deal to begin!</h2>}
        <p>Cards Left: {cardDeck.length}</p>
        <br />
        <button onClick={gameState !== "end" ? dealCards : restartRound}>
          {gameState !== "end" ? `Deal` : `Restart`}
        </button>
      </div>
    </>
  );
}

export default App;
