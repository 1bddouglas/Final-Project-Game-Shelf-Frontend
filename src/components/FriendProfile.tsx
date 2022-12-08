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
      copyOfAccount.myFriends = [...copyOfFriendList, friendProfile.name];

      updateAccountDatabase(copyOfAccount).then((res) => setAccount(res));
    }
  };

  const removeFriendHandler = (name: string): void => {
    if (account && friendProfile) {
      const copyOfAccount = { ...account };
      const copyOfFriendList = [...account.myFriends];
      const foundIndex = copyOfFriendList.findIndex(
        (friend) => friend === name
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
      return account.myFriends.some((friend) => friend === name);
    } else {
      return false;
    }
  };

  return (
    <>
      {friendProfile ? (
        <div className="FriendProfile">
          <p>{friendProfile?.name}</p>
          <img
            src={friendProfile?.profilePic || "test"}
            alt={friendProfile?.name}
            className="profilePic"
          />
          {!isFriendInList(friendProfile!.name) ? (
            <button onClick={addFriendHandler}>Add Friend</button>
          ) : (
            <button onClick={() => removeFriendHandler(friendProfile.name)}>
              delete Friend
            </button>
          )}
          <ul>
            <h3>{friendProfile?.name}'s Shelf</h3>
            {friendProfile?.myShelf.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
                <img src={item.images.small} alt={item.name} />
              </li>
            ))}
          </ul>
          <ul>
            <h3>{friendProfile?.name} Wishlist</h3>
            {friendProfile?.wishlist.map((item) => (
              <li key={item.id}>
                <p>{item.name}</p>
                <img src={item.images.medium} alt={item.name} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>...loading</p>
      )}
    </>
  );
};

export default FriendProfile;
