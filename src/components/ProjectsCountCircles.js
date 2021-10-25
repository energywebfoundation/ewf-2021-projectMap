import React, { useState, useRef } from "react";
import { getProjectsByRegion, getCountryName } from "../services/datasetUtils";
import { getMapEntry } from "../services/mapUtils";
import { getRegionByName, getRegions } from "../services/regionsUtils";
import scale from "../services/scale";
import "./ProjectsCountCircles.css";

const ProjectsCountCircles = ({
  onClick,
  selected,
  hovered,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [projectsCountCircles] = useState(getProjectsCountCircles());
  return (
    <>
      {projectsCountCircles.map((projectsCountCircle, index) => (
        <ProjectsCountCircle
          key={index}
          {...projectsCountCircle}
          onClick={() =>
            onClick(projectsCountCircle.region || projectsCountCircle.country)
          }
          isSelected={projectsCountCircle.region === selected}
          isHover={hovered === projectsCountCircle.region}
          onMouseEnter={() => onMouseEnter(projectsCountCircle.region)}
          onMouseLeave={() => onMouseLeave(projectsCountCircle.region)}
        />
      ))}
    </>
  );
};

export default ProjectsCountCircles;

const ProjectsCountCircle = ({
  region,
  projectsCount,
  relativePosition,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isSelected,
  isHover,
}) => {
  const ref = useRef();
  const radius = useRadius(relativePosition);
  const [color, textColor] = useColor(relativePosition, isSelected, isHover);
  const { x, y } = getCoordinates(ref.current, region);
  return (
    <g
      className="dots-map__projects-count-circle"
      onClick={onClick}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <circle cx={x} cy={y} r={radius} fill={color} />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="10px"
        fill={textColor}
      >
        {projectsCount}
      </text>
      <RegionPill
        region={region}
        state={isSelected ? "selected" : isHover ? "hover" : "hidden"}
        x={x - 50}
        y={y - radius - 15}
      />
    </g>
  );
};

const RegionPill = ({ region, state, ...props }) => {
  const regionName = getCountryName(region);
  const regionWidth = 90 + regionName.length * 5;
  return (
    <foreignObject {...props} width={regionWidth} height={30}>
      <div className={"dots-map__region-pill dots-map__region-pill--" + state}>
        <img
          src={`${process.env.PUBLIC_URL}/icons/${region}.png`}
          alt={regionName}
        />
        <span>{regionName}</span>
      </div>
    </foreignObject>
  );
};

function useRadius(relativePosition) {
  const min = 18;
  const max = 40;
  const range = max - min;
  const radius = Math.floor(range * relativePosition + min);
  return radius;
}

function useColor(relativePosition, isSelected, isHover) {
  if (isSelected) {
    return ["var(--selected-country-color)", "white"];
  }
  if (isHover) {
    return ["var(--hovered-country-color)", "white"];
  }
  const colors = ["#F6AAAA", "#9EFAFB", "#BF93FF", "#F3D882"];
  const index = Math.ceil(relativePosition * colors.length) - 1;
  return [colors[index], "#452E66"];
}

function getProjectsCountCircles() {
  const getMax = (max, entry) =>
    entry.projectsCount > max ? entry.projectsCount : max;
  const projectsCountCircles = getRegions()
    .map((region) => ({
      region,
      projectsCount: getProjectsByRegion(region).length,
    }))
    .filter(({ projectsCount }) => projectsCount > 0);
  projectsCountCircles.push({
    region: "global",
    projectsCount: getProjectsByRegion("global").length,
  });
  const maxProjects = projectsCountCircles.reduce(getMax, 0);
  return projectsCountCircles.map((projectCountsCircle) => ({
    ...projectCountsCircle,
    relativePosition: projectCountsCircle.projectsCount / maxProjects,
  }));
}

function getCoordinates(element, region) {
  if (!element) {
    return { x: -100, y: -100 };
  }
  const svg = element.closest("svg");
  if (region === "global") {
    return getGlobalCoordinates(svg);
  } else {
    return getRegionCoordinates(svg, region);
  }
}

function getGlobalCoordinates(svg) {
  return {
    x: scale(0.35, svg.clientWidth, 0),
    y: scale(0.5, svg.clientHeight, 0),
  };
}

function getRegionCoordinates(svg, region) {
  const averageCoordinates = ({ x, y }, nextCoordinate, i, allCoordinates) => ({
    x: x + nextCoordinate.x / allCoordinates.length,
    y: y + nextCoordinate.y / allCoordinates.length,
  });
  return getRegionByName(region)
    .countries.map(getMapEntry)
    .map((country) =>
      getCenterCoordinates(svg.clientWidth, svg.clientHeight, country.dots)
    )
    .reduce(averageCoordinates, { x: 0, y: 0 });
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
