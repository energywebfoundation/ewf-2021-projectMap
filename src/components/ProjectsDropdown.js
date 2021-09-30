import React from "react";
import Dropdown from "./Dropdown";
import GoToButton from "./GoToButton";
import { List, ListItem } from "./List";
import { dataset as projects } from "../data/dataset";
import "./ProjectsDropdown.css";

const ProjectsDropdown = ({ onClick }) => (
  <Dropdown className="dots-map__projects-dropdown">
    <List>
      {projects.map((project, index) => (
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
  <span className="dots-map__projects-dropdown__country">{country}</span>
);
