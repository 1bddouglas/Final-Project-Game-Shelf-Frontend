import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateAccountDatabase } from "../services/accountAPIService";
import "./Wishlist.css";

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
      <ul>
        {account?.wishlist.map((game) => (
          <li key={game.id}>
            <p>{game.name}</p>
            <img src={game.images.small} alt={game.name} />
            <button onClick={() => deleteHandler(game.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
