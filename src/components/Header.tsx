import "./Header.css";
import logo from "../assets/print_transparent.png";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const signOutButton = () => {
    signOut();
    navigate("/home");
  };

  return (
    <header className="Header">
      <div className="back-arrow-div">
        <img
          src={backArrow}
          className="back-arrow"
          onClick={() => navigate(-1)}
        />
      </div>

      <h1>
        <Link to={"/"}>
          <img src={logo} alt="The Game Shelf" className="logo" />
        </Link>
      </h1>

      {user ? (
        <>
          <div className="google-signin-button">
            <button className="sign-out" onClick={signOutButton}>
              Sign Out
            </button>
            <Link to={`/profile/${user.uid}`}>
              <p>{user.displayName}</p>
            </Link>

            {!!user.photoURL && (
              <p>
                <Link to={`/profile/${user.uid}`}>
                  <img src={user.photoURL} alt="" className="profile-pic" />
                </Link>
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="sign-in-div">
          <button className="sign-in" onClick={signInWithGoogle}>
            Sign in
          </button>
        </div>
      )}
      {/* TODO {<div></div>} */}
    </header>
  );
};

export default Header;
