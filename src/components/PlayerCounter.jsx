import PropTypes from "prop-types";

const PlayerCounter = ({ playerNumber, roundScore }) => {
  return (
    <div>
      <p className={`player color-${playerNumber}`}>Player {playerNumber}</p>
      <p className={`player color-${playerNumber}`}>{roundScore}</p>
    </div>
  );
};


// esLint prompted 'playerNumber' and 'roundScore' to be missing in props validation. Used Copilot to add type checking by importing PropTypes and defining the types of the props.Seems optional.
PlayerCounter.propTypes = {
  playerNumber: PropTypes.number.isRequired,
  roundScore: PropTypes.number.isRequired,
};

export default PlayerCounter;
