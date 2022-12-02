import { Link } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import ImageComponentSmall from "./ImageComponentSmall";
import "./SingleGameResult.css";

interface Props {
  game: BoardGame;
}

const SingleGameResult = ({ game }: Props) => {
  return (
    <li className="SingleGameResult">
      <Link to={`/singleGame/${game.id}`}>
        <ImageComponentSmall src={game.images.small} />
      </Link>
      <p>{game.name}</p>
    </li>
  );
};

export default SingleGameResult;
