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
      <h2>Search Results</h2>
      <ul>
        {friendList.map((friend) => (
          <>
            {friend.uid !== account?.uid && (
              <li key={friend._id}>
                <div className="result-div">
                  <Link to={`/friendProfile/${friend.uid}`}>
                    <img src={friend.profilePic} alt="" />
                  </Link>
                  <Link to={`/friendProfile/${friend.uid}`}>
                    <p>{friend.name}</p>
                  </Link>
                </div>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default UserResults;
