import getDataset from "../data/dataset";

export function getProjects() {
  return getDataset().sort(sortProjects);
}

export function getCountries() {
  return unique(
    getDataset()
      .flatMap(({ location }) => location.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
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

function unique(objs) {
  return Array.from(new Set(objs));
}

export function getProjectCountries(project) {
  return project.location
    .split(",")
    .map((country) => country.trim())
    .map((country) => country.toLowerCase())
    .sort((a, b) => a.localeCompare(b));
}

export function getProjectsByCountry(country) {
  return getDataset()
    .filter(
      ({ location }) =>
        location.toLowerCase().indexOf(country.toLowerCase()) >= 0
    )
    .sort(sortProjects);
}

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
