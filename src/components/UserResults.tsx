import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import Account from "../models/Account";
import { getAccountByName } from "../services/accountAPIService";
import "./UserResults.css";

const UserResults = () => {
  const { account } = useContext(AuthContext);
  const [friendList, setFriendList] = useState<Account[]>([]);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchFriend");
  useEffect(() => {
    if (searchTerm) {
      getAccountByName(searchTerm).then((res) => {
        setFriendList(res);
        console.log(res);
      });
    }
  }, [searchTerm]);
  return (
    <div className="UserResults">
      <ul>
        {friendList.map((friend) => (
          <>
            {friend.uid !== account?.uid ? (
              <li key={friend._id}>
                <Link to={`/friendProfile/${friend.uid}`}>
                  <p>{friend.name}</p>
                </Link>
                <img src={friend.profilePic} alt="" />
              </li>
            ) : (
              <p>Could not find users</p>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default UserResults;
