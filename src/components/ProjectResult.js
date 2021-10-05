import React from "react";
import Icon from "./Icon";
import "./ProjectResult.css";

const ProjectResult = ({ project, onClick }) => (
  <div className="dots-map__result dots-map__project-result" onClick={onClick}>
    <ProjectOrganizations projectOrganizations={project.organization} />
    <ProjectName projectName={project.projectName} />
    <ProjectLocations projectLocations={project.location} />
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

const ProjectLocations = ({ projectLocations }) => (
  <ul className="dots-map__project-result__locations">
    {projectLocations.split(",").map((country) => (
      <li key={country}>
        <Country country={country.trim()} />
      </li>
    ))}
  </ul>
);

const Country = ({ country }) => (
  <div className="dots-map__projects-dropdown__country">
    <Icon name={`${country}.png`} alt={country} noStyle={true} />
    <span className="">{country}</span>
  </div>
);
