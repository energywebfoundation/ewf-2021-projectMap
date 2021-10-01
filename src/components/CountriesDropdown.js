import React from "react";
import Dropdown from "./Dropdown";
import { getCountries, getProjectsByCountry } from "../services/datasetUtils";
import "./CountriesDropdown.css";
import { List, ListItem } from "./List";

const countries = getCountries();

const CountriesDropdown = ({ anchor, onClick }) => (
  <Dropdown className="dots-map__countries-dropdown" anchor={anchor}>
    <List>
      {countries.map((country) => (
        <ListItem key={country} onClick={() => onClick(country)}>
          <Country country={country} />
        </ListItem>
      ))}
    </List>
  </Dropdown>
);

export default CountriesDropdown;

const Country = ({ country }) => (
  <button className="dots-map__countries-dropdown__country">
    {`${country} (${getProjectsByCountry(country).length})`}
  </button>
);
