import BoardGame from "./BoardGame";

export default interface Account {
  _id?: string;
  wishlist: BoardGame[];
  myShelf: BoardGame[];
  myFriends: string[];
  uid: string;
}
