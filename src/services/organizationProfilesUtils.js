import getOrganizationProfiles from "../data/organizationProfiles";

export function getOrganizationProfile(organization) {
  return getOrganizationProfiles().find(
    ({ acronym, name }) =>
      `(${acronym}) ${name}`.toLowerCase().trim() ===
      organization.toLowerCase().trim()
  );
}
