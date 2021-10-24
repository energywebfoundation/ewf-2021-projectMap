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
import { getMapEntry, isRegion } from "./services/mapUtils";
import isMobile from "ismobilejs";

function App() {
  const [isProcessingResize, setProcessingResize] = useState(false);
  const isMediumScreen = useMediumScreen();
  const [map] = useState(prepare(getMapData()));
  const [result, openResult] = useState(undefined);
  const selectedRegion = useSelectedRegion(result);
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
            onRegionClick={(region) => {
              if (!result || result.value !== region) {
                openResult({
                  category: isRegion(region) ? "region" : "country",
                  value: region,
                });
              }
            }}
            selectedRegion={selectedRegion}
          />
        </div>
        <DragIndicator isVisible={isMediumScreen} />
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
      radius: dot.radius || window.dotsMapConfig.dotRadius || getDotRadius(),
    })),
  }));
}

function getRandomColor() {
  const colors = window.dotsMapConfig.randomColorSet || ["#9963f7"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getDotRadius() {
  return 2;
}

function useSelectedRegion(result) {
  const isDefined = (x) => !!x;
  const [selectedRegion, setSelectedRegion] = useState(null);
  useEffect(() => {
    if (!result) {
      setSelectedRegion(null);
      return;
    }
    switch (result.category) {
      case "project": {
        setSelectedRegion(
          getProjectCountries(result.value)
            .flatMap(getMapEntry)
            .filter(isDefined)
            .map(({ region }) => region)[0]
        );
        break;
      }
      case "region": {
        setSelectedRegion(result.value);
        break;
      }
      default: {
        setSelectedRegion(null);
      }
    }
  }, [result]);
  return selectedRegion;
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
