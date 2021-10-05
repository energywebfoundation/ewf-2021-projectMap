import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  query,
  setQuery,
  onEnter,
  enableBackButton,
  onBackClick,
}) => (
  <div className="dots-map__searchbar">
    <div className="dots-map__searchbar__adornment">
      {!enableBackButton && (
        <img src={`${process.env.PUBLIC_URL}/search.png`} alt="search" />
      )}
      {enableBackButton && (
        <button
          className="dots-map__searchbar__back"
          onClick={() => onBackClick()}
        >
          <img src={`${process.env.PUBLIC_URL}/left-arrow.png`} alt="back" />
        </button>
      )}
    </div>
    <input
      type="text"
      onChange={(event) => setQuery(event.target.value.toUpperCase())}
      value={query}
      placeholder="SEARCH"
      onKeyPress={(event) => {
        if (event.key !== "Enter") {
          return;
        }
        event.preventDefault();
        onEnter();
      }}
    />
  </div>
);

export default SearchBar;
