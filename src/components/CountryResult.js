import React, { useState } from "react";
import Icon from "./Icon";
import "./CountryResult.css";
import { getCountryName, getProjectsByCountry } from "../services/datasetUtils";

const Country = ({ country, onClick }) => {
  const [projects] = useState(getProjectsByCountry(country).length);
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
