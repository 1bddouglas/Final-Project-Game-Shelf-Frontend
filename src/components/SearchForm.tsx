import { FormEvent, useState } from "react";
import "./SearchForm.css";

interface Props {
  setSearchTerm: (name: string) => void;
}

const SearchForm = ({ setSearchTerm }: Props) => {
  const [search, setSearch] = useState("");
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSearchTerm(search);
    setSearch("");
  };
  return (
    <form className="SearchForm" onSubmit={submitHandler}>
      <input
        type="text"
        name="search"
        id="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>Search</button>
    </form>
  );
};

export default SearchForm;