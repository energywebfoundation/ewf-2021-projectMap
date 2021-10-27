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
        countries: ["angola", "benin", "botswana", "burkina_faso","burundi","congo", "cameroon", "cape_verde", "comoros","central_sub-saharan_african_republic","chad", "democratic_republic_of_congo", "djibouti","equatorial_guinea","eritrea", "ethiopia", "eswatini", "gambia","gabon", "ghana", "guinea_bissau", "republic_of_guinea", "ivory_coast","kenya","lesotho","liberia","madagascar","mali", "malawi","mauritius","mauritania","mozambique", "namibia", "niger", "nigeria","rwanda", "sao_tome_and_principe", "senegal", "sierra_leone", "somalia","south_sudan","south_sub-saharan_africa", "sudan","tanzania", "togo","uganda", "zambia", "zimbabwe" ],
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
