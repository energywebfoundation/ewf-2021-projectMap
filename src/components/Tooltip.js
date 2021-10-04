import React, { useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getProjectsByCountry } from "../services/datasetUtils";
import "./Tooltip.css";

const Tooltip = ({ country, x, y }) => {
  const ref = useRef();
  const [margin, setMargin] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setMargin({ x: ref.current.clientWidth, y: ref.current.clientHeight });
  }, [ref]);
  return (
    <div
      className="dots-map__tooltip"
      style={{
        left: x - margin.x / 2,
        top: y - margin.y - 10,
      }}
      ref={ref}
    >
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/icons/${country}.png`}
          alt={country}
        />
        <span className="dots-map__tooltip__country-name">{country}</span>
      </div>
      <span className="dots-map__tooltip__projects-count">
        {getProjectsByCountry(country).length} Projects
      </span>
    </div>
  );
};

export default Tooltip;
