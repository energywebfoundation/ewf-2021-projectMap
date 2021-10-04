import React from "react";
import Icon from "./Icon";
import "./DragIndicator.css";

const DragIndicator = () => (
  <div className="dots-map__drag-indicator">
    <Icon name="../drag.png" alt="Drag to move around" />
    <span>Drag to move around</span>
  </div>
);

export default DragIndicator;
