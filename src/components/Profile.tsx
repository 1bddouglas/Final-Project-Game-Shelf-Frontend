import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Account from "../models/Account";
import { findAccount, getAccountByName } from "../services/accountAPIService";
import FriendSearch from "./FriendSearch";
import "./Profile.css";

const Profile = () => {
  const uid = useParams().uid;
  const [searchTerm, setSearchTerm] = useState("");
  const [friendList, setFriendList] = useState<Account[]>([]);
  const [profile, setProfile] = useState<Account>();
  const { account } = useContext(AuthContext);

  useEffect(() => {
    if (searchTerm) {
      getAccountByName(searchTerm).then((res) => {
        setFriendList(res);
        console.log(res);
      });
    }
    if (uid) {
      findAccount(uid).then((res) => {
        setProfile(res);
        console.log(res);
      });
    }
  }, [searchTerm, uid]);

  return (
    <div className="Profile">
      <FriendSearch setSearchTerm={setSearchTerm} />

      <ul>
        <Link to={`/myShelf/${account?.uid}`}>
          <li>My Shelf</li>
        </Link>
        <Link to={`/wishlist/${account?.uid}`}>
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
