import BoardGame from "../models/BoardGame";
import "./SingleGameResult.css";

interface Props {
  game: BoardGame;
}

const SingleGameResult = ({ game }: Props) => {
  return (
    <li className="SingleGameResult">
      <img src={game.images.small} alt={game.name} />
      <p>{game.name}</p>
    </li>
  );
};

export default SingleGameResult;
