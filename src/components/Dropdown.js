import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import "./Dropdown.css";

const Dropdown = ({
  children,
  className = "",
  anchor,
  anchorTo = "left",
  onQuery,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef();
  useEffect(() => {
    if (anchor.current && dropdownRef.current) {
      const { left, top, height, width } =
        anchor.current.getBoundingClientRect();
      setPosition({
        left:
          anchorTo === "left"
            ? left
            : left - dropdownRef.current.clientWidth + width,
        top: top + height / 2 + 25,
      });
    } else {
      setPosition(undefined);
    }
  }, [anchor, anchorTo, dropdownRef]);
  return (
    <div
      className={`dots-map__dropdown dots-map--slideIn ${
        anchorTo === "right" ? "dots-map__dropdown--right" : ""
      } ${className}`}
      ref={dropdownRef}
      style={{
        visibility: position.top != null ? "visible" : "hidden",
        left: `${position.left}px`,
        top: `${position.top}px`,
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
