import Table from "react-bootstrap/Table";
import PropTypes from "prop-types";

const GameCounter = ({ player1Score, player2Score }) => {
  return (
    <Table
      striped
      bordered
      style={{
        margin: "0 auto",
        border: "2px solid #444444",
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: "#282828",
      }}
    >
      <thead>
        <tr>
          <th colSpan={2} style={{ padding: "0.5rem", fontSize: "1.2rem" }}>
            Player 1 Total Score
          </th>
          <th colSpan={2} style={{ padding: "0.5rem", fontSize: "1.2rem" }}>
            Player 2 Total Score
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            colSpan={2}
            style={{
              paddingBottom: "0.5rem",
              fontSize: "2rem",
              color: "rgb(226, 255, 154)",
              fontWeight: "bold",
            }}
          >
            {player1Score}
          </td>
          <td
            colSpan={2}
            style={{
              paddingBottom: "0.5rem",
              fontSize: "2rem",
              color: "rgb(190, 162, 255)",
              fontWeight: "bold",
            }}
          >
            {player2Score}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

// esLint prompted 'player1Score' and 'player2Score' to be missing in props validation. Used Copilot to add type checking by importing PropTypes and defining the types of the props.Seems optional.
GameCounter.propTypes = {
  player1Score: PropTypes.number.isRequired,
  player2Score: PropTypes.number.isRequired,
};
export default GameCounter;
