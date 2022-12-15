import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateAccountDatabase } from "../services/accountAPIService";
import "./MyShelf.css";
import trash from "../assets/trash-icon.png";
import { Link } from "react-router-dom";

const MyShelf = () => {
  const { account, setAccount } = useContext(AuthContext);

  const deleteHandler = (id: string): void => {
    if (account) {
      const copyOfAccount = { ...account };
      const copyOfShelf = [...account.myShelf];
      const foundIndex = copyOfShelf.findIndex((game) => {
        return game.id === id;
      });
      copyOfAccount.myShelf = [
        ...copyOfShelf.slice(0, foundIndex),
        ...copyOfShelf.slice(foundIndex + 1),
      ];
      updateAccountDatabase(copyOfAccount).then((res) => {
        setAccount(res);
      });
    }
  };

  return (
    <div className="MyShelf">
      <h2>My Shelf</h2>
      <ul>
        {account?.myShelf.map((game) => (
          <li key={game.id}>
            <div className="my-shelf-box">
              <Link to={`/singleGame/${game.id}`}>
                <img src={game.images.medium} alt={game.name} />
              </Link>
              <p>{game.name}</p>
              <img
                className="trash"
                src={trash}
                alt="trash-icon"
                onClick={() => deleteHandler(game.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyShelf;
