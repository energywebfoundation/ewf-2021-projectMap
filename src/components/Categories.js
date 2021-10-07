import React, { useState } from "react";
import {
  getCountries,
  getOrganizations,
  getProjects,
} from "../services/datasetUtils";
import "./Categories.css";

const Categories = ({ selectedCategories, onToggleCategory }) => {
  const [projects] = useState(getProjects().length);
  const [countries] = useState(getCountries().length);
  const [partners] = useState(getOrganizations().length);
  return (
    <div className="dots-map__categories">
      <button
        className={
          selectedCategories.includes("project")
            ? "dots-map__categories--selected"
            : ""
        }
        onClick={() => onToggleCategory("project")}
      >
        Projects ({projects})
      </button>
      <button
        className={
          selectedCategories.includes("country")
            ? "dots-map__categories--selected"
            : ""
        }
        onClick={() => onToggleCategory("country")}
      >
        Countries ({countries})
      </button>
      <button
        className={
          selectedCategories.includes("organization")
            ? "dots-map__categories--selected"
            : ""
        }
        onClick={() => onToggleCategory("organization")}
      >
        Partners ({partners})
      </button>
    </div>
  );
};

export default Categories;
