import React, { useState } from "react";
import Dropdown from "./Dropdown";
import { getCountries, getProjectsByCountry } from "../services/datasetUtils";
import "./CountriesDropdown.css";
import { List, ListItem } from "./List";
import Icon from "./Icon";

const CountriesDropdown = ({ anchor, onClick }) => {
  const [countries, setCountries] = useState(getCountries());
  const applyQuery = (query) =>
    setCountries(getCountries().filter(matchesQuery(query)));
  return (
    <Dropdown
      className="dots-map__countries-dropdown"
      anchor={anchor}
      onQuery={applyQuery}
    >
      <List>
        {countries.map((country) => (
          <ListItem key={country} onClick={() => onClick(country)}>
            <Country country={country} />
          </ListItem>
        ))}
      </List>
    </Dropdown>
  );
};

export default CountriesDropdown;

const Country = ({ country }) => (
  <button className="dots-map__countries-dropdown__country">
    <Icon name={`${country}.png`} alt={country} />
    <span>{`${country} (${getProjectsByCountry(country).length})`}</span>
  </button>
);

function matchesQuery(query) {
  return (country) =>
    country.toLowerCase().replace("_", "").indexOf(query.toLowerCase()) >= 0;
}
