import React from "react";
import Dropdown from "./Dropdown";
import { List, ListItem } from "./List";
import {
  getOrganizations,
  getProjectsByOrganization,
} from "../services/datasetUtils";
import { getOrganizationProfile } from "../services/organizationProfilesUtils";
import "./OrganizationsDropdown.css";
import { RoundedButton } from "./RoundedButton";

const OrganizationsDropdown = ({ onClick, anchor }) => (
  <Dropdown className="dots-map__organizations-dropdown" anchor={anchor}>
    <List>
      {getOrganizations().map((organization) => (
        <ListItem key={organization}>
          <Organization
            organization={organization}
            onClick={() => onClick(organization)}
          />
        </ListItem>
      ))}
    </List>
  </Dropdown>
);

export default OrganizationsDropdown;

const Organization = ({ organization, onClick }) => {
  const organizationProfile = getOrganizationProfile(organization) || {};
  return (
    <article className="dots-map__organizations-dropdown__organization">
      <OrganizationName
        organizationName={organizationProfile.name || organization}
      />
      <OrganizationDescription
        organizationDescription={organizationProfile.description}
      />
      <ViewProjects
        onClick={onClick}
        projectsCount={getProjectsByOrganization(organization).length}
      />
    </article>
  );
};

const OrganizationName = ({ organizationName }) => (
  <span className="dots-map__organizations-dropdown__organization-name">
    {organizationName}
  </span>
);

const ViewProjects = ({ onClick, projectsCount }) => (
  <RoundedButton
    className="dots-map__organizations-dropdown__view-projects"
    onClick={onClick}
  >
    View projects ({projectsCount})
  </RoundedButton>
);

const OrganizationDescription = ({ organizationDescription = "" }) => (
  <p className="dots-map__organizations-dropdown__organization-description">
    {organizationDescription}
  </p>
);
