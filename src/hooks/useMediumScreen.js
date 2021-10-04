import { useState, useEffect } from "react";

export default function useMediumScreen() {
  const [mediumScreen, setMediumScreen] = useState(isMediumScreen());
  useEffect(() => {
    window.addEventListener("resize", () => setMediumScreen(isMediumScreen()));
  }, []);
  return mediumScreen;
}

function isMediumScreen() {
  return document.documentElement.clientWidth < 800;
}
