import getMap from "../data/map";
import { toId } from "./sanitize";

export function getHemisphere(country) {
  return getDots(country).reduce(averageX, 0) > 0.5 ? "east" : "west";
}

function getDots(country) {
  const mapCountry = getMap().find(({ id }) => toId(id) === toId(country));
  return mapCountry ? mapCountry.dots : [];
}

function averageX(currentAverage, dot, _, allDots) {
  return currentAverage + dot.x / allDots.length;
}

export function getMapEntry(country) {
  return getMap().find(({ id }) => toId(id) === toId(country));
}
