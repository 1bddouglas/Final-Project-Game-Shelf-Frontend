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
          <Link to={`/friendProfile/${friend.id}`}>
            <li key={account._id}>
              <img src={friend.picture} alt={friend.name} />{" "}
              <p>{friend.name}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MyFriends;
