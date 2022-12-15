import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateAccountDatabase } from "../services/accountAPIService";
import "./Wishlist.css";
import trash from "../assets/trash-icon.png";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { account, setAccount } = useContext(AuthContext);

  const deleteHandler = (id: string): void => {
    if (account) {
      const copyOfAccount = { ...account };
      const copyOfWishlist = [...account.wishlist];
      const foundIndex = copyOfWishlist.findIndex((game) => {
        return game.id === id;
      });
      copyOfAccount.wishlist = [
        ...copyOfWishlist.slice(0, foundIndex),
        ...copyOfWishlist.slice(foundIndex + 1),
      ];
      updateAccountDatabase(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };

  return (
    <div className="Wishlist">
      <h2>My Wishlist </h2>
      <ul>
        {account?.wishlist.map((game) => (
          <li key={game.id}>
            <div className="my-wishlist-box">
              <Link to={`/singleGame/${game.id}`}>
                <img src={game.images.small} alt={game.name} />
              </Link>
              <p>{game.name}</p>
              <img
                src={trash}
                alt=""
                onClick={() => deleteHandler(game.id)}
                className="trash"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
