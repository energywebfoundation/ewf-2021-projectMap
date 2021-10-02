import React from "react";
import Dropdown from "./Dropdown";
import GoToButton from "./GoToButton";
import Icon from "./Icon";
import { List, ListItem } from "./List";
import { getProjects } from "../services/datasetUtils";
import "./ProjectsDropdown.css";

const ProjectsDropdown = ({ onClick, anchor }) => (
  <Dropdown className="dots-map__projects-dropdown" anchor={anchor}>
    <List>
      {getProjects().map((project, index) => (
        <ListItem key={index} onClick={() => onClick(project)}>
          <ProjectEntry project={project} />
          <GoToButton />
        </ListItem>
      ))}
    </List>
  </Dropdown>
);

export default ProjectsDropdown;

const ProjectEntry = ({ project }) => (
  <div className="dots-map__projects-dropdown__project">
    <ProjectOrganizations projectOrganizations={project.organization} />
    <ProjectName projectName={project.projectName} />
    <ProjectLocations projectLocations={project.location} />
  </div>
);

const ProjectOrganizations = ({ projectOrganizations }) => (
  <span className="dots-map__projects-dropdown__project-organizations">
    {projectOrganizations}
  </span>
);

const ProjectName = ({ projectName }) => (
  <span className="dots-map__projects-dropdown__project-name">
    {projectName}
  </span>
);

const ProjectLocations = ({ projectLocations }) => (
  <ul className="dots-map__projects-dropdown__project-locations">
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
