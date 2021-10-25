import getDataset from "../data/dataset";
import unique, { uniqueByField } from "./unique";
import buildMemo from "./memo";
import { getRegionByName } from "./regionsUtils";

export function getProjects() {
  return getDataset().sort(sortProjects);
}

export function getCountries() {
  return unique(
    getDataset()
      .flatMap(({ location }) => location.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
      .filter((x) => !!x)
      .sort((a, b) => a.localeCompare(b))
  );
}

export function getOrganizations() {
  return unique(
    getDataset()
      .flatMap(({ organization }) => organization.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
      .sort((a, b) => a.localeCompare(b))
  );
}

export function getProjectCountries(project) {
  return project.location
    .split(",")
    .map((country) => country.trim())
    .map((country) => country.toLowerCase())
    .sort((a, b) => a.localeCompare(b));
}

export const getProjectsByCountry = buildMemo((country) => {
  return getDataset()
    .filter((project) =>
      getProjectCountries(project).includes(
        country.toLowerCase().trim().replace(/_/g, " ")
      )
    )
    .sort(sortProjects);
});

export function getProjectsByOrganization(org) {
  return getDataset()
    .filter(
      ({ organization }) =>
        organization.toLowerCase().indexOf(org.toLowerCase()) >= 0
    )
    .sort(sortProjects);
}

function sortProjects(a, b) {
  return a.projectName.localeCompare(b.projectName);
}

export function isCountryInProjects(country) {
  return getProjectsByCountry(country).length > 0;
}

export function getOrganizationCountries(organization) {
  return getProjectsByOrganization(organization)
    .map((project) => project.location)
    .flatMap((location) => location.split(","))
    .map((location) => location.trim())
    .map((location) => location.toLowerCase());
}

export function getProjectByName(name) {
  return getProjects().find(({ projectName }) => projectName === name);
}

export function getProjectTypes() {
  return unique(
    getProjects().map(({ projectType = "" }) =>
      projectType.toLowerCase().trim()
    )
  ).filter((x) => !!x);
}

export function getProjectTypeName(projectType = "") {
  return getProjects()
    .map(({ projectType = "" }) => projectType.trim())
    .find(
      (candidate) =>
        projectType.toLowerCase().trim() === candidate.toLowerCase().trim()
    );
}

export const getProjectsByRegion = buildMemo((region) => {
  return uniqueByField(
    [
      ...getRegionByName(region).countries.flatMap(getProjectsByCountry),
      ...getProjects().filter(({ location }) =>
        location
          .split(",")
          .map((location) => location.toLowerCase().trim())
          .includes(region)
      ),
    ],
    "projectName"
  );
});

export function getCountryName(country) {
  switch (country.toLowerCase()) {
    case "us": {
      return "united states";
    }
    default: {
      return country;
    }
  }
}
