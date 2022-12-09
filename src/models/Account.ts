import BoardGame from "./BoardGame";

interface Friends {
  name: string;
  picture: string;
  id: string;
}

export default interface Account {
  _id?: string;
  name: string;
  wishlist: BoardGame[];
  myShelf: BoardGame[];
  myFriends: Friends[];
  uid: string;
  profilePic: string;
}
