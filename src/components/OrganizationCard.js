import React, { useMemo } from "react";
import { getProjectsByOrganization } from "../services/datasetUtils";
import ProjectCard from "./ProjectCard";
import ProjectListCard from "./ProjectListCard";

const OrganizationCard = ({
  organization,
  onProjectClick,
  onClose,
  className = "",
}) => {
  const projects = useMemo(
    () => getProjectsByOrganization(organization),
    [organization]
  );
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
      organization={organization}
      projects={projects}
      onProjectClick={onProjectClick}
      onClose={onClose}
      className={className}
    />
  );
};

export default OrganizationCard;
