import { useState } from "react";
import DotsMap from "./components/DotsMap";
import CountryCard from "./components/CountryCard";
import { map as rawMap } from "./data/map";
import { getCountries } from "./services/datasetUtils";
import ProjectCard from "./components/ProjectCard";
import Filters from "./components/Filters";
import { getProjectCountries } from "./services/datasetUtils";
import "./App.css";

function App() {
  const [map] = useState(prepare(rawMap));
  const highlightCountries = getCountries();
  const [selectedCountry, selectCountry] = useState(null);
  const [selectedProject, selectProject] = useState(null);
  const [showCountryCard, setShowCountryCard] = useState(false);
  const [showProjectCard, setShowProjectCard] = useState(false);
  const showJustCountryCard = (country) => {
    selectCountry(country);
    setShowCountryCard(true);
    selectProject(false);
    setShowProjectCard(false);
  };
  const closeCard = () => {
    selectCountry(null);
    selectProject(null);
    setShowCountryCard(false);
    setShowProjectCard(false);
  };
  const showJustProjectCard = (project) => {
    selectCountry(null);
    setShowCountryCard(false);
    selectProject(project);
    setShowProjectCard(true);
  };
  return (
    <div className="dots-map">
      <div className="dots-map__filters-container">
        <Filters
          onProjectClick={(project) => {
            selectCountry(getProjectCountries(project));
            setShowCountryCard(false);
            selectProject(project);
            setShowProjectCard(true);
          }}
        />
      </div>
      <div className="dots-map__map-container">
        <DotsMap
          map={map}
          dotRadius={1.2}
          noise={0.5}
          noiseChance={0.2}
          highlightCountries={highlightCountries}
          onCountrySelected={showJustCountryCard}
          selectedCountries={selectedCountry ? [selectedCountry] : []}
        />
        {(showProjectCard || showCountryCard) && (
          <Backdrop onDismiss={closeCard}>
            {showProjectCard && <ProjectCard project={selectedProject} />}
            {showCountryCard && (
              <CountryCard
                country={selectedCountry}
                onProjectClick={showJustProjectCard}
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
