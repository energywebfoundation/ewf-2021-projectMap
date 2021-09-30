import React from "react";
import "./Dropdown.css";

const Dropdown = ({ children, className = "" }) => (
  <div className={`dots-map__dropdown ${className}`}>
    <div className="dots-map__dropdown-content">{children}</div>
  </div>
);

export default Dropdown;
