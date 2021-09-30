import { dataset } from "../data/dataset";

export function getCountries() {
  return unique(
    dataset
      .flatMap(({ location }) => location.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
  );
}

export function getOrganizations() {
  return unique(
    dataset
      .flatMap(({ organization }) => organization.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
  );
}

function unique(objs) {
  return Array.from(new Set(objs));
}
