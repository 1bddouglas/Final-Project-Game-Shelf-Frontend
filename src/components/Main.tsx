import { useEffect, useState } from "react";
import BoardGame from "../models/BoardGame";
import {
  getTopRatedGames,
  searchGamesByName,
} from "../services/boardGameAPIService";
import "./Main.css";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const Main = () => {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm !== "") {
      searchGamesByName(searchTerm).then((res) => setGames(res.games));
    } else {
      getTopRatedGames().then((res) => setGames(res.games));
    }
  }, [searchTerm]);
  return (
    <div className="Main">
      <SearchForm setSearchTerm={setSearchTerm} />
      <SearchResults games={games} />
    </div>
  );
};

export default Main;
