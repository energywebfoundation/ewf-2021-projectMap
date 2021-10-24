import getMap from "../data/map";
import buildMemo from "./memo";
import unique from "./unique";

export function getHemisphere(country) {
  return getDots(country).reduce(averageX, 0) > 0.5 ? "east" : "west";
}

function getDots(country) {
  const mapCountry = getMap().find(
    ({ id }) => id.toLowerCase().trim() === country.toLowerCase().trim()
  );
  return mapCountry ? mapCountry.dots : [];
}

function averageX(currentAverage, dot, _, allDots) {
  return currentAverage + dot.x / allDots.length;
}

export function getMapEntry(country) {
  return getMap().find(({ id }) => id === country.replace(/ /g, "_"));
}

export function getCountriesByRegion(region) {
  return getMap()
    .filter((country) => country.region === region)
    .map(({ id }) => id);
}

export const isInRegion = buildMemo((region) => (country) => {
  if (region === country) {
    return true;
  }
  if (typeof region !== "string" || typeof country !== "string") {
    return false;
  }
  const sanitize = (c) => c.trim().toLowerCase().replace(/_/g, " ");
  const isSameCountry = (original) => (candidate) =>
    sanitize(original) === sanitize(candidate);
  return getCountriesByRegion(region).some(isSameCountry(country));
});

export function isRegion(region) {
  return getRegions().includes(region.toLowerCase());
}

export const getRegions = buildMemo(() => {
  const isDefined = (x) => !!x;
  return unique(
    getMap()
      .map(({ region }) => region)
      .filter(isDefined)
  ).map((region) => region.toLowerCase().trim());
});
