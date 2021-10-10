import React from "react";
import Icon from "./Icon";
import "./DragIndicator.css";

const DragIndicator = ({ isVisible }) => (
  <div
    className="dots-map__drag-indicator"
    style={{ display: isVisible ? undefined : "none" }}
  >
    <Icon name="../drag.png" alt="Drag to move around" />
    <span>Drag to move around</span>
  </div>
);

export default DragIndicator;
