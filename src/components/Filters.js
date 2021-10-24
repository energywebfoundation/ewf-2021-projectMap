import React from "react";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import ProjectTypeFilter from "./ProjectTypeFilter";
import "./Filters.css";

const Filters = ({
  query,
  setQuery,
  selectedCategory,
  onCategoryClick,
  projectTypeSelection,
  toggleProjectTypeSelection,
  onEnter,
  enableBackButton,
  onBackClick,
  onProjectTypeFilterClear,
  resultsCountPerCategory,
}) => (
  <div className="dots-map__filters">
    <SearchBar
      query={query}
      setQuery={setQuery}
      onEnter={onEnter}
      enableBackButton={enableBackButton}
      onBackClick={onBackClick}
    />
    <Categories
      selectedCategory={selectedCategory}
      onCategoryClick={onCategoryClick}
      resultsCountPerCategory={resultsCountPerCategory}
    />
    <div
      style={{
        visibility: selectedCategory === "project" ? "visible" : "hidden",
      }}
    >
      <ProjectTypeFilter
        projectTypeSelection={projectTypeSelection}
        toggleProjectTypeSelection={toggleProjectTypeSelection}
        onClearAll={onProjectTypeFilterClear}
      />
    </div>
  </div>
);

export default Filters;
