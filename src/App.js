import { useEffect, useState, useRef } from "react";
import DragIndicator from "./components/DragIndicator";
import DotsMap from "./components/DotsMap";
import getMapData from "./data/map";
import {
  getProjectCountries,
  isCountryInProjects,
} from "./services/datasetUtils";
import "./App.css";
import useMediumScreen from "./hooks/useMediumScreen";
import Sidebar from "./components/Sidebar";
import { getCountriesByRegion, isEuropean } from "./services/mapUtils";
import unique from "./services/unique";
import isMobile from "ismobilejs";

function App() {
  const [isProcessingResize, setProcessingResize] = useState(false);
  const isMediumScreen = useMediumScreen();
  const [map] = useState(prepare(getMapData()));
  const [result, openResult] = useState(undefined);
  const selectedCountries = useSelectedCountries(result);
  const mapContainerRef = useRef();
  useEffect(() => {
    if (isMobile().any) {
      return;
    }
    window.addEventListener("resize", () => {
      setProcessingResize(true);
      setTimeout(() => setProcessingResize(false), 500);
    });
  }, []);
  useEffect(() => {
    if (!isMediumScreen || !mapContainerRef.current) {
      return;
    }
    scrollToMiddle(mapContainerRef.current.querySelector("svg"));
  }, [isMediumScreen, mapContainerRef]);
  return (
    <div className={`dots-map ${isProcessingResize ? "dots-map--hidden" : ""}`}>
      <div className="dots-map__left-bar">
        <Sidebar
          result={result}
          openResult={openResult}
          closeResult={() => openResult(null)}
        />
      </div>
      <div className="dots-map__right-container">
        <div className="dots-map__map-container" ref={mapContainerRef}>
          <DotsMap
            map={map}
            onCountrySelected={(country) => {
              if (isEuropean(country) || country === "europe") {
                openResult({
                  category: "region",
                  value: "europe",
                });
              } else {
                openResult({
                  category: "country",
                  value: country,
                });
              }
            }}
            selectedCountries={selectedCountries}
          />
        </div>
        {isMediumScreen && <DragIndicator />}
      </div>
    </div>
  );
}

export default App;

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
  const colors = window.dotsMapConfig.randomColorSet || ["#9963f7"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getDotRadius() {
  return 2.5;
}

function useSelectedCountries(result) {
  const [selectedCountries, setSelectedCountries] = useState([]);
  useEffect(() => {
    const getEuropeanCountries = () =>
      getCountriesByRegion("europe").filter(isCountryInProjects);

    if (!result) {
      setSelectedCountries([]);
      return;
    }
    switch (result.category) {
      case "project": {
        setSelectedCountries(
          unique(
            getProjectCountries(result.value).flatMap((country) =>
              isEuropean(country) ? getEuropeanCountries() : country
            )
          )
        );
        break;
      }
      case "country": {
        setSelectedCountries(
          isEuropean(result.value) ? getEuropeanCountries() : [result.value]
        );
        break;
      }
      case "region": {
        setSelectedCountries(
          getCountriesByRegion(result.value).filter(isCountryInProjects)
        );
        break;
      }
      default: {
        setSelectedCountries([]);
      }
    }
  }, [result]);
  return selectedCountries;
}

async function scrollToMiddle(element) {
  // XXX: Possibly the least elegant solution to the problem, I know
  const interval = setInterval(() => {
    element.parentElement.scrollTo({
      left: (element.clientWidth - window.innerWidth) / 2,
      top: 0,
      behavior: "instant",
    });
  }, 25);
  setTimeout(() => clearInterval(interval), 1500);
}
