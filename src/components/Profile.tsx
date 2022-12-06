import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ul>
        <Link to={"/MyShelf/:uid"}>
          <li>My Shelf</li>
        </Link>

        <li>My Wishlist</li>
        <li>My Friends</li>
        <li>My Reviews</li>
        <li>My Posts</li>
      </ul>
    </div>
  );
};

export default Profile;
