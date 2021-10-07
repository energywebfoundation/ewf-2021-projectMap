import React, { useEffect, useState } from "react";
import {
  getCountries,
  getOrganizations,
  getProjects,
  getProjectTypes,
} from "../services/datasetUtils";
import { getMapEntry } from "../services/mapUtils";
import Filters from "./Filters";
import ResultsList from "./ResultsList";
import OpenResult from "./OpenResult";
import Backdrop from "./Backdrop";
import originalIsMobile from "ismobilejs";
import "./Sidebar.css";

const isMobile = () => originalIsMobile().any;

const Sidebar = ({ result, openResult, closeResult }) => {
  const [showResults, setShowResults] = useState(!isMobile());
  const [projectTypeSelection, setProjectTypeSelection] = useState(
    getProjectTypeInitialSelection()
  );
  const [selectedCategories, setSelectedCategory] = useState(
    isMobile() ? [] : ["project"]
  );
  const [query, setQuery] = useState("");
  const results = useResults(selectedCategories, query, projectTypeSelection);
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategory(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategory([...selectedCategories, category]);
    }
  };
  const toggleProjectTypeSelection = (projectType) =>
    setProjectTypeSelection({
      ...projectTypeSelection,
      [projectType]: !projectTypeSelection[projectType],
    });
  return (
    <div className="dots-map__sidebar">
      <Filters
        query={query}
        setQuery={(query) => {
          setQuery(query);
          setShowResults(!isMobile());
        }}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        projectTypeSelection={projectTypeSelection}
        toggleProjectTypeSelection={toggleProjectTypeSelection}
        onEnter={() => setShowResults(true)}
        enableBackButton={showResults && isMobile()}
        onBackClick={() => setShowResults(false)}
      />
      {(showResults || result) && (
        <div className="dots-map__sidebar__main-area">
          {showResults && (
            <ResultsList
              results={results}
              onClick={openResult}
              showCategoryTitles={isMobile() || !!query}
            />
          )}
          {!!result && <Backdrop onClick={closeResult} />}
          {!!result && (
            <div className="dots-map__sidebar__card-container dots-map--slideInFromBottom">
              <OpenResult
                result={result}
                onClose={closeResult}
                onProjectClick={(project) =>
                  openResult({ category: "project", value: project })
                }
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

function useResults(categories, query, projectTypeSelection) {
  const [allPossibleResults] = useState(getAllPossibleResults());
  const [results, setResults] = useState(
    getResults(allPossibleResults, categories, query, projectTypeSelection)
  );
  useEffect(() => {
    setResults(
      getResults(allPossibleResults, categories, query, projectTypeSelection)
    );
  }, [allPossibleResults, categories, query, projectTypeSelection]);
  return results;
}

function getAllPossibleResults() {
  return [
    ...getAllPossibleProjectsResults(),
    ...getAllPossibleCountriesResults(),
    ...getAllPossibleOrganizationsResults(),
  ];
}

function getAllPossibleProjectsResults() {
  return getProjects().map((project) => ({
    category: "project",
    value: project,
  }));
}

function getAllPossibleCountriesResults() {
  return getCountries().map((country) => {
    const mapEntry = getMapEntry(country);
    if (mapEntry) {
      return {
        category: "country",
        value: country,
      };
    } else {
      return {
        category: "region",
        value: country,
      };
    }
  });
}

function getAllPossibleOrganizationsResults() {
  return getOrganizations().map((organization) => ({
    category: "organization",
    value: organization,
  }));
}

function getResults(
  allPossibleResults,
  categories,
  query,
  projectTypeSelection
) {
  return allPossibleResults
    .filter(isCategory(categories))
    .filter(matchesQuery(query))
    .filter(isProjectTypeSelection(projectTypeSelection));
}

function isCategory(categories) {
  return !categories.length
    ? () => true
    : (result) =>
        categories.includes(result.category) ||
        (categories.includes("country") && result.category === "region");
}

function matchesQuery(query) {
  return (result) =>
    JSON.stringify(result).toLowerCase().indexOf(query.toLowerCase().trim()) >=
    0;
}

function getProjectTypeInitialSelection() {
  return getProjectTypes().reduce(
    (selection, projectType) => ({
      ...selection,
      [projectType]: true,
    }),
    {}
  );
}

function isProjectTypeSelection(projectTypeSelection) {
  const isProjectTypeSelected = (result) =>
    projectTypeSelection[(result.value.projectType || "").toLowerCase().trim()];
  return (result) =>
    !isCategory("project")(result) || isProjectTypeSelected(result);
}
