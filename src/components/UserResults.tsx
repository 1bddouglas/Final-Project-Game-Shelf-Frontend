import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Account from "../models/Account";
import { getAccountByName } from "../services/accountAPIService";
import "./UserResults.css";

const UserResults = () => {
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
          <li>
            <Link to={`/friendProfile/${friend.uid}`}>
              <p>{friend.name}</p>
            </Link>
            <img src={friend.profilePic} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserResults;
