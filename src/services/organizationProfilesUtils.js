import getOrganizationProfiles from "../data/organizationProfiles";

export function getOrganizationProfile(organization) {
  const isSame = (a = "", b = "") =>
    a.toLocaleLowerCase().trim() === b.toLowerCase().trim();
  return getOrganizationProfiles().find(
    ({ acronym, name }) =>
      isSame(`(${acronym}) ${name}`, organization) ||
      isSame(acronym, organization) ||
      isSame(name, organization)
  );
}

export function getOrganizationCountries(organization) {
  const { country } = getOrganizationProfile(organization) || { country: "" };
  return country
    .split(",")
    .map((country) => country.trim())
    .map((country) => country.toLowerCase());
}
