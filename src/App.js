import { useState } from "react";
import DotsMap from "./components/DotsMap";
import CountryCard from "./components/CountryCard";
import { map as rawMap } from "./data/map";
import { getCountries } from "./services/datasetUtils";
import ProjectCard from "./components/ProjectCard";
import Filters from "./components/Filters";
import "./App.css";

function App() {
  const [map] = useState(prepare(rawMap));
  const highlightCountries = getCountries();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <div className="dots-map">
      <div className="dots-map__filters-container">
        <Filters />
      </div>
      <div className="dots-map__map-container">
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
    </div>
  );
}

export default App;

const Backdrop = ({ onDismiss, children }) => (
  <>
    <div
      className="dots-map__backdrop"
      onClick={(event) => {
        const isBackdropClicked =
          event.target.classList.contains("dots-map__backdrop");
        if (!isBackdropClicked) {
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
      radius: window.baseRadius || 1.2,
    })),
  }));
}

function isHighlighted(country) {
  return getCountries().includes(country);
}

function getRandomColor() {
  const colors = ["#A566FF", "#2EB67D", "#F4B400", "#27baff"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
