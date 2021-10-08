import React from "react";
import "./ProjectResult.css";

const ProjectResult = ({ project, onClick }) => (
  <div className="dots-map__result dots-map__project-result" onClick={onClick}>
    <ProjectTypes
      projectTypes={(project.projectType || "")
        .split(",")
        .map((projectType) => projectType.toLowerCase().trim())}
    />
    <ProjectName projectName={project.projectName} />
    <ProjectOrganizations projectOrganizations={project.organization} />
  </div>
);

export default ProjectResult;

const ProjectOrganizations = ({ projectOrganizations }) => (
  <span className="dots-map__project-result__organizations">
    {projectOrganizations}
  </span>
);

const ProjectName = ({ projectName }) => (
  <span className="dots-map__project-result__name">{projectName}</span>
);

const ProjectTypes = ({ projectTypes }) => (
  <ul className="dots-map__project-result__project-types">
    {projectTypes.map((projectType) => (
      <li key={projectType}>{projectType}</li>
    ))}
  </ul>
);
