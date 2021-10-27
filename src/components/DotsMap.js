import React, { useRef, useEffect, useState } from "react";
import { isCountryInRegions } from "../services/regionsUtils";
import "./DotsMap.css";
import isMobile from "ismobilejs";
import scale from "../services/scale";
import ProjectsCountCircles from "./ProjectsCountCircles";
import { getRegionsByCountry } from "../services/regionsUtils";

const DotsMap = ({ map, selectedRegion, onRegionClick }) => {
  const [key, setKey] = useState(1);
  const [hoveredRegion, setHoveredRegion] = useState(null);
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
  const ref = useRef();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(!!ref.current), [ref]);
  return (
    <>
      <svg
        key={key}
        className={`dots-map__canvas ${ready ? "dots-map__canvas--ready" : ""}`}
        ref={ref}
      >
        {map.map((country) => (
          <Country
            key={country.id}
            country={country}
            onClick={() => onRegionClick(getRegionsByCountry(country.id)[0])}
            onMouseEnter={() =>
              setHoveredRegion(getRegionsByCountry(country.id)[0])
            }
            onMouseLeave={() => setHoveredRegion(null)}
            isSelected={getRegionsByCountry(country.id).includes(
              selectedRegion
            )}
            isHover={getRegionsByCountry(country.id).includes(hoveredRegion)}
          />
        ))}
        <ProjectsCountCircles
          onClick={onRegionClick}
          selected={selectedRegion}
          hovered={hoveredRegion}
          onMouseEnter={setHoveredRegion}
          onMouseLeave={() => setHoveredRegion(null)}
        />
      </svg>
    </>
  );
};

export default DotsMap;

const Country = ({
  country,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isSelected,
  isHover,
}) => (
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
            : isCountryInRegions(country.id)
            ? country.color
            : dot.color || country.color,
        }}
        country={country}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    ))}
  </g>
);

const Dot = ({ dot, country, onClick, onMouseEnter, onMouseLeave }) => {
  const ref = useRef();
  const svgElement = ref.current
    ? ref.current.closest("svg")
    : document.createElement("div");
  const isHighlighted = isCountryInRegions(country.id);
  return (
    <g ref={ref} id={`dots-map__${country.id}__${dot.id}`}>
      <rect
        className={`dots-map__canvas__clickable-overlay${
          isHighlighted ? "--clickable" : ""
        }`}
        fill="none"
        width={15}
        height={15}
        x={scale(dot.x, svgElement.clientWidth, 6) - 6}
        y={scale(dot.y, svgElement.clientHeight, 6) - 6}
        onClick={isHighlighted ? onClick : () => {}}
        onMouseEnter={
          isHighlighted && !isMobile().any ? onMouseEnter : () => {}
        }
        onMouseLeave={
          isHighlighted && !isMobile().any ? onMouseLeave : () => {}
        }
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
