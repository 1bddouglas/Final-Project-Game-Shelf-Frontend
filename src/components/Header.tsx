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
      <Link to={"/"}>
        <h1>
          <img src={logo} alt="The Game Shelf" className="logo" />
        </h1>
        <img src="" onClick={() => navigate(-1)} />
      </Link>
      {user ? (
        <>
          <button className="sign-out" onClick={signOut}>
            Sign out
          </button>
          <p>{user.displayName}</p>
          {!!user.photoURL && (
            <p>
              <img src={user.photoURL} alt="" />
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
