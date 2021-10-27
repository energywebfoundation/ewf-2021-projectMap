import _getRegions from "../data/regions";
import buildMemo from "./memo";
import { toId } from "./sanitize";

export const getRegions = buildMemo(() =>
  _getRegions()
    .map(({ id }) => toId(id))
    .sort(sortRegions)
);

export const getRegionsByCountry = buildMemo(
  (country) =>
    _getRegions()
      .filter(({ countries }) => countries.includes(toId(country)))
      .map(({ id }) => toId(id)) || []
);

export const getRegionByName = buildMemo((region = "") =>
  _getRegions().find(({ id }) => id === toId(region))
);

export function isInRegion(region) {
  return (country) => getRegionByName(region).countries.includes(toId(country));
}

export function isRegion(region) {
  return !!getRegionByName(region);
}

export function getRegionName(region) {
  return getRegionByName(region).readableName;
}

export const getCountriesInRegions = buildMemo(() =>
  _getRegions().flatMap(({ countries }) => countries)
);

export function isCountryInRegions(country) {
  return getCountriesInRegions().includes(toId(country));
}

function sortRegions(regionA, regionB) {
  if (regionA === "global") {
    return -1;
  } else if (regionB === "global") {
    return 1;
  } else {
    return regionA.localeCompare(regionB);
  }
}
