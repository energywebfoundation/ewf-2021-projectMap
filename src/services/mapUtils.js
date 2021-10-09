import getMap from "../data/map";

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

export function isEuropean(country) {
  const sanitize = (c) => c.trim().toLowerCase().replace(/_/g, " ");
  const isSameCountry = (original) => (candidate) =>
    sanitize(original) === sanitize(candidate);
  return getCountriesByRegion("europe").some(isSameCountry(country));
}
