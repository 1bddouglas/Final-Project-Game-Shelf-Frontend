import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Account from "../models/Account";
import { getAccountByName } from "../services/accountAPIService";
import FriendSearch from "./FriendSearch";
import "./Profile.css";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [friendList, setFriendList] = useState<Account[]>([]);
  useEffect(() => {
    if (searchTerm) {
      getAccountByName(searchTerm).then((res) => {
        setFriendList(res);
        console.log(res);
      });
    }
  }, [searchTerm]);

  return (
    <div className="Profile">
      <FriendSearch setSearchTerm={setSearchTerm} />

      <ul>
        <Link to={"/MyShelf/:uid"}>
          <li>My Shelf</li>
        </Link>
        <Link to={"/wishlist/:uid"}>
          <li>My Wishlist</li>
        </Link>
        <li>My Friends</li>
        <li>My Reviews</li>
        <li>My Posts</li>
      </ul>
    </div>
  );
};

export default Profile;
