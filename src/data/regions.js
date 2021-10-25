export default function getRegions() {
  return (
    window.dotsMapConfig.regions || [
      {
        id: "global",
        countries: [],
      },
      {
        id: "europe",
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
        countries: ["japan", "australia", "thailand"],
      },
      {
        id: "sub-saharan_africa",
        countries: [],
      },
      {
        id: "el_salvador",
        countries: ["el_salvador"],
      },
    ]
  );
}
