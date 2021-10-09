import React, { useState } from "react";
import {
  getCountries,
  getOrganizations,
  getProjects,
} from "../services/datasetUtils";
import "./Categories.css";

const Categories = ({ selectedCategory, onCategoryClick }) => {
  const [projects] = useState(getProjects().length);
  const [countries] = useState(getCountries().length);
  const [partners] = useState(getOrganizations().length);
  return (
    <div className="dots-map__categories">
      <button
        className={
          selectedCategory === "project" ? "dots-map__categories--selected" : ""
        }
        onClick={
          selectedCategory === "project"
            ? () => {}
            : () => onCategoryClick("project")
        }
      >
        Projects ({projects})
      </button>
      <button
        className={
          selectedCategory === "country" ? "dots-map__categories--selected" : ""
        }
        onClick={
          selectedCategory === "country"
            ? () => {}
            : () => onCategoryClick("country")
        }
      >
        Countries ({countries})
      </button>
      <button
        className={
          selectedCategory === "organization"
            ? "dots-map__categories--selected"
            : ""
        }
        onClick={
          selectedCategory === "organization"
            ? () => {}
            : () => onCategoryClick("organization")
        }
      >
        Partners ({partners})
      </button>
    </div>
  );
};

export default Categories;
