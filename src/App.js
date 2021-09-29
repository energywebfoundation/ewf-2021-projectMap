import { useState } from "react";
import DotsMap from "./components/DotsMap";
import CountryCard from "./components/CountryCard";
import { map as rawMap } from "./data/map";
import { dataset } from "./data/dataset";

function App() {
  const [map] = useState(prepare(rawMap));
  const highlightCountries = getHighlightCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <div
      style={{
        width: 640,
        height: 400,
      }}
    >
      <DotsMap
        map={map}
        dotRadius={1.2}
        noise={0.5}
        noiseChance={0.2}
        highlightCountries={highlightCountries}
        onCountrySelected={(country) => {
          setSelectedCountry(country);
        }}
        selectedCountries={selectedCountry ? [selectedCountry] : []}
      />
      {selectedCountry && <CountryCard country={selectedCountry} />}
    </div>
  );
}

export default App;

function prepare(map) {
  return map.map((country) => ({
    ...country,
    color: isHighlighted(country.id)
      ? getRandomColor()
      : window.dotColor || "#C8C8CA",
    dots: country.dots.map((dot) => ({
      ...dot,
      radius: getDotRadius(),
    })),
  }));
}

function getDotRadius() {
  const baseRadius = window.baseRadius || 1.2;
  const noiseChance = window.noiseChance || 0.2;
  const noise = window.noise || 0.5;

  const shouldApplyNoise = Math.random() < noiseChance;
  const scale = shouldApplyNoise ? 1 + (Math.random() * noise * 2 - noise) : 1;
  return baseRadius * scale;
}

function getHighlightCountries() {
  return unique(
    dataset
      .flatMap(({ location }) => location.split(","))
      .map((country) => country.trim())
      .map((country) => country.toLowerCase())
  );
}

function isHighlighted(country) {
  return getHighlightCountries().includes(country);
}

function getRandomColor() {
  const colors = ["#A566FF", "#2EB67D", "#F4B400", "#27baff"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function unique(objs) {
  return Array.from(new Set(objs));
}
