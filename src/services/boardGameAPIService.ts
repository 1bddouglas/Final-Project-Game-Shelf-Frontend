import axios from "axios";
import SingleGame from "../components/SingleGame";
import BoardGame from "../models/BoardGame";
import Original from "../models/Original";
import QueryParams from "../models/QueryParams";

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
  price?: number
): Promise<Original> => {
  let params: QueryParams = { client_id: clientID };
  if (categories) {
    params.categories = categories;
  }
  if (max_play_time) {
    params.lt_max_playtime = max_play_time;
  }
  if (min_players) {
    params.gt_min_players = min_players;
  }
  if (price) {
    params.lt_msrp = price;
  }
  return axios
    .get(`https://api.boardgameatlas.com/api/search/`, {
      params,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};

export const singleGameService = (id: string): Promise<Original> => {
  return axios
    .get(`https://api.boardgameatlas.com/api/search`, {
      params: { ids: id, client_id: clientID },
    })
    .then((res) => res.data)
    .catch((error) => console.log(error));
};
