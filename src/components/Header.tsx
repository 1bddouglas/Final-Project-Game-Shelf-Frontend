import "./Header.css";
import logo from "../assets/print_transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <img
        src={backArrow}
        className="back-arrow"
        onClick={() => navigate(-1)}
      />

      <h1>
        <Link to={"/"}>
          <img src={logo} alt="The Game Shelf" className="logo" />
        </Link>
      </h1>

      {user ? (
        <>
          <button className="sign-out" onClick={signOut}>
            Sign out
          </button>
          <Link to={`/profile/${user.uid}`}>
            <p>{user.displayName}</p>
          </Link>

          {!!user.photoURL && (
            <p>
              <Link to={`/profile/${user.uid}`}>
                <img src={user.photoURL} alt="" />
              </Link>
            </p>
          )}
        </>
      ) : (
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign in
        </button>
      )}
      {/* TODO {<div></div>} */}
    </header>
  );
};

export default Header;
