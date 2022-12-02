import { Link } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import "./SingleGameResult.css";

interface Props {
  game: BoardGame;
}

const SingleGameResult = ({ game }: Props) => {
  return (
    <li className="SingleGameResult">
      <Link to={"/singleGame/:id"}>
        <img src={game.images.small} alt={game.name} />
      </Link>
      <p>{game.name}</p>
    </li>
  );
};

export default SingleGameResult;
