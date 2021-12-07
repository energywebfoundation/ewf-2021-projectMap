# Dots map

An interactive map made out of dots where we plot project information of the [EWF](https://www.energyweb.org/).

## DATA SOURCES

- [Project List](https://docs.google.com/spreadsheets/d/1xFa9h8hoI8dXxrx6I_9XPfoEk-QUOKJ6C-uELhDJEnk/edit#gid=281767465)
- [Company List](https://docs.google.com/spreadsheets/d/1xbzTPciBTE7KnfW4VEB1o7ILuVcdV52TuZCJQxFRKlg/edit#gid=581177707)


# HOW TOs

### ////  Explainer of the parts
The data set is made of 4 files inside of [/src/data/](./src/data/) folder.

2 files with info about the projects and companies

- [dataset.js](./src/data/dataset.js) : contains the project details, and the links to the components pages in the [`builtWithUrls`](https://github.com/energywebfoundation/ewf-2021-projectMap/blob/5ac084f6d12612a7c56bac455db7f27f5d294e43/src/data/dataset.js#L481) object
- [organizationProfiles.js](./src/data/organizationProfiles.js) that contains the descriptions of the companies that appear in the "partners" tab

and 2 files relating to the map

- [map.js](./src/data/map.js): contains the locations of the dots in the map and a reference to the country name they belong to
- [regions.js](./src/data/regions.js): contains the regions or groups of countries (= the ids available in `map.js`)


### //// Tutorials
- [How to add a new project](./HowTo/AddAProject.md)
- [How to add a new Organization](./HowTo/AddAnOrganization.md)
- [How to add or edit a Region](./HowTo/AddRegions.md)


## Build

This application has been created with [create-react-app](https://create-react-app.dev/). To build it, simply run:

```bash
npm run build
```

The resulting JS + HTML + CSS will be generated in the `build` folder.

## Styling

This app uses base styles from [Tailwind](https://tailwindcss.com/) and some custom CSS with a BEM-like notation, where all classes start with the `dots-map` prefix.

For some colors, we've used CSS variables.

```
  --main-color: #9963f7;
  --text-main-color: #060606;
  --text-secondary-color: #9b9b9b;
  --light-background: #f9f9f9;
  --border-color: #ebebeb;
  --standard-country-color: #a466ff;
  --hovered-country-color: #7907fe;
  --selected-country-color: #fd51a1;
```



## Global Configuration

The app is externally configurable via a `dotsMapConfig` object on `windows` that must exist before the application starts.

```js
window.dotsMapConfig = {
    // Color of the regular dots on the map
    dotColor: "#C8C8CA",
    // Radius of the dots on the map
    dotRadius: 1.2,
    // Colors to choose from when coloring countries that appear in the dataset
    // Avoid using random colors by defining colors in the map itself
    randomColorSet: [
        "#A566FF",
        ...
    ],
    // The data we plot in the map
    dataset: [
        {
            organization: "Acme, Ace",
            projectName: "X-Ray",
            location: "Ruritania",
            projectType: "Frob",
            description: "Lorem ipsum dolor sit amet",
            urls: [
                {
                    linkText: "See more",
                    url: "https://www.energyweb.org/x-ray/"
                },
                ...
            ]
        },
        ...
    ],
    // An array of countries, each with a list of dots. The position of the dots
    // is in the range 0-1, and the ids of the countries must match the ones used
    // in the dataset for project locations (case insensitive).
    map: [
        {
            id: "ruritania",
            color: "#A566FF"
            dots: [
                {
                    id: "3", // Must be unique for the country
                    x: 0.6610171197945679,
                    y: 0.4576315202142314
                },
                ...
            ]
        },
        ...
    ],
    // Extended information on organizations that is displayed on the clients dropdown
    organizationProfiles: [
        {
            acronym: "ACME",
            name: "Acme INC.",
            logo: "logo.png",
            description: "Lorem ipsum dolor sit amet",
        },
        ...
    ],
    // regions configuration
    regions: [
      {
        id: "europe",
        readableName: "Europe",
        countries: ['spain'],
        relativePosition: {
          x: 0.54,
          y: 0.65,
        },
      },
      ...
    ]
}
```
