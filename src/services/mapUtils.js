import getMap from "../data/map";

export function getHemisphere(country) {
  return getDots(country).reduce(averageX, 0) > 0.5 ? "east" : "west";
}

function getDots(country) {
  return getMap().find(
    ({ id }) => id.toLowerCase().trim() === country.toLowerCase().trim()
  ).dots;
}

function averageX(currentAverage, dot, _, allDots) {
  return currentAverage + dot.x / allDots.length;
}

window.getHemisphere = getHemisphere;
