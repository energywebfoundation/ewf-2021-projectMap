import getDataset from "../data/dataset";
import unique, { uniqueByField } from "./unique";
import buildMemo from "./memo";
import { getRegionByName } from "./regionsUtils";
import { toId, toName } from "./sanitize";

export function getProjects() {
  return getDataset().sort(sortProjects);
}

export function getCountries() {
  return unique(
    getDataset()
      .flatMap(({ location }) => location.split(","))
      .map(toId)
      .filter((x) => !!x)
      .sort((a, b) => a.localeCompare(b))
  );
}

export function getOrganizations() {
  return unique(
    getDataset()
      .flatMap(({ organization }) => organization.split(","))
      .map(toId)
      .sort((a, b) => a.localeCompare(b))
  );
}

export function getProjectCountries(project) {
  return project.location
    .split(",")
    .map(toId)
    .sort((a, b) => a.localeCompare(b));
}

export const getProjectsByCountry = buildMemo((country) => {
  return getDataset()
    .filter((project) => getProjectCountries(project).includes(toId(country)))
    .sort(sortProjects);
});

export const getProjectsByOrganization = buildMemo((org) =>
  getDataset()
    .filter(({ organization }) => toId(organization).includes(toId(org)))
    .sort(sortProjects)
);

function sortProjects(a, b) {
  return a.projectName.localeCompare(b.projectName);
}

export function getOrganizationCountries(organization) {
  return getProjectsByOrganization(organization)
    .map((project) => project.location)
    .flatMap((location) => location.split(","))
    .map(toId);
}

export function getProjectByName(name) {
  return getProjects().find(({ projectName }) => projectName === name);
}

export function getProjectTypes() {
  return unique(
    getProjects().map(({ projectType = "" }) => toId(projectType))
  ).filter((x) => !!x);
}

export function getProjectTypeName(projectType = "") {
  return getProjects()
    .map(({ projectType = "" }) => projectType.trim())
    .find((candidate) => toId(projectType) === toId(candidate));
}

export const getProjectsByRegion = buildMemo((region) => {
  return uniqueByField(
    [
      ...getRegionByName(region).countries.flatMap(getProjectsByCountry),
      ...getProjects().filter(({ location }) =>
        location.split(",").map(toId).includes(region)
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
      return toName(country);
    }
  }
}
