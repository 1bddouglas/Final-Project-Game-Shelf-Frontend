import axios from "axios";
import BoardGame from "../models/BoardGame";
import Original from "../models/Original";

const clientID: string = process.env.REACT_APP_CLIENT_ID || "";

export const getTopRatedGames = (): Promise<Original> => {
  return axios
    .get(`https://api.boardgameatlas.com/api/search?&order_by=rank`, {
      params: { client_id: clientID },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const searchGamesByName = (title: string): Promise<Original> => {
  return axios
    .get(`https://api.boardgameatlas.com/api/search/`, {
      params: { client_id: clientID, name: title },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const criteriaFormService = (
  categories?: string,
  max_play_time?: number,
  min_players?: number,
  msrp?: number
): Promise<Original> => {
  return axios
    .get(`https://api.boardgameatlas.com/api/search/`, {
      params: {
        client_id: clientID,
        categories: categories,
        gt_max_playtime: max_play_time,
        gt_min_players: min_players,
        lt_msrp: msrp,
      },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
