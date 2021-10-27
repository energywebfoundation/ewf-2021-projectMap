import React, { useState } from "react";
import Icon from "./Icon";
import { getProjectsByRegion } from "../services/datasetUtils";
import { getRegionName } from "../services/regionsUtils";
import "./RegionResult.css";

const RegionResult = ({ region, onClick }) => {
  const [projects] = useState(getProjectsByRegion(region).length);
  return (
    <button
      className="dots-map__result dots-map__region-result"
      onClick={onClick}
    >
      <Icon name={`${region}.png`} alt={getRegionName(region)} />
      <span>{`${getRegionName(region)} (${projects})`}</span>
    </button>
  );
};

export default RegionResult;
