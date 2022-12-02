import Categories from "./Categories";
import Images from "./Images";
import PrimaryDesigner from "./PrimaryDesigner";

export default interface BoardGame {
  id: string;
  name: string;
  msrp: number;
  year_published: number;
  min_players: number;
  max_players: number;
  min_age: number;
  min_playtime: number;
  max_playtime: number;
  description_preview: string;
  categories: Categories[];
  primary_designer: PrimaryDesigner;
  rank: number;
  images: Images;
}
