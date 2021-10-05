import React, { useEffect, useState } from "react";
import {
  getCountries,
  getProjectsByCountry,
  getProjectsByRegion,
} from "../services/datasetUtils";
import { getCountriesByRegion, getMapEntry } from "../services/mapUtils";
import scale from "../services/scale";
import "./ProjectsCountCircles.css";
import useCoolDimensions from "react-cool-dimensions";

const ProjectsCountCircles = ({ onClick }) => {
  const [ref, projectsCountCircles] = useProjectsCountCircles();
  return (
    <div className="dots-map__projects-count-circles__container" ref={ref}>
      {projectsCountCircles
        .filter(({ x, y }) => !!x && !!y)
        .map((projectsCountCircle, index) => (
          <ProjectsCountCircle
            key={index}
            {...projectsCountCircle}
            onClick={() =>
              onClick(projectsCountCircle.region || projectsCountCircle.country)
            }
          />
        ))}
    </div>
  );
};

export default ProjectsCountCircles;

const ProjectsCountCircle = ({
  projectsCount,
  relativePosition,
  x,
  y,
  onClick,
}) => {
  const { width, height } = useDimensions(relativePosition);
  const color = useColor(relativePosition);
  return (
    <div
      className="dots-map__projects-count-circle"
      style={{
        left: x,
        top: y,
        backgroundColor: color,
        width,
        height,
      }}
      onClick={onClick}
    >
      {projectsCount}
    </div>
  );
};

function useDimensions(relativePosition) {
  const min = 18;
  const max = 40;
  const range = max - min;
  const dimension = Math.floor(range * relativePosition + min);
  return { width: dimension, height: dimension };
}

function useColor(relativePosition) {
  const colors = ["#F6AAAA", "#9EFAFB", "#BF93FF", "#F3D882"];
  const index = Math.ceil(relativePosition * colors.length) - 1;
  return colors[index];
}

function useProjectsCountCircles() {
  const [projectsCountCircles, setProjectsCountCircles] = useState([]);
  const { observe, unobserve, width, height } = useCoolDimensions();
  useEffect(() => {
    const isEuropean = (country) => country.region === "europe";
    const isDefined = (x) => !!x;
    const not =
      (fn) =>
      (...args) =>
        !fn(...args);
    const getMax = (max, entry) =>
      entry.projectsCount > max ? entry.projectsCount : max;

    unobserve();
    setTimeout(observe, 1000);
    const projectsCountCircles = getCountries()
      .map(getMapEntry)
      .filter(isDefined)
      .filter(not(isEuropean))
      .map((country) => ({
        country: country.id,
        projectsCount: getProjectsByCountry(country.id).length,
        ...getCenterCoordinates(width, height, country.dots),
      }));
    projectsCountCircles.push({
      region: "europe",
      projectsCount: getProjectsByRegion("europe").length,
      ...getEuropeCoordinates(width, height),
    });
    projectsCountCircles.push({
      region: "global",
      projectsCount: getProjectsByRegion("global").length,
      x: scale(0.35, width, 0),
      y: scale(0.5, height, 0),
    });
    const maxProjects = projectsCountCircles.reduce(getMax, 0);
    setProjectsCountCircles(
      projectsCountCircles.map((projectCountsCircle) => ({
        ...projectCountsCircle,
        relativePosition: projectCountsCircle.projectsCount / maxProjects,
      }))
    );
  }, [width, height, observe, unobserve]);
  return [observe, projectsCountCircles];
}

function getCenterCoordinates(width, height, allDots) {
  const averagePosition = (currentAverage, { x, y }, _, allDots) => ({
    x: currentAverage.x + x / allDots.length,
    y: currentAverage.y + y / allDots.length,
  });
  const relativeMiddlePoint = allDots.reduce(averagePosition, {
    x: 0,
    y: 0,
  });
  return {
    x: scale(relativeMiddlePoint.x, width, 0),
    y: scale(relativeMiddlePoint.y, height, 0),
  };
}

function getEuropeCoordinates(width, height) {
  const collectDots = (allDots, country) => [...allDots, ...country.dots];
  const europeDots = getCountriesByRegion("europe")
    .map(getMapEntry)
    .reduce(collectDots, []);
  return getCenterCoordinates(width, height, europeDots);
}
