import React, { useMemo } from "react";
import { getProjectsByCountry } from "../services/datasetUtils";
import ProjectCard from "./ProjectCard";
import ProjectListCard from "./ProjectListCard";

const CountryCard = ({ country, onProjectClick, onClose, className }) => {
  const projects = useMemo(() => getProjectsByCountry(country), [country]);
  if (!projects.length) {
    return <React.Fragment />;
  }
  return projects.length === 1 ? (
    <ProjectCard
      project={projects[0]}
      onClose={onClose}
      className={className}
    />
  ) : (
    <ProjectListCard
      className={className}
      country={country}
      projects={projects}
      onProjectClick={onProjectClick}
      onClose={onClose}
    />
  );
};

export default CountryCard;
