import React from "react";
import "./Backdrop.css";

const Backdrop = ({ onClick, className = "" }) => (
  <div className={"dots-map__backdrop " + className} onClick={onClick} />
);

export default Backdrop;
