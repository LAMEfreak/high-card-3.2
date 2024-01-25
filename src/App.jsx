import "./App.css";
import GameCounter from "./components/GameCounter.jsx";
import PlayerCounter from "./components/PlayerCounter.jsx";
import PlayingCard from "./components/PlayingCard.jsx";
import { makeShuffledDeck } from "./utils.jsx";
import { useState } from "react";
import confetti from "canvas-confetti";

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

const handleConfetti = () => {
  confetti();
};

function App() {
  // Set default value of card deck to new shuffled deck
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  // currCards holds the cards from the current round
  const [currCards, setCurrCards] = useState([]);
  // gameState tracks the game state: 'start', 'play' and 'end'
  const [gameState, setGameState] = useState("start");
  // Round score tracker
  const [roundScore, setRoundScore] = useState([0, 0]);
  // Game score tracker
  const [gameScore, setGameScore] = useState([0, 0]);

  const dealCards = () => {
    if (gameState === "start") setGameState("play");
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
      setGameState("end");
      updateGameScore();
      handleConfetti();
      document.body.style.backgroundColor = `${
        roundScore[0] > roundScore[1] ? "#0F683D" : "#0F4668"
      }`;
      document.body.style.transition = "background-color 0.5s ease";
      return generateWinnerMessage();
    }
  };

  // Update round score
  const updateRoundScore = (roundScore, winner) => {
    const newRoundScore = [...roundScore];
    newRoundScore[winner] += 1;
    return newRoundScore;
  };

  // Update game score
  const updateGameScore = () => {
    if (roundScore[0] > roundScore[1]) {
      setGameScore((prevGameScore) => [
        (prevGameScore[0] += 1),
        prevGameScore[1],
      ]);
    } else if (roundScore[0] < roundScore[1]) {
      setGameScore((prevGameScore) => [
        prevGameScore[0],
        (prevGameScore[1] += 1),
      ]);
    }
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
        <GameCounter player1Score={gameScore[0]} player2Score={gameScore[1]} />
        {gameState === "end" && (
          <div className="winner">{generateWinnerMessage()}</div>
        )}
        {gameState !== "start" && (
          <div className="cards-wrapper">
            <PlayerCounter
              playerNumber={1}
              roundScore={roundScore[0]}
              gameState={gameState}
            />
            {currCardElems}
            <PlayerCounter
              playerNumber={2}
              roundScore={roundScore[1]}
              gameState={gameState}
            />
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
