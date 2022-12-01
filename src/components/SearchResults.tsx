import BoardGame from "../models/BoardGame";
import "./SearchResults.css";
import SingleGameResult from "./SingleGameResult";

interface Props {
  games: BoardGame[];
}

const SearchResults = ({ games }: Props) => {
  return (
    <div className="SearchResults">
      <ul>
        {games.map((game) => (
          <SingleGameResult key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
