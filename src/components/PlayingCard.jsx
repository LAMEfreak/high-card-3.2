import PropTypes from "prop-types";
import { imageUrls } from "../utils.jsx";
import { useEffect } from "react";

const PlayingCard = ({ suit, name }) => {
  // Preload images
  useEffect(() => {
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <>
      <img
        src={`/cards/${suit}-${name}.svg`}
        alt={`${name} of ${suit}`}
        width="150"
        height="auto"
      />
      <p style={{ fontSize: "1.5rem", fontWeight: "500" }}>
        {name} of {suit}
      </p>
    </>
  );
};

// esLint prompted 'suit' and 'name' to be missing in props validation. Used Copilot to add type checking by importing PropTypes and defining the types of the props. Seems optional.
PlayingCard.propTypes = {
  suit: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlayingCard;
