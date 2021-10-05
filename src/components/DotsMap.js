import React, { useMemo, useRef, useEffect, useState } from "react";
import { isCountryInProjects } from "../services/datasetUtils";
import "./DotsMap.css";
import isMobile from "ismobilejs";
import scale from "../services/scale";
import ProjectsCountCircles from "./ProjectsCountCircles";

const DotsMap = ({
  map,
  selectedCountries = [],
  onCountrySelected,
  selectedColor,
}) => {
  const [key, setKey] = useState(1);
  const [viewBox, setViewBox] = useState([0, 0, 100, 100]);
  const ref = useRef();
  useEffect(() => {
    setViewBox([0, 0, ref.current.clientWidth, ref.current.clientHeight]);
    const updateKey = () => {
      setKey(key + 1);
      window.removeEventListener("resize", updateKey);
    };
    window.addEventListener("resize", updateKey);
  }, [key]);
  return (
    <>
      <svg
        key={key}
        className={`dots-map__canvas ${
          ref.current ? "dots-map__canvas--ready" : ""
        }`}
        ref={ref}
        viewBox={viewBox}
      >
        {map.map((country) => (
          <Country
            key={country.id}
            country={country}
            onCountrySelected={onCountrySelected}
            isSelected={selectedCountries.includes(country.id)}
            selectedColor={selectedColor}
          />
        ))}
      </svg>
      <ProjectsCountCircles
        onClick={onCountrySelected}
        width={ref.current?.clientWidth}
        height={ref.current?.clientHeight}
      />
    </>
  );
};

export default DotsMap;

const Country = ({ country, onCountrySelected, isSelected, selectedColor }) => (
  <g>
    {country.dots.map((dot) => (
      <Dot
        key={dot.id}
        dot={{
          ...dot,
          color: isSelected ? selectedColor : dot.color || country.color,
        }}
        country={country}
        onCountrySelected={onCountrySelected}
      />
    ))}
  </g>
);

const Dot = ({ dot, country, onCountrySelected, onHover }) => {
  const ref = useRef();
  const svgElement = ref.current
    ? ref.current.closest("svg")
    : document.createElement("div");
  const isHighlighted = useMemo(
    () => isCountryInProjects(country.id),
    [country]
  );
  return (
    <g ref={ref}>
      <rect
        className={`dots-map__canvas__clickable-overlay${
          isHighlighted ? "--clickable" : ""
        }`}
        fill="none"
        width={dot.radius * 6}
        height={dot.radius * 6}
        x={
          scale(dot.x, svgElement.clientWidth, dot.radius * 3) - dot.radius * 3
        }
        y={
          scale(dot.y, svgElement.clientHeight, dot.radius * 3) - dot.radius * 3
        }
        onClick={isHighlighted ? () => onCountrySelected(country.id) : () => {}}
        onMouseEnter={isHighlighted && !isMobile().any ? onHover : () => {}}
      />
      <circle
        className="dots-map__canvas__dot"
        fill={dot.color}
        r={dot.radius}
        cx={scale(dot.x, svgElement.clientWidth, dot.radius * 3)}
        cy={scale(dot.y, svgElement.clientHeight, dot.radius * 3)}
      />
    </g>
  );
};
