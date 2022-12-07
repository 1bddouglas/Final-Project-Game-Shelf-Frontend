import BoardGame from "./BoardGame";

export default interface Account {
  _id?: string;
  name: string;
  wishlist: BoardGame[];
  myShelf: BoardGame[];
  myFriends: string[];
  uid: string;
  profilePic: string;
}
