import { dataset } from "../data/dataset";

export function getProjects() {
  return dataset.sort(sortProjects);
}

export function getCountries() {
  return unique(
    dataset
      .flatMap(({ location }) => location.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
      .sort((a, b) => a.localeCompare(b))
  );
}

export function getOrganizations() {
  return unique(
    dataset
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
  return dataset
    .filter(
      ({ location }) =>
        location.toLowerCase().indexOf(country.toLowerCase()) >= 0
    )
    .sort(sortProjects);
}

export function getProjectsByOrganization(org) {
  return dataset
    .filter(
      ({ organization }) =>
        organization.toLowerCase().indexOf(org.toLowerCase()) >= 0
    )
    .sort(sortProjects);
}

function sortProjects(a, b) {
  return a.projectName.localeCompare(b.projectName);
}
