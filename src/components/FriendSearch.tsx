import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendSearch.css";

interface Props {
  setSearchTerm: (displayName: string) => void;
}

const FriendSearch = ({ setSearchTerm }: Props) => {
  const [searchFriend, setSearchFriend] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchFriend);
    setSearchFriend("");
    navigate(`/userResults?${new URLSearchParams({ searchFriend })}`);
  };

  return (
    <form className="FriendSearch" onSubmit={submitHandler}>
      <label htmlFor="friends">Find Friends</label>
      <input
        type="text"
        name="friends"
        id="friends"
        value={searchFriend}
        onChange={(e) => setSearchFriend(e.target.value)}
      />
      <button>Find Friend</button>
    </form>
  );
};

export default FriendSearch;
