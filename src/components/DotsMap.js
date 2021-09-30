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
  useEffect(
    () =>
      initializeDotsMap(
        svgElement.current,
        map,
        highlightCountries,
        onCountrySelected
      ),
    []
  );
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

function initializeDotsMap(
  svgElement,
  dataset,
  highlightCountries,
  onCountrySelected
) {
  // prettier-ignore
  const countries = select(svgElement)
      .attr('viewBox', [0, 0, svgElement.clientWidth, svgElement.clientHeight])
      .selectAll('g')
      .data(addParentToDots(dataset))
      .enter()
          .append('g')
          .attr('id', (country) => `${svgElement.id}-${country.id}`)
  // prettier-ignore
  const dotContainers = countries
    .selectAll("g")
    .data((country) => country.dots)
    .enter()
  // prettier-ignore
  dotContainers
    .append('rect')
      .attr('style', dot => highlightCountries.includes(dot.country.id) ? 'cursor: pointer; pointer-events: all;' : '')
      .attr('fill', 'none')
      .attr('width', dot => dot.radius * 6)
      .attr('height', dot => dot.radius * 6)
      .attr('x', dot => scale(dot.x, svgElement.clientWidth, dot.radius * 3) - dot.radius * 3)
      .attr('y', dot => scale(dot.y, svgElement.clientHeight, dot.radius * 3) - dot.radius * 3)
      .on('click', (_, dot) => {
        const isHiglighted = highlightCountries.includes(dot.country.id)
        if (!isHiglighted) {
          return
        }
        onCountrySelected(dot.country.id)
      })
  // prettier-ignore
  dotContainers
    .append('circle')
      .attr("id", (dot) => `${svgElement.id}-${dot.country.id}-${dot.id}`)
      .attr('style', 'pointer-events: none;')
      .attr("fill", dot => dot.country.color)
      .attr("r", (dot) => dot.radius)
      .attr("cx", (dot) => scale(dot.x, svgElement.clientWidth, dot.radius * 3))
      .attr("cy", (dot) => scale(dot.y, svgElement.clientHeight, dot.radius * 3));
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
