import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardGame from "../models/BoardGame";
import { singleGameService } from "../services/boardGameAPIService";
import "./SingleGame.css";

const SingleGame = () => {
  const [singleGame, setSingleGame] = useState<BoardGame>();

  const id: string | undefined = useParams().ids;

  useEffect(() => {
    singleGameService(id!).then((res) => setSingleGame(res.data));
  }, [id]);

  return (
    <div className="SingleGame">
      <img src={singleGame?.images.medium} alt="" />
      <p>{singleGame?.name}</p>
    </div>
  );
};

export default SingleGame;
