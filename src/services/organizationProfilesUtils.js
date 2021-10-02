import getOrganizationProfiles from "../data/organizationProfiles";

export function getOrganizationProfile(organization) {
  return getOrganizationProfiles().find(
    ({ acronym, name }) =>
      `(${acronym}) ${name}`.toLowerCase().trim() ===
      organization.toLowerCase().trim()
  );
}

export function getOrganizationCountries(organization) {
  const { country } = getOrganizationProfile(organization) || { country: "" };
  return country
    .split(",")
    .map((country) => country.trim())
    .map((country) => country.toLowerCase());
}
