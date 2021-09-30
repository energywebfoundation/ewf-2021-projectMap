import React from "react";
import { dataset } from "../data/dataset";
import { getCountries, getOrganizations } from "../services/datasetUtils";
import "./Filters.css";

const countries = getCountries();
const organizations = getOrganizations();

const Filters = () => (
  <ul className="dots-map__filters">
    <li>
      <ProjectsFilter />
    </li>
    <li>
      <CountriesFilter />
    </li>
    <li>
      <OrganizationsFilter />
    </li>
  </ul>
);

export default Filters;

const ProjectsFilter = () => (
  <button>
    Projects<Badge>{dataset.length}</Badge>
  </button>
);

const CountriesFilter = () => (
  <button>
    Countries<Badge>{countries.length}</Badge>
  </button>
);

const OrganizationsFilter = () => (
  <button>
    Clients<Badge>{organizations.length}</Badge>
  </button>
);

const Badge = ({ children }) => (
  <sup className="dots-map__filters__badge">{children}</sup>
);
