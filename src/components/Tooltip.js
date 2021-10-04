import React, { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getProjectsByCountry } from "../services/datasetUtils";
import Icon from "./Icon";
import "./Tooltip.css";

const Tooltip = ({ country, x, y, onClick }) => {
  const ref = useRef();
  const [margin, setMargin] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setMargin({
      x: ref.current.clientWidth / 2,
      y: ref.current.clientHeight + 10,
    });
  }, [ref]);
  return (
    <div
      className="dots-map__tooltip"
      style={{
        left: x - margin.x,
        top: y - margin.y,
      }}
      ref={ref}
      onClick={onClick}
    >
      <div>
        <Icon name={`${country}.png`} alt={country} noStyle={true} />
        <span className="dots-map__tooltip__country-name">{country}</span>
      </div>
      <span className="dots-map__tooltip__projects-count">
        {getProjectsByCountry(country).length} Projects
      </span>
    </div>
  );
};

export default Tooltip;
