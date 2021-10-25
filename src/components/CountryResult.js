import React, { useState } from "react";
import Icon from "./Icon";
import "./CountryResult.css";
import {
  getProjectsByCountry,
  getCountryName,
  getProjectsByRegion,
} from "../services/datasetUtils";
import { isRegion } from "../services/regionsUtils";

const Country = ({ country, onClick }) => {
  const [projects] = useState(
    isRegion(country)
      ? getProjectsByRegion(country).length
      : getProjectsByCountry(country).length
  );
  return (
    <button
      className="dots-map__result dots-map__project-country"
      onClick={onClick}
    >
      <Icon name={`${country}.png`} alt={getCountryName(country)} />
      <span>{`${getCountryName(country)} (${projects})`}</span>
    </button>
  );
};

export default Country;
