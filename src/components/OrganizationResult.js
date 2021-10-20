import React from "react";
import { getProjectsByOrganization } from "../services/datasetUtils";
import {
  getOrganizationProfile,
  getOrganizationCountries,
} from "../services/organizationProfilesUtils";
import Icon from "./Icon";
import { RoundedButton } from "./RoundedButton";
import "./OrganizationResult.css";

const OrganizationResult = ({ organization, onClick }) => {
  const organizationProfile = getOrganizationProfile(organization) || {};
  return (
    <div className="dots-map__result dots-map__organization-result">
      <header>
        <div className="dots-map__organization-name-and-logo">
          <div>
            <Icon
              name={organizationProfile.logo}
              alt={organizationProfile.name}
            />
          </div>
          <OrganizationName
            organizationName={
              organizationProfile.acronym
                ? `(${organizationProfile.acronym}) ${organizationProfile.name}`
                : organizationProfile.name || organization
            }
          />
        </div>  
        <OrganizationCountries
          countries={getOrganizationCountries(organization)}
        />
      </header>
      <OrganizationDescription
        organizationDescription={organizationProfile.description}
      />
      <ViewProjects
        projectsCount={getProjectsByOrganization(organization).length}
        onClick={onClick}
      />
    </div>
  );
};

export default OrganizationResult;
const OrganizationName = ({ organizationName }) => (
  <span className="dots-map__organization-resultname">{organizationName}</span>
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
  <p className="dots-map__organization-resultdescription">
    {organizationDescription}
  </p>
);

const OrganizationCountries = ({ countries: [country] }) => {
  if (!country) {
    return <React.Fragment />;
  }
  return (
    <div className="dots-map__organization-resultcountries">
      <Icon name={`${country}.png`} alt={country} noStyle={true} />
      <span>{country}</span>
    </div>
  );
};
