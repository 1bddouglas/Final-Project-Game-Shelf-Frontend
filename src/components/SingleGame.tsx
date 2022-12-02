import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import { singleGameService } from "../services/boardGameAPIService";
import "./SingleGame.css";
import imgNotFound from "../assets/img-not-found.jpg";
import axios from "axios";
import ImageComponant from "./ImageComponent";

const SingleGame = () => {
  const [singleGame, setSingleGame] = useState<BoardGame>();
  const [validImage, setValidImage] = useState(false);

  const id: string | undefined = useParams().id;

  let cleanText = singleGame?.description_preview?.replace(
    /<\/?[^>]+(>|$)/g,
    ""
  );

  useEffect(() => {
    console.log(id);
    singleGameService(id!).then((res) => {
      setSingleGame(res.games[0]);
    });
  }, [id]);

  console.dir(singleGame?.images.medium);

  return (
    <div className="SingleGame">
      <h2>{singleGame?.name}</h2>
      <ImageComponant src={singleGame?.images.medium!} />
      <button className="shelf-button">Add to my Shelf</button>
      <button className="wishlist-button">Add to my Wishlist</button>
      <ul>
        {singleGame?.min_players && (
          <li>
            Players: {singleGame?.min_players} - {singleGame?.max_players}
          </li>
        )}
        {singleGame?.min_playtime && (
          <li>
            Playtime: {singleGame?.min_playtime} - {singleGame?.max_playtime}
            mins
          </li>
        )}
        {singleGame?.msrp && <li>Price: ${singleGame?.msrp}</li>}
        {singleGame?.primary_designer.name && (
          <li>Designer: {singleGame?.primary_designer.name}</li>
        )}
      </ul>
      {singleGame?.description_preview && <p>{cleanText}</p>}
    </div>
  );
};

export default SingleGame;
