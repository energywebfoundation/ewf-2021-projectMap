import React from "react";
import Card from "./Card";
import { List, ListItem } from "./List";
import GoToButton from "./GoToButton";
import { getProjectTypeName } from "../services/datasetUtils";
import "./ProjectListCard.css";

const ProjectListCard = ({
  country,
  organization,
  projects,
  onProjectClick,
  onClose,
  className,
}) => (
  <Card
    className={className}
    country={country}
    organization={organization}
    title={`${projects.length} Projects`}
    sections={[
      <ProjectListCardContent
        projects={projects}
        onProjectClick={onProjectClick}
      />,
    ]}
    onClose={onClose}
  />
);

export default ProjectListCard;

const ProjectListCardContent = ({ projects, onProjectClick }) => (
  <div className="dots-map__project-list-card">
    <List>
      {projects.map((project, index) => (
        <ListItem key={index} onClick={() => onProjectClick(project)}>
          <ProjectListEntry project={project} />
          <GoToButton />
        </ListItem>
      ))}
    </List>
  </div>
);

const ProjectListEntry = ({ project }) => (
  <div>
    <ProjectType projectType={project.projectType} />
    <ProjectName projectName={project.projectName} />
    <ProjectOrganization projectOrganization={project.organization} />
  </div>
);

const ProjectType = ({ projectType }) => (
  <span className="dots-map__project-list__project-type">
    {getProjectTypeName(projectType)}
  </span>
);

const ProjectName = ({ projectName }) => (
  <span className="dots-map__project-list__project-name">{projectName}</span>
);

const ProjectOrganization = ({ projectOrganization }) => (
  <span className="dots-map__project-list__project-organization">
    {projectOrganization}
  </span>
);
