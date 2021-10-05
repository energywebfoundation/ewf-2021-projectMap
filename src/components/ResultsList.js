import React from "react";
import CountryResult from "./CountryResult";
import { List, ListItem } from "./List";
import OrganizationResult from "./OrganizationResult";
import ProjectResult from "./ProjectResult";
import "./ResultsList.css";

const ResultsList = ({ results, onClick }) => (
  <div className="dots-map__results-list">
    <List>
      {results.map((result, index) => (
        <ListItem key={index}>
          <Result result={result} onClick={() => onClick(result)} />
        </ListItem>
      ))}
      {!results.length && (
        <ListItem>
          <NoResults />
        </ListItem>
      )}
    </List>
  </div>
);

export default ResultsList;

const Result = ({ result, onClick }) => {
  switch (result.category) {
    case "country":
    case "region": {
      return <CountryResult country={result.value} onClick={onClick} />;
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

const NoResults = () => (
  <span className="dots-map__results-list__no-results">No results</span>
);
