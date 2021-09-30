import { useState } from "react";
import DotsMap from "./components/DotsMap";
import CountryCard from "./components/CountryCard";
import { map as rawMap } from "./data/map";
import { dataset } from "./data/dataset";
import ProjectCard from "./components/ProjectCard";

function App() {
  const [map] = useState(prepare(rawMap));
  const highlightCountries = getHighlightCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
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
          setSelectedProject(null);
        }}
        selectedCountries={selectedCountry ? [selectedCountry] : []}
      />
      {(selectedProject || selectedCountry) && (
        <Backdrop
          onDismiss={() => {
            setSelectedCountry(null);
            setSelectedProject(null);
          }}
        >
          {selectedProject && <ProjectCard project={selectedProject} />}
          {selectedCountry && (
            <CountryCard
              country={selectedCountry}
              onProjectClick={(project) => {
                setSelectedCountry(null);
                setSelectedProject(project);
              }}
            />
          )}
        </Backdrop>
      )}
    </div>
  );
}

export default App;

const Backdrop = ({ onDismiss, children }) => (
  <>
    <div
      id="backdrop"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      onClick={(event) => {
        if (event.target.id !== "backdrop") {
          return;
        }
        onDismiss();
      }}
    >
      {children}
    </div>
  </>
);

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
