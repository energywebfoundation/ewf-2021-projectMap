import React, { useMemo } from "react";
import { dataset } from "../data/dataset";
import ProjectCard from "./ProjectCard";
import ProjectListCard from "./ProjectListCard";

const CountryCard = ({ country, onProjectClick }) => {
  const projects = useMemo(() => getProjects(country), [country]);
  if (!projects.length) {
    return <React.Fragment />;
  }
  return projects.length === 1 ? (
    <ProjectCard project={projects[0]} />
  ) : (
    <ProjectListCard
      country={country}
      projects={projects}
      onProjectClick={onProjectClick}
    />
  );
};

export default CountryCard;

function getProjects(country) {
  return dataset.filter((project) =>
    project.location
      .split(",")
      .map((c) => c.trim().toLowerCase())
      .includes(country.toLowerCase())
  );
}
