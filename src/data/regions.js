export default function getRegions() {
  return (
    window.dotsMapConfig.regions || [
      {
        id: "global",
        readableName: "Global",
        countries: [],
      },
      {
        id: "europe",
        readableName: "Europe",
        countries: [
          "austria",
          "belgium",
          "germany",
          "spain",
          "the_netherlands",
          "turkey",
        ],
      },
      {
        id: "apac",
        readableName: "APAC",
        countries: ["japan", "australia", "thailand"],
      },
      {
        id: "sub-saharan_africa",
        readableName: "Sub-Saharan Africa",
        countries: [],
      },
      {
        id: "us",
        readableName: "United States",
        countries: ["us"],
      },
      {
        id: "el_salvador",
        readableName: "El Salvador",
        countries: ["el_salvador"],
      },
    ]
  );
}
