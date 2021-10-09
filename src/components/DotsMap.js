import React, { useMemo, useRef, useEffect, useState } from "react";
import { isCountryInProjects } from "../services/datasetUtils";
import "./DotsMap.css";
import isMobile from "ismobilejs";
import scale from "../services/scale";
import ProjectsCountCircles from "./ProjectsCountCircles";
import { isEuropean } from "../services/mapUtils";

const DotsMap = ({ map, selectedCountries = [], onCountrySelected }) => {
  const [key, setKey] = useState(1);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const ref = useRef();
  useEffect(() => {
    if (isMobile().any) {
      return;
    }
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
      >
        {map.map((country) => (
          <Country
            key={country.id}
            country={country}
            onCountrySelected={onCountrySelected}
            isSelected={selectedCountries.includes(country.id)}
            isHover={
              hoveredCountry === country.id ||
              (isCountryInProjects(country.id) &&
                hoveredCountry === "europe" &&
                isEuropean(country.id))
            }
          />
        ))}
        <ProjectsCountCircles
          onClick={onCountrySelected}
          selected={selectedCountries}
          hovered={hoveredCountry}
          onMouseEnter={setHoveredCountry}
          onMouseLeave={() => setHoveredCountry(null)}
        />
      </svg>
    </>
  );
};

export default DotsMap;

const Country = ({ country, onCountrySelected, isSelected, isHover }) => (
  <g>
    {country.dots.map((dot) => (
      <Dot
        key={dot.id}
        dot={{
          ...dot,
          color: isSelected
            ? "var(--selected-country-color)"
            : isHover
            ? "var(--hovered-country-color)"
            : dot.color || country.color,
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
