import React from "react";
import CountryCard from "./CountryCard";
import RegionCard from "./RegionCard";
import OrganizationCard from "./OrganizationCard";
import ProjectCard from "./ProjectCard";

const OpenResult = ({ result, onClose, onProjectClick }) => {
  if (!result) {
    return <React.Fragment />;
  }
  switch (result.category) {
    case "country": {
      return (
        <CountryCard
          country={result.value}
          onClose={onClose}
          onProjectClick={onProjectClick}
        />
      );
    }
    case "region": {
      return (
        <RegionCard
          region={result.value}
          onClose={onClose}
          onProjectClick={onProjectClick}
        />
      );
    }
    case "organization": {
      return (
        <OrganizationCard
          organization={result.value}
          onClose={onClose}
          onProjectClick={onProjectClick}
        />
      );
    }
    default: {
      return <ProjectCard project={result.value} onClose={onClose} />;
    }
  }
};

export default OpenResult;
