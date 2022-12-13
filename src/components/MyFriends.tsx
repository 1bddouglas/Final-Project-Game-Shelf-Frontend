import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./MyFriends.css";

const MyFriends = () => {
  const { account } = useContext(AuthContext);
  return (
    <div className="MyFriends">
      <h2>My Friends</h2>
      <ul>
        {account?.myFriends.map((friend) => (
          <li key={account._id}>
            <Link to={`/friendProfile/${friend.id}`}>
              <img src={friend.picture} alt={friend.name} />{" "}
            </Link>
            <Link to={`/friendProfile/${friend.id}`}>
              <p>{friend.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyFriends;
