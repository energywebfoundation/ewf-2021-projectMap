import React, { useState } from "react";
import Icon from "./Icon";
import "./CountryResult.css";
import { getProjectsByCountry } from "../services/datasetUtils";

const Country = ({ country, onClick }) => {
  const [projects] = useState(getProjectsByCountry(country).length);
  return (
    <button
      className="dots-map__result dots-map__project-country"
      onClick={onClick}
    >
      <Icon name={`${country}.png`} alt={country} />
      <span>{`${country} (${projects})`}</span>
    </button>
  );
};

export default Country;
