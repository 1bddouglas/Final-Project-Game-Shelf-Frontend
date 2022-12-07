import { FormEvent, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import AuthContextProvider from "../context/AuthContextProvider";
import Account from "../models/Account";
import "./FriendSearch.css";

interface Props {
  setSearchTerm: (displayName: string) => void;
}

const FriendSearch = ({ setSearchTerm }: Props) => {
  const [searchFriend, setSearchFriend] = useState("");
  // const account: Account = useContext(AuthContext)
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchFriend);
    setSearchFriend("");
  };

  return (
    <form className="FriendSearch" onSubmit={submitHandler}>
      <label htmlFor="friends">find friends</label>
      <input
        type="text"
        name="friends"
        id="friends"
        value={searchFriend}
        onChange={(e) => setSearchFriend(e.target.value)}
      />
      <button>Find friend</button>
    </form>
  );
};

export default FriendSearch;
