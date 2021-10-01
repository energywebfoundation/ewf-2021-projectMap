import React from "react";
import "./RoundedButton.css";

export const RoundedButton = ({ children, className = "", ...props }) => (
  <button className={`dots-map__rounded-button ${className}`} {...props}>
    <span>{children}</span>
  </button>
);

export const RoundedLink = ({ children, className = "", ...props }) => (
  <a className={`dots-map__rounded-button ${className}`} {...props}>
    <span>{children}</span>
  </a>
);
