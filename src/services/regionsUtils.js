import _getRegions from "../data/regions";
import buildMemo from "./memo";
import { toId } from "./sanitize";

export const getRegions = buildMemo(() =>
  _getRegions()
    .map(({ id }) => toId(id))
    .sort(sortRegions)
);

export const getRegionByCountry = buildMemo(
  (country) =>
    (
      _getRegions().find(({ countries }) =>
        countries.includes(toId(country))
      ) || {}
    ).id
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

function sortRegions(regionA, regionB) {
  if (regionA === "global") {
    return -1;
  } else if (regionB === "global") {
    return 1;
  } else {
    return regionA.localeCompare(regionB);
  }
}
