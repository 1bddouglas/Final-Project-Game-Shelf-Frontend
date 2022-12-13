import { freemem } from "os";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Account from "../models/Account";
import {
  findAccount,
  updateAccountDatabase,
} from "../services/accountAPIService";
import "./FriendProfile.css";
import trash from "../assets/trash-icon.png";

const FriendProfile = () => {
  const [friendProfile, setFriendProfile] = useState<Account>();
  const { account, setAccount } = useContext(AuthContext);
  const uid = useParams().uid;

  useEffect(() => {
    if (uid) {
      findAccount(uid).then((res) => {
        setFriendProfile(res);
      });
    }
  }, [uid]);

  const addFriendHandler = () => {
    if (account && friendProfile) {
      const copyOfAccount = { ...account };
      const copyOfFriendList = [...account.myFriends];
      copyOfAccount.myFriends = [
        ...copyOfFriendList,
        {
          name: friendProfile.name,
          picture: friendProfile.profilePic,
          id: friendProfile.uid,
        },
      ];

      updateAccountDatabase(copyOfAccount).then((res) => setAccount(res));
    }
  };

  const removeFriendHandler = (name: string): void => {
    if (account && friendProfile) {
      const copyOfAccount = { ...account };
      const copyOfFriendList = [...account.myFriends];
      const foundIndex = copyOfFriendList.findIndex(
        (friend) => friend.name === name
      );
      copyOfAccount.myFriends = [
        ...copyOfFriendList.slice(0, foundIndex),
        ...copyOfFriendList.slice(foundIndex + 1),
      ];
      updateAccountDatabase(copyOfAccount).then((res) => setAccount(res));
    }
  };

  const isFriendInList = (name: string): boolean => {
    if (account) {
      return account.myFriends.some((friend) => friend.name === name);
    } else {
      return false;
    }
  };

  return (
    <>
      {friendProfile ? (
        <div className="FriendProfile">
          <div className="profile-name-img">
            <h2>{friendProfile?.name}</h2>
            <div className="img-trash">
              <img
                src={friendProfile?.profilePic || "test"}
                alt={friendProfile?.name}
                className="profilePic"
              />
              {!isFriendInList(friendProfile!.name) ? (
                <button className="add-friend-btn" onClick={addFriendHandler}>
                  Add Friend
                </button>
              ) : (
                <img
                  className="trash-friend"
                  src={trash}
                  onClick={() => removeFriendHandler(friendProfile.name)}
                />
              )}
            </div>
          </div>
          <h3>{friendProfile?.name}'s Shelf</h3>
          <div className="my-friends-stuff">
            <ul>
              {friendProfile?.myShelf.map((item) => (
                <li key={item.id}>
                  <img src={item.images.small} alt={item.name} />
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <h3>{friendProfile?.name}'s Wishlist</h3>
          <div className="my-friends-stuff">
            <ul>
              {friendProfile?.wishlist.map((item) => (
                <li key={item.id}>
                  <img src={item.images.medium} alt={item.name} />
                  <p>{item.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </>
  );
};

export default FriendProfile;
