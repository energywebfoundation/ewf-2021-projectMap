import React, { useEffect, useState } from "react";
import {
  getCountries,
  getOrganizations,
  getProjects,
  getProjectTypes,
  getProjectsByRegion,
} from "../services/datasetUtils";
import {
  getCountriesByRegion,
  getMapEntry,
  getRegions,
} from "../services/mapUtils";
import Filters from "./Filters";
import ResultsList from "./ResultsList";
import OpenResult from "./OpenResult";
import Backdrop from "./Backdrop";
import originalIsMobile from "ismobilejs";
import "./Sidebar.css";

const isMobile = () => originalIsMobile().any;

const Sidebar = ({ result, openResult, closeResult }) => {
  const [displayedResult, setDisplayedResult] = useState(undefined);
  const [showResults, setShowResults] = useState(!isMobile());
  const [projectTypeSelection, setProjectTypeSelection] = useState(
    getProjectTypeInitialSelection()
  );
  const [selectedCategory, setSelectedCategory] = useState("project");
  const [query, setQuery] = useState("");
  const [allPossibleResults] = useState(getAllPossibleResults());
  const results = useResults(
    selectedCategory,
    query,
    projectTypeSelection,
    allPossibleResults
  );
  const toggleProjectTypeSelection = (projectType) =>
    setProjectTypeSelection({
      ...projectTypeSelection,
      [projectType]: !projectTypeSelection[projectType],
    });
  useEffect(() => {
    setDisplayedResult((prevDisplayedResult) => {
      if (prevDisplayedResult) {
        setDisplayedResult({
          ...prevDisplayedResult,
          leave: true,
        });
        setTimeout(() => setDisplayedResult(result), 500);
      } else {
        setDisplayedResult(result);
      }
    });
  }, [result]);
  const cardContainerClassName = useCardContainerClassName(displayedResult);
  const backdropClassName = useBackdropClassName(displayedResult);
  const onCategoryClick = (category) => {
    setSelectedCategory(category);
    if (isMobile()) {
      setShowResults(true);
    }
  };
  const resultsCountPerCategory =
    useResultsCountPerCategory(allPossibleResults);
  return (
    <div className="dots-map__sidebar">
      <Filters
        resultsCountPerCategory={resultsCountPerCategory}
        query={query}
        setQuery={(query) => {
          setQuery(query);
          setShowResults(!isMobile());
          closeResult();
        }}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
        projectTypeSelection={projectTypeSelection}
        toggleProjectTypeSelection={toggleProjectTypeSelection}
        onProjectTypeFilterClear={() =>
          setProjectTypeSelection(getProjectTypeInitialSelection())
        }
        onEnter={() => setShowResults(true)}
        enableBackButton={showResults && isMobile()}
        onBackClick={() => setShowResults(false)}
      />
      {(showResults || displayedResult) && (
        <div className="dots-map__sidebar__main-area">
          {showResults && (
            <ResultsList
              results={results}
              onClick={openResult}
              showCategoryTitles={isMobile() || !!query}
            />
          )}
          {!!displayedResult && (
            <>
              <Backdrop onClick={closeResult} className={backdropClassName} />
              <div className={cardContainerClassName}>
                <OpenResult
                  result={displayedResult}
                  onClose={closeResult}
                  onProjectClick={(project) =>
                    openResult({ category: "project", value: project })
                  }
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;

function useCardContainerClassName(displayedResult) {
  let className = "dots-map__sidebar__card-container ";
  if (!displayedResult) {
    return className;
  }
  if (displayedResult.leave) {
    className += isMobile()
      ? "dots-map--slideOutToRight"
      : "dots-map--slideOutToBottom";
  } else {
    className += isMobile()
      ? "dots-map--slideInFromLeft"
      : "dots-map--slideInFromBottom";
  }
  return className;
}

function useBackdropClassName(displayedResult) {
  if (!displayedResult) {
    return "";
  }
  return displayedResult.leave ? "dots-map--fadeOut" : "dots-map--fadeIn";
}

function useResults(category, query, projectTypeSelection, allPossibleResults) {
  const [results, setResults] = useState(
    getResults(allPossibleResults, category, query, projectTypeSelection)
  );
  useEffect(() => {
    setResults(
      getResults(allPossibleResults, category, query, projectTypeSelection)
    );
  }, [allPossibleResults, category, query, projectTypeSelection]);
  return results;
}

function getAllPossibleResults() {
  return [
    ...getAllPossibleProjectsResults(),
    ...getAllPossibleRegionResults(),
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

function getAllPossibleRegionResults() {
  return [
    {
      category: "region",
      value: "global",
    },
    ...getRegions()
      .filter((region) => getCountriesByRegion(region).length > 1)
      .filter((region) => getProjectsByRegion(region).length > 0)
      .map((region) => ({
        category: "region",
        value: region,
      }))
      .sort(sortByValue),
  ];
}

function getAllPossibleCountriesResults() {
  const isDefined = (x) => !!x;
  return getCountries()
    .map(getMapEntry)
    .filter(isDefined)
    .map((country) => ({
      category: "country",
      value: country.id,
    }))
    .sort(sortByValue);
}

function sortByValue({ value: valueA }, { value: valueB }) {
  return valueA.localeCompare(valueB);
}

function getAllPossibleOrganizationsResults() {
  return getOrganizations().map((organization) => ({
    category: "organization",
    value: organization,
  }));
}

function getResults(allPossibleResults, category, query, projectTypeSelection) {
  return allPossibleResults
    .filter(isCategory(category))
    .filter(matchesQuery(query))
    .filter(isProjectTypeSelection(projectTypeSelection));
}

function isCategory(category) {
  return !category
    ? () => true
    : (result) =>
        result.category === category ||
        (category === "country" && result.category === "region");
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
    !result.value.projectType ||
    projectTypeSelection[(result.value.projectType || "").toLowerCase().trim()];
  return (result) =>
    !isCategory("project")(result) || isProjectTypeSelected(result);
}

function useResultsCountPerCategory(allPossibleResults) {
  const [resultsCountPerCategory] = useState(
    allPossibleResults.reduce(
      (resultsCountPerCategory, result) => ({
        ...resultsCountPerCategory,
        [result.category]: (resultsCountPerCategory[result.category] || 0) + 1,
      }),
      {}
    )
  );
  return resultsCountPerCategory;
}
