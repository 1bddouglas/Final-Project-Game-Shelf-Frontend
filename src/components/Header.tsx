import "./Header.css";
import logo from "../assets/print_transparent.svg";

const Header = () => {
  return (
    <header className="Header">
      <h1>
        <img src={logo} alt="The Game Shelf" className="logo" />
      </h1>
      {/* TODO {<div></div>} */}
    </header>
  );
};

export default Header;
