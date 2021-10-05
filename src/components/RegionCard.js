import React, { useMemo } from "react";
import { getProjectsByRegion } from "../services/datasetUtils";
import ProjectCard from "./ProjectCard";
import ProjectListCard from "./ProjectListCard";

const RegionCard = ({ region, onProjectClick, onClose, className }) => {
  const projects = useMemo(() => getProjectsByRegion(region), [region]);
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
      country={region}
      projects={projects}
      onProjectClick={onProjectClick}
      onClose={onClose}
    />
  );
};

export default RegionCard;
