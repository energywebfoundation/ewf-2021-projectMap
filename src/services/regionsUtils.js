import _getRegions from "../data/regions";
import buildMemo from "./memo";

export const getRegions = buildMemo(() =>
  _getRegions()
    .map(({ id }) => id.toLowerCase().trim())
    .sort(sortRegions)
);

export const getRegionByCountry = buildMemo((country) =>
  _getRegions().find(({ countries }) =>
    countries.includes(country.toLowerCase().trim())
  )
);

export const getRegionByName = buildMemo((region = "") =>
  _getRegions().find(({ id }) => id === region.toLowerCase().trim())
);

export function isInRegion(region) {
  return (country) =>
    getRegionByName(region).countries.includes(country.toLowerCase().trim());
}

export function isRegion(region) {
  return !!getRegionByName(region);
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
