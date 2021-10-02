import React from "react";
import Dropdown from "./Dropdown";
import { getCountries, getProjectsByCountry } from "../services/datasetUtils";
import "./CountriesDropdown.css";
import { List, ListItem } from "./List";
import Icon from "./Icon";

const CountriesDropdown = ({ anchor, onClick }) => (
  <Dropdown className="dots-map__countries-dropdown" anchor={anchor}>
    <List>
      {getCountries().map((country) => (
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
    <Icon name={`${country}.png`} alt={country} />
    <span>{`${country} (${getProjectsByCountry(country).length})`}</span>
  </button>
);
