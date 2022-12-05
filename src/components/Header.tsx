import "./Header.css";
import logo from "../assets/print_transparent.svg";
import { Link, useNavigate } from "react-router-dom";
import backArrow from "../assets/back-arrow.png";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="Header">
      <Link to={"/"}>
        <h1>
          <img src={logo} alt="The Game Shelf" className="logo" />
        </h1>
        <img src="" onClick={() => navigate(-1)} />
      </Link>
      {/* TODO {<div></div>} */}
    </header>
  );
};

export default Header;
