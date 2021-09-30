import React, { useState } from "react";
import ProjectsDropdown from "./ProjectsDropdown";
import { dataset } from "../data/dataset";
import { getCountries, getOrganizations } from "../services/datasetUtils";
import "./Filters.css";

const countries = getCountries();
const organizations = getOrganizations();

const Filters = ({ onProjectClick }) => {
  const [dropdown, setDropdown] = useState(null);
  const closeDropdown =
    (fn) =>
    (...args) => {
      setDropdown(false);
      fn(...args);
    };
  return (
    <>
      <ul className="dots-map__filters">
        <li>
          <ProjectsFilter onClick={() => setDropdown("projects")} />
        </li>
        <li>
          <CountriesFilter onClick={() => setDropdown("countries")} />
        </li>
        <li>
          <OrganizationsFilter onClick={() => setDropdown("organizations")} />
        </li>
      </ul>
      {dropdown && (
        <div className="dots-map__filters__dropdown-container">
          <DropdownSwitch
            dropdown={dropdown}
            onProjectClick={closeDropdown(onProjectClick)}
          />
        </div>
      )}
    </>
  );
};

export default Filters;

const ProjectsFilter = ({ onClick }) => (
  <button onClick={onClick}>
    Projects<Badge>{dataset.length}</Badge>
  </button>
);

const CountriesFilter = ({ onClick }) => (
  <button onClick={onClick}>
    Countries<Badge>{countries.length}</Badge>
  </button>
);

const OrganizationsFilter = ({ onClick }) => (
  <button onClick={onClick}>
    Clients<Badge>{organizations.length}</Badge>
  </button>
);

const Badge = ({ children }) => (
  <sup className="dots-map__filters__badge">{children}</sup>
);

const DropdownSwitch = ({ dropdown, onProjectClick }) => {
  switch (dropdown) {
    case "projects": {
      return <ProjectsDropdown onClick={onProjectClick} />;
    }
    default: {
      return <React.Fragment />;
    }
  }
};
