import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onQuery }) => {
  const [query, setInternalQuery] = useState("");
  const setQuery = (q) => {
    setInternalQuery(q);
    onQuery(q);
  };
  return (
    <div
      className="dots-map__searchbar"
      onClick={(event) => event.stopPropagation()}
    >
      <img src={`${process.env.PUBLIC_URL}/search.png`} alt="search" />
      <input
        type="text"
        onChange={(event) => setQuery(event.target.value.toUpperCase())}
        value={query}
        placeholder="SEARCH"
      />
    </div>
  );
};

export default SearchBar;
