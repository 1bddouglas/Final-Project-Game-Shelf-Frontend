import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ul>
        <Link to={"/MyShelf/:uid"}>
          <li>My Shelf</li>
        </Link>
        <Link to={"/wishlist/:uid"}>
          <li>My Wishlist</li>
        </Link>
        <li>My Friends</li>
        <li>My Reviews</li>
        <li>My Posts</li>
      </ul>
    </div>
  );
};

export default Profile;
