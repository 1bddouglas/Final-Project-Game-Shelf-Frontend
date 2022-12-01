import Categories from "./Categories";
import Images from "./Images";

export default interface BoardGame {
  id: string;
  name: string;
  msrp: number;
  year_published: number;
  min_players: number;
  max_players: number;
  min_age: number;
  min_play_time: number;
  max_play_time: number;
  description: string;
  categories: Categories[];
  primary_designer: string;
  rank: number;
  images: Images;
}
