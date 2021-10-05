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

window.getHemisphere = getHemisphere;
