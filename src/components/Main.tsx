import { useEffect, useState } from "react";
import BoardGame from "../models/BoardGame";
import {
  criteriaFormService,
  getTopRatedGames,
  searchGamesByName,
} from "../services/boardGameAPIService";
import CriteriaForm from "./CriteriaForm";
import "./Main.css";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import SingleGameResult from "./SingleGameResult";

const Main = () => {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [price, setPrice] = useState("");

  // let minutes = +playTime * 60;

  useEffect(() => {
    if (searchTerm !== "") {
      searchGamesByName(searchTerm).then((res) => setGames(res.games));
    } else {
      getTopRatedGames().then((res) => setGames(res.games));
    }
  }, [searchTerm]);

  useEffect(() => {
    if (category || playTime || playerCount || price) {
      criteriaFormService(
        category,
        +playTime * 60,
        +playerCount - 1,
        +price
      ).then((res) => {
        console.log(playTime);
        setGames(res.games);
      });
    }
  }, [category, playTime, playerCount, price]);

  return (
    <div className="Main">
      <SearchForm setSearchTerm={setSearchTerm} />
      <CriteriaForm
        chooseCategory={setCategory}
        maxPlayTime={setPlayTime}
        minPlayers={setPlayerCount}
        msrp={setPrice}
      />
      <ul>
        {games.map((game) => (
          <SingleGameResult key={game.id} game={game} />
        ))}
      </ul>
      {/* <SearchResults games={games} /> */}
    </div>
  );
};

export default Main;
