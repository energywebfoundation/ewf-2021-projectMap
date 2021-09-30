import React from "react";
import "./List.css";

export const List = ({ children }) => (
  <ul className="dots-map__list">{children}</ul>
);

export const ListItem = ({ children, ...props }) => (
  <li {...props}>{children}</li>
);
