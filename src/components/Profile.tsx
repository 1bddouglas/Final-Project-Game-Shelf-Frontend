import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  useEffect(() => {
    console.log("reloaded page");

    if (account) {
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
    } else {
      navigate(`/home`);
    }
  }, [searchTerm, uid]);

  return (
    <div className="Profile">
      <div className="search-div">
        <FriendSearch setSearchTerm={setSearchTerm} />
      </div>
      <ul>
        <div>
          <Link to={`/myShelf/${account?.uid}`}>
            <div className="circle-div my-shelf-div">
              <li>My Shelf</li>
            </div>
          </Link>
          <Link to={`/wishlist/${account?.uid}`}>
            <div className="circle-div my-wishlist-div">
              <li>My Wishlist</li>
            </div>
          </Link>
        </div>
        <div>
          <Link to={`/myFriends/${account?.uid}`}>
            <div className="circle-div my-friends-div">
              <li>My Friends</li>
            </div>
          </Link>
          <Link to={`/reviews/${account?.uid}`}>
            <div className="circle-div my-reviews-div">
              <li>My Reviews</li>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default Profile;
