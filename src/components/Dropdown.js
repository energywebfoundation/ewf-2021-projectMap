import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import "./Dropdown.css";

const Dropdown = ({ children, className = "", anchor, onQuery }) => {
  const [left, setLeft] = useState(undefined);
  const dropdownRef = useRef();
  useEffect(() => {
    if (anchor.current && dropdownRef.current) {
      const anchorLeft = anchor.current.getBoundingClientRect().left;
      const anchorParentLeft =
        anchor.current.parentElement.getBoundingClientRect().left;
      const left = anchorLeft - anchorParentLeft;
      setLeft(left);
    } else {
      setLeft(undefined);
    }
  }, [anchor, dropdownRef]);
  return (
    <div
      className={`dots-map__dropdown dots-map--slideIn ${className}`}
      ref={dropdownRef}
      style={{
        visibility: left != null ? "visible" : "hidden",
        left: `${left}px`,
      }}
    >
      <header>
        <SearchBar onQuery={onQuery} />
      </header>
      <div className="dots-map__dropdown-content">{children}</div>
    </div>
  );
};

export default Dropdown;
