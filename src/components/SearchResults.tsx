import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import {
  criteriaFormService,
  searchGamesByName,
} from "../services/boardGameAPIService";
import "./SearchResults.css";
import SingleGameResult from "./SingleGameResult";

const SearchResults = () => {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const category = searchParams.get("category");
  const playTime = searchParams.get("playTime");
  const playerCount = searchParams.get("playerCount");
  const price = searchParams.get("price");
  useEffect(() => {
    if (searchTerm) {
      searchGamesByName(searchTerm).then((res) => setGames(res.games));
    } else {
      setGames([]);
    }
  }, [searchTerm]);
  useEffect(() => {
    if (category || playTime || playerCount || price) {
      criteriaFormService(
        category!,
        +playTime! * 60,
        +playerCount! - 1,
        +price!
      ).then((res) => {
        console.log(playTime);
        setGames(res.games);
      });
    }
  }, [category, playTime, playerCount, price]);
  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      <ul>
        {games.map((game) => (
          <SingleGameResult key={game.id} game={game} />
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
