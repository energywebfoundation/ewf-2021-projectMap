import React from "react";
import Card from "./Card";
import "./ProjectListCard.css";

const ProjectListCard = ({ country, projects, onProjectClick }) => (
  <Card
    country={country}
    title={`${projects.length} Projects`}
    body={
      <ProjectListCardContent
        projects={projects}
        onProjectClick={onProjectClick}
      />
    }
  />
);

export default ProjectListCard;

const ProjectListCardContent = ({ projects, onProjectClick }) => (
  <ul className="dots-map__projects-list">
    {projects.map((project, index) => (
      <li key={index} onClick={() => onProjectClick(project)}>
        <ProjectListEntry project={project} />
        <GoToButton />
      </li>
    ))}
  </ul>
);

const ProjectListEntry = ({ project }) => (
  <div>
    <ProjectType projectType={project.projectType} />
    <ProjectName projectName={project.projectName} />
    <ProjectOrganization projectOrganization={project.organization} />
  </div>
);

const GoToButton = () => (
  <div>
    <button className="dots-map__project-list__go-to-button" onClick={() => {}}>
      <span>&rarr;</span>
    </button>
  </div>
);

const ProjectType = ({ projectType }) => (
  <span className="dots-map__project-list__project-type">{projectType}</span>
);

const ProjectName = ({ projectName }) => (
  <span className="dots-map__project-list__project-name">{projectName}</span>
);

const ProjectOrganization = ({ projectOrganization }) => (
  <span className="dots-map__project-list__project-organization">
    {projectOrganization}
  </span>
);
