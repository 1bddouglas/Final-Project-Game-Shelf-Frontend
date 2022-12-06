import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { updateAccountDatabase } from "../services/accountAPIService";
import "./MyShelf.css";

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
      <ul>
        {account?.myShelf.map((game) => (
          <li key={game.id}>
            <p>{game.name}</p>
            <img src={game.images.medium} alt={game.name} />
            <button onClick={() => deleteHandler(game.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyShelf;
