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
        relativePosition: {
          x: 0.54,
          y: 0.65,
        },
      },
      {
        id: "us",
        readableName: "United States",
        countries: ["us"],
        relativePosition: {
          x: 0.2,
          y: 0.4,
        },
      },
      {
        id: "el_salvador",
        readableName: "El Salvador",
        countries: ["el_salvador"],
      },
    ]
  );
}
