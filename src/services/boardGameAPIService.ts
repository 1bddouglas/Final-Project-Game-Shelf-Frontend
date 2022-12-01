import axios from "axios";
import BoardGame from "../models/BoardGame";

const clientID: string = process.env.REACT_APP_CLIENT_ID || "";

export const getTopRatedGames = (): Promise<BoardGame[]> => {
  return axios
    .get(`https://api.boardgameatlas.com/api/search?&order_by=rank`, {
      params: { client_id: clientID },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
