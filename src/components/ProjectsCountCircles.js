import React, { useEffect, useState, useRef } from "react";
import {
  getCountries,
  getProjectsByCountry,
  getProjectsByRegion,
} from "../services/datasetUtils";
import { getCountriesByRegion, getMapEntry } from "../services/mapUtils";
import scale from "../services/scale";
import "./ProjectsCountCircles.css";

const ProjectsCountCircles = ({ onClick }) => {
  const ref = useRef();
  const projectsCountCircles = useProjectsCountCircles(ref);
  return (
    <g ref={ref}>
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
    </g>
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
  const radius = useRadius(relativePosition);
  const color = useColor(relativePosition);
  return (
    <g className="dots-map__projects-count-circle" onClick={onClick}>
      <circle cx={x} cy={y} r={radius} fill={color}>
        {projectsCount}
      </circle>
      <text
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="10px"
      >
        {projectsCount}
      </text>
    </g>
  );
};

function useRadius(relativePosition) {
  const min = 18;
  const max = 40;
  const range = max - min;
  const radius = Math.floor(range * relativePosition + min);
  return radius;
}

function useColor(relativePosition) {
  const colors = ["#F6AAAA", "#9EFAFB", "#BF93FF", "#F3D882"];
  const index = Math.ceil(relativePosition * colors.length) - 1;
  return colors[index];
}

function useProjectsCountCircles(ref) {
  const [projectsCountCircles, setProjectsCountCircles] = useState([]);
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const isEuropean = (country) => country.region === "europe";
    const isDefined = (x) => !!x;
    const not =
      (fn) =>
      (...args) =>
        !fn(...args);
    const getMax = (max, entry) =>
      entry.projectsCount > max ? entry.projectsCount : max;

    const { width, height } = ref.current
      .closest("svg")
      .getBoundingClientRect();
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
  }, [ref]);
  return projectsCountCircles;
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
