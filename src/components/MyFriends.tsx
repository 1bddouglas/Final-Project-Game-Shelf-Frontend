import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./MyFriends.css";

const MyFriends = () => {
  const { account } = useContext(AuthContext);
  return (
    <div className="MyFriends">
      <ul>
        {account?.myFriends.map((friend) => (
          <Link to={`/friendProfile/${friend.id}`}>
            <li key={account._id}>{friend.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MyFriends;
