import { useState } from "react";
import DotsMap from "./components/DotsMap";
import CountryCard from "./components/CountryCard";
import getMapData from "./data/map";
import {
  getOrganizationCountries,
  getProjectCountries,
  isCountryInProjects,
} from "./services/datasetUtils";
import ProjectCard from "./components/ProjectCard";
import Filters from "./components/Filters";
import OrganizationCard from "./components/OrganizationCard";
import "./App.css";
import { getHemisphere } from "./services/mapUtils";

const initialState = {
  cardType: null,
  countries: null,
  project: null,
};

function App() {
  const [map] = useState(prepare(getMapData()));
  const [state, setState] = useState(initialState);
  const updateState = (delta) => {
    const partialNewState = {
      ...initialState,
      ...delta,
    };
    setState({
      ...partialNewState,
      countries:
        partialNewState.countries ||
        (partialNewState.organization
          ? getOrganizationCountries(partialNewState.organization)
          : []),
    });
  };
  const closeEverything = () => updateState({});
  return (
    <div className="dots-map">
      <div className="dots-map__filters-container">
        <Filters
          onDropdownClick={closeEverything}
          onCountryClick={(country) =>
            updateState({ cardType: "country", countries: [country] })
          }
          onProjectClick={(project) =>
            updateState({ cardType: "project", project })
          }
          onOrganizationClick={(organization) =>
            updateState({ cardType: "organization", organization })
          }
        />
      </div>
      <div className="dots-map__map-container">
        <DotsMap
          map={map}
          onCountrySelected={(country) =>
            updateState({ cardType: "country", countries: [country] })
          }
          selectedCountries={state.countries || []}
          selectedColor={window.dotsMapConfig.selectedColor || "#DB4437"}
        />
        {state.cardType && (
          <Backdrop onDismiss={() => setState({})}>
            {state.cardType === "project" && (
              <ProjectCard
                project={state.project}
                onClose={closeEverything}
                className={getProjectCardClassName(state.project)}
              />
            )}
            {state.cardType === "country" && (
              <CountryCard
                country={state.countries[0]}
                onProjectClick={(project) =>
                  setState({ cardType: "project", project })
                }
                onClose={closeEverything}
                className={getCountryCardClassName(state.countries[0])}
              />
            )}
            {state.cardType === "organization" && (
              <OrganizationCard
                organization={state.organization}
                onProjectClick={(project) =>
                  setState({ cardType: "project", project })
                }
                onClose={closeEverything}
                className={getOrganizationCardClassName(state.organization)}
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
      radius: window.dotsMapConfig.dotRadius || getDotRadius(),
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

function getDotRadius() {
  const isSmallScreen = () => document.documentElement.clientWidth < 600;
  const isMediumScreen = () => document.documentElement.clientWidth < 1000;

  if (isSmallScreen()) {
    return 0.8;
  } else if (isMediumScreen()) {
    return 1.2;
  } else {
    return 3;
  }
}

function getProjectCardClassName(project) {
  return getCardHemisphereClassName(
    getHemisphere(getProjectCountries(project)[0])
  );
}

function getCountryCardClassName(country) {
  return getCardHemisphereClassName(getHemisphere(country));
}

function getOrganizationCardClassName(organization) {
  return getCardHemisphereClassName(
    getHemisphere(getOrganizationCountries(organization)[0])
  );
}

function getCardHemisphereClassName(hemisphere) {
  return `dots-map__card--${hemisphere}`;
}
