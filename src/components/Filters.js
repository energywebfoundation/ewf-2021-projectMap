import React from "react";
import { dataset } from "../data/dataset";
import { getCountries, getOrganizations } from "../services/datasetUtils";

const countries = getCountries();
const organizations = getOrganizations();

const Filters = () => (
  <ul
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      alignItems: "center",
      columnGap: 50,
      fontSize: 18,
      color: "var(--main-color)",
      fontWeight: "bold",
    }}
  >
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
  <sup
    style={{
      fontSize: 10,
      display: "inline-block",
      marginLeft: 5,
    }}
  >
    {children}
  </sup>
);
