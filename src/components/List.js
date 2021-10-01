import React from "react";
import "./List.css";

export const List = ({ children }) => (
  <ul className="dots-map__list">{children}</ul>
);

export const ListItem = ({ children, onClick = () => {}, ...props }) => (
  <li
    onClick={(event) => {
      event.stopPropagation();
      onClick(event);
    }}
    {...props}
  >
    {children}
  </li>
);
