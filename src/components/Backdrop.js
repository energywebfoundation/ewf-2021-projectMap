import React from "react";
import "./Backdrop.css";

const Backdrop = ({ onClick }) => (
  <div className="dots-map__backdrop" onClick={onClick} />
);

export default Backdrop;
