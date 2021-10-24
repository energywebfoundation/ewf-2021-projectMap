import React from "react";
import "./Categories.css";

const Categories = ({
  selectedCategory,
  onCategoryClick,
  resultsCountPerCategory,
}) => (
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
      Projects ({resultsCountPerCategory.project})
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
      Countries (
      {resultsCountPerCategory.country + resultsCountPerCategory.region})
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
      Partners ({resultsCountPerCategory.organization})
    </button>
  </div>
);

export default Categories;
