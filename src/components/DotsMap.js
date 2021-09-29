import React, { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";

const DotsMap = ({
  map,
  highlightCountries = [],
  selectedCountries = [],
  onCountrySelected,
  selectedColor = "#DB4437",
}) => {
  const id = useId();
  const svgElement = useRef();
  useEffect(() => initializeDotsMap(svgElement.current, map), []);
  useEffect(() => {
    makeCountriesClickable(
      svgElement.current,
      highlightCountries,
      onCountrySelected
    );
  }, []);
  useEffect(() => {
    resetSelectedCountries(svgElement.current);
    colorSelectedCountries(
      svgElement.current,
      selectedCountries,
      selectedColor
    );
  }, [selectedCountries]);
  return <svg id={id} ref={svgElement} className="w-full h-full"></svg>;
};

export default DotsMap;

function useId() {
  const getRandomId = () => `dots-map-${Math.floor(Math.random() * 10e4)}`;
  const [id] = useState(getRandomId());
  return id;
}

function initializeDotsMap(svgElement, dataset) {
  // prettier-ignore
  const countries = select(svgElement)
      .attr('viewBox', [0, 0, svgElement.clientWidth, svgElement.clientHeight])
      .selectAll('g')
      .data(addParentToDots(dataset))
      .enter()
          .append('g')
          .attr('id', (country) => `${svgElement.id}-${country.id}`)
  // prettier-ignore
  countries
    .selectAll("g")
    .data((country) => country.dots)
    .enter()
      .append("circle")
      .attr("id", (dot) => `${svgElement.id}-${dot.country.id}-${dot.id}`)
      .attr("fill", dot => dot.country.color)
      .attr("r", (dot) => dot.radius)
      .attr("cx", (dot) => scale(dot.x, svgElement.clientWidth, dot.radius * 3))
      .attr("cy", (dot) => scale(dot.y, svgElement.clientHeight, dot.radius * 3));
}

function makeCountriesClickable(svgElement, countries, onClick) {
  countries
    .map((country) => select(`#${svgElement.id}-${country}`))
    .forEach((country) => {
      // prettier-ignore
      country
        .append('rect')
          .attr('style', 'cursor: pointer')
          .attr('fill', 'transparent')
          .attr('x', getClickableCountryRectX)
          .attr('width', getClickableCountryRectWidth)
          .attr('y', getClickableCountryRectY)
          .attr('height', getClickableCountryRectHeight)
          .on('click', (_, country) => {
            onClick(country.id)
          })
    });
}

function resetSelectedCountries(svgElement) {
  select(svgElement)
    .selectAll("circle")
    .attr("fill", (dot) => dot.country.color);
}

function colorSelectedCountries(svgElement, selectedCountries, selectedColor) {
  selectedCountries
    .map((country) => `#${svgElement.id}-${country}`)
    .forEach((selector) => {
      select(selector).selectAll("circle").attr("fill", selectedColor);
    });
}

function scale(value, max, margin) {
  return value * (max - margin * 2) + margin;
}

function addParentToDots(dataset) {
  return dataset.map((country) => ({
    ...country,
    dots: country.dots.map((dot) => ({
      ...dot,
      country: {
        ...country,
        dots: undefined,
      },
    })),
  }));
}

function getClickableCountryRectX(country, index, rects) {
  const thisRect = rects[index];
  const maxX = thisRect.closest("svg").clientWidth;
  const margin = country.dots[0].radius * 3;
  const minDotX = Math.min(...country.dots.map(({ x }) => scale(x, maxX, 0)));
  return minDotX - margin;
}

function getClickableCountryRectWidth(country, index, rects) {
  const thisRect = rects[index];
  const maxX = thisRect.closest("svg").clientWidth;
  const margin = country.dots[0].radius * 3;
  const maxDotX = Math.max(...country.dots.map(({ x }) => scale(x, maxX, 0)));
  const x = thisRect.getAttribute("x");
  return maxDotX - x + margin;
}

function getClickableCountryRectY(country, index, rects) {
  const thisRect = rects[index];
  const maxY = thisRect.closest("svg").clientHeight;
  const margin = country.dots[0].radius * 3;
  const minDotY = Math.min(...country.dots.map(({ y }) => scale(y, maxY, 0)));
  return minDotY - margin;
}

function getClickableCountryRectHeight(country, index, rects) {
  const thisRect = rects[index];
  const maxY = thisRect.closest("svg").clientHeight;
  const margin = country.dots[0].radius * 3;
  const maxDotY = Math.max(...country.dots.map(({ y }) => scale(y, maxY, 0)));
  const y = thisRect.getAttribute("y");
  return maxDotY - y + margin;
}
