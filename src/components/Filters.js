import React, { useState, useRef, useEffect } from "react";
import isMobile from "ismobilejs";
import ProjectsDropdown from "./ProjectsDropdown";
import CountriesDropdown from "./CountriesDropdown";
import OrganizationsDropdown from "./OrganizationsDropdown";
import {
  getProjects,
  getCountries,
  getOrganizations,
} from "../services/datasetUtils";
import "./Filters.css";

const Filters = ({
  onDropdownClick,
  onProjectClick,
  onCountryClick,
  onOrganizationClick,
}) => {
  const [dropdown, setDropdown] = useState(null);
  const projectsRef = useRef();
  const countriesRef = useRef();
  const organizationsRef = useRef();
  const closeDropdown =
    (fn) =>
    (...args) => {
      setDropdown(false);
      fn(...args);
    };
  useEffect(() => {
    document.body.addEventListener("click", ({ target }) => {
      if (document.querySelector(".dots-map__filters").contains(target)) {
        return;
      }
      setDropdown(false);
    });
  }, []);
  const openDropdown = (dropdown) => () => {
    onDropdownClick();
    setDropdown(dropdown);
  };
  const toggleDropdown = (clickedDropdown) => () => {
    onDropdownClick();
    setDropdown(clickedDropdown === dropdown ? null : clickedDropdown);
  };
  const noop = () => {};
  useEffect(() => {
    window.addEventListener("resize", () => {
      setDropdown(false);
    });
  }, []);
  return (
    <>
      <ul className="dots-map__filters">
        <li
          ref={projectsRef}
          className={
            dropdown === "projects" ? "dots-map__filter--highlighted" : ""
          }
        >
          <ProjectsFilter
            onMouseEnter={isMobile().any ? noop : openDropdown("projects")}
            onClick={
              isMobile().any
                ? toggleDropdown("projects")
                : () => setDropdown(null)
            }
          />
        </li>
        <li
          ref={countriesRef}
          className={
            dropdown === "countries" ? "dots-map__filter--highlighted" : ""
          }
        >
          <CountriesFilter
            onMouseEnter={isMobile().any ? noop : openDropdown("countries")}
            onClick={
              isMobile().any
                ? toggleDropdown("countries")
                : () => setDropdown(null)
            }
          />
        </li>
        <li
          ref={organizationsRef}
          className={
            dropdown === "organizations" ? "dots-map__filter--highlighted" : ""
          }
        >
          <OrganizationsFilter
            onMouseEnter={isMobile().any ? noop : openDropdown("organizations")}
            onClick={
              isMobile().any
                ? toggleDropdown("organizations")
                : () => setDropdown(null)
            }
          />
        </li>
      </ul>
      {dropdown && (
        <div className="dots-map__filters__dropdown-container">
          <DropdownSwitch
            dropdown={dropdown}
            onProjectClick={closeDropdown(onProjectClick)}
            onCountryClick={closeDropdown(onCountryClick)}
            onOrganizationClick={closeDropdown(onOrganizationClick)}
            projectsRef={projectsRef}
            countriesRef={countriesRef}
            organizationsRef={organizationsRef}
          />
        </div>
      )}
    </>
  );
};

export default Filters;

const ProjectsFilter = ({ ...props }) => (
  <button {...props}>
    Projects<Badge>{getProjects().length}</Badge>
  </button>
);

const CountriesFilter = ({ ...props }) => (
  <button {...props}>
    Countries<Badge>{getCountries().length}</Badge>
  </button>
);

const OrganizationsFilter = ({ ...props }) => (
  <button {...props}>
    Partners<Badge>{getOrganizations().length}</Badge>
  </button>
);

const Badge = ({ children }) => (
  <sup className="dots-map__filters__badge">{children}</sup>
);

const DropdownSwitch = ({
  dropdown,
  onProjectClick,
  onCountryClick,
  onOrganizationClick,
  projectsRef,
  countriesRef,
  organizationsRef,
}) => {
  switch (dropdown) {
    case "projects": {
      return <ProjectsDropdown onClick={onProjectClick} anchor={projectsRef} />;
    }
    case "countries": {
      return (
        <CountriesDropdown onClick={onCountryClick} anchor={countriesRef} />
      );
    }
    case "organizations": {
      return (
        <OrganizationsDropdown
          onClick={onOrganizationClick}
          anchor={organizationsRef}
        />
      );
    }
    default: {
      return <React.Fragment />;
    }
  }
};
