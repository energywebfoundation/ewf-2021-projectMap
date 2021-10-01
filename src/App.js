import { useState } from "react";
import DotsMap from "./components/DotsMap";
import CountryCard from "./components/CountryCard";
import getMapData from "./data/map";
import { isCountryInProjects } from "./services/datasetUtils";
import ProjectCard from "./components/ProjectCard";
import Filters from "./components/Filters";
import OrganizationCard from "./components/OrganizationCard";
import { getProjectCountries } from "./services/datasetUtils";
import "./App.css";

function App() {
  const [map] = useState(prepare(getMapData()));
  const [selectedCountry, selectCountry] = useState(null);
  const [selectedProject, selectProject] = useState(null);
  const [selectedOrganization, selectOrganization] = useState(null);
  const [showCountryCard, setShowCountryCard] = useState(false);
  const [showProjectCard, setShowProjectCard] = useState(false);
  const [showOrganizationCard, setShowOrganizationCard] = useState(false);
  const showJustCountryCard = (country) => {
    selectCountry(country);
    setShowCountryCard(true);
    selectProject(null);
    setShowProjectCard(false);
    selectOrganization(null);
    setShowOrganizationCard(false);
  };
  const closeCard = () => {
    selectCountry(null);
    selectProject(null);
    selectOrganization(null);
    setShowCountryCard(false);
    setShowProjectCard(false);
    setShowOrganizationCard(false);
  };
  const showJustProjectCard = (project) => {
    selectCountry(null);
    setShowCountryCard(false);
    selectOrganization(null);
    setShowOrganizationCard(false);
    selectProject(project);
    setShowProjectCard(true);
  };
  const showJustOrganizationCard = (organization) => {
    selectCountry(null);
    setShowCountryCard(false);
    selectProject(null);
    setShowProjectCard(false);
    selectOrganization(organization);
    setShowOrganizationCard(true);
  };
  return (
    <div className="dots-map">
      <div className="dots-map__filters-container">
        <Filters
          onCountryClick={showJustCountryCard}
          onProjectClick={(project) => {
            selectCountry(getProjectCountries(project));
            setShowCountryCard(false);
            selectProject(project);
            setShowProjectCard(true);
            selectOrganization(null);
            setShowOrganizationCard(false);
          }}
          onOrganizationClick={showJustOrganizationCard}
        />
      </div>
      <div className="dots-map__map-container">
        <DotsMap
          map={map}
          onCountrySelected={showJustCountryCard}
          selectedCountries={selectedCountry ? [selectedCountry] : []}
          selectedColor={window.dotsMapConfig.selectedColor || "#DB4437"}
        />
        {(showProjectCard || showCountryCard || showOrganizationCard) && (
          <Backdrop onDismiss={closeCard}>
            {showProjectCard && <ProjectCard project={selectedProject} />}
            {showCountryCard && (
              <CountryCard
                country={selectedCountry}
                onProjectClick={showJustProjectCard}
              />
            )}
            {showOrganizationCard && (
              <OrganizationCard
                organization={selectedOrganization}
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
    color:
      country.color || isCountryInProjects(country.id)
        ? getRandomColor()
        : window.dotsMapConfig.dotColor || "#C8C8CA",
    dots: country.dots.map((dot) => ({
      ...dot,
      radius: window.dotsMapConfig.dotRadius || 1.2,
    })),
  }));
}

function getRandomColor() {
  const colors = window.dotsMapConfig.randomColorSet || [
    "#A566FF",
    "#2EB67D",
    "#F4B400",
    "#27baff",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
