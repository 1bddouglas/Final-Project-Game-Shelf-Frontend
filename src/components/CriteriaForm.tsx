import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CriteriaForm.css";

interface Props {
  chooseCategory: (categories: string) => void;
  maxPlayTime: (max_play_time: string) => void;
  minPlayers: (min_players: string) => void;
  msrp: (price: string) => void;
}

const CriteriaForm = ({
  chooseCategory,
  maxPlayTime,
  minPlayers,
  msrp,
}: Props) => {
  const [category, setCategory] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [playerCount, setPlayerCount] = useState("1");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const criteriaSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    chooseCategory(category);
    maxPlayTime(playTime);
    minPlayers(playerCount);
    msrp(price);
    console.log(price);
    navigate(
      `/searchResults?${new URLSearchParams({
        category,
        playTime,
        playerCount,
        price,
      })}`
    );
  };

  return (
    <form className="CriteriaForm" onSubmit={criteriaSubmitHandler}>
      <div className="category-div">
        <label htmlFor="categories">Categories</label>
        <select
          name="categories"
          id="categories"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="none">Select category</option>
          <option value="fW5vusE96B">Campaign</option>
          <option value="PinhJrhnxU">Bluffing</option>
          <option value="ge8pIhEUGE">Cooperative</option>
          <option value="ZTneo8TaIO">Fantasy</option>
          <option value="rrvd68LjOR">Kickstarter</option>
          <option value="FC6ElKI9tk">Miniatures</option>
          <option value="X8J7RM6dxX">Party Game</option>
          <option value="3B3QpKvXD3">Sci-Fi</option>
          <option value="hShsL2DktG">Sports</option>
          <option value="a2eMKxxlVW">Two player Only Game</option>
          <option value="YGHGDjahKY">Trivia</option>
          <option value="djokexoK0U">Video Game Theme</option>
        </select>
      </div>
      <div className="playtime-div">
        <label htmlFor="PlayTime">Play Time</label>
        <div className="range-numbers">
          <input
            type="range"
            id="playTime"
            name="playTime"
            min="0"
            max="10"
            value={playTime}
            step=".25"
            onChange={(e) => {
              setPlayTime(e.target.value);
            }}
          />
          <div className="playtime-paragraph">
            <p>{playTime}hrs</p>
          </div>
        </div>
      </div>

      <div className="playercount-div">
        <label htmlFor="playerCount">Player Count</label>
        <input
          type="number"
          id="playerCount"
          name="playerCount"
          min="1"
          max="12"
          value={playerCount}
          onChange={(e) => {
            setPlayerCount(e.target.value);
          }}
        />
      </div>
      <div className="price-div">
        <label htmlFor="price">Price</label>
        <input
          className="price-input"
          type="number"
          name="price"
          id="price"
          min="0"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
      </div>
      <div className="btn-div">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default CriteriaForm;
