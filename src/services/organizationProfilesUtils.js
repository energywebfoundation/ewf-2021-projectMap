import getOrganizationProfiles from "../data/organizationProfiles";
import { toId } from "./sanitize";

export function getOrganizationProfile(organization) {
  const isSame = (a = "", b = "") => toId(a) === toId(b);
  return getOrganizationProfiles().find(
    ({ acronym, name }) =>
      isSame(`(${acronym}) ${name}`, organization) ||
      isSame(acronym, organization) ||
      isSame(name, organization)
  );
}

export function getOrganizationCountries(organization) {
  const { country } = getOrganizationProfile(organization) || { country: "" };
  return country.split(",").map(toId);
}
