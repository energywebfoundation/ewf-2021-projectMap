import React from "react";
import CountryResult from "./CountryResult";
import RegionResult from "./RegionResult";
import { List, ListItem } from "./List";
import OrganizationResult from "./OrganizationResult";
import ProjectResult from "./ProjectResult";
import isMobile from "ismobilejs";
import "./ResultsList.css";

const ResultsList = ({ results, showCategoryTitles, onClick }) => {
  const resultsByCategory = useResultsByCategory(results);
  return (
    <div
      className={`dots-map__results-list ${
        isMobile().any ? "dots-map--slideIn" : ""
      }`}
    >
      {resultsByCategory.map((categoryResults) => (
        <CategoryResults
          key={categoryResults.category}
          categoryResults={categoryResults}
          isMultiCategory={showCategoryTitles || resultsByCategory.length > 1}
          onClick={onClick}
        />
      ))}
      {!results.length && <NoResults />}
    </div>
  );
};

export default ResultsList;

const CategoryResults = ({ categoryResults, isMultiCategory, onClick }) => (
  <section className="dots-map__results-list__category-results">
    {isMultiCategory && <CategoryHeader categoryResults={categoryResults} />}
    <List>
      {categoryResults.results.map((result, index) => (
        <ListItem key={index}>
          <Result result={result} onClick={() => onClick(result)} />
        </ListItem>
      ))}
    </List>
  </section>
);

const CategoryHeader = ({ categoryResults }) => {
  const readableCategory = useReadableCategory(
    categoryResults.category,
    categoryResults.results.length > 1
  );
  return (
    <h3 className="dots-map__results-list__results-count">
      {categoryResults.results.length} {readableCategory}
    </h3>
  );
};

const NoResults = () => (
  <span className="dots-map__results-list__no-results">No results</span>
);

const Result = ({ result, onClick }) => {
  switch (result.category) {
    case "country": {
      return <CountryResult country={result.value} onClick={onClick} />;
    }
    case "region": {
      return <RegionResult region={result.value} onClick={onClick} />;
    }
    case "organization": {
      return (
        <OrganizationResult organization={result.value} onClick={onClick} />
      );
    }
    default: {
      return <ProjectResult project={result.value} onClick={onClick} />;
    }
  }
};

function useReadableCategory(category, isPlural) {
  if (!isPlural) {
    return category;
  }
  switch (category) {
    case "country": {
      return "countries";
    }
    default: {
      return category + "s";
    }
  }
}

function useResultsByCategory(results) {
  const resultsByCategory = results.reduce(
    (resultsByCategory, result) => ({
      ...resultsByCategory,
      [result.category]: {
        category: result.category,
        results: [
          ...(resultsByCategory[result.category] || { results: [] }).results,
          result,
        ],
      },
    }),
    {}
  );
  return Object.values(resultsByCategory);
}
