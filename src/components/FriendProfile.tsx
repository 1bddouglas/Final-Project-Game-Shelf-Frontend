import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Account from "../models/Account";
import { findAccount } from "../services/accountAPIService";
import "./FriendProfile.css";

const FriendProfile = () => {
  const [friendProfile, setFriendProfile] = useState<Account>();
  const uid = useParams().uid;

  useEffect(() => {
    if (uid) {
      findAccount(uid).then((res) => {
        setFriendProfile(res);
      });
    }
  }, [uid]);

  return (
    <div className="FriendProfile">
      <p>{friendProfile?.name}</p>
      <ul>
        {friendProfile?.wishlist.map((item) => (
          <li>
            <img src={item.images.medium} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendProfile;
