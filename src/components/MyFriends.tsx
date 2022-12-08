import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "./MyFriends.css";

const MyFriends = () => {
  const { account } = useContext(AuthContext);
  return (
    <div className="MyFriends">
      <ul>
        {account?.myFriends.map((friend) => (
          <li>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyFriends;
