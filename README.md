# Dots map

An interactive map made out of dots where we plot project information of the [EWF](https://www.energyweb.org/).

## Build

This application has been created with [create-react-app](https://create-react-app.dev/). To build it, simply run:

```bash
npm run build
```

The resulting JS + HTML + CSS will be generated in the `build` folder.

## API

This app exposes a simple API via `window.dotsMapApi`.

### Select countries

Highlights the countries in the map. Optionally, opens the card for the first one.

```js
/**
 * @param {Array<string>} countries - list of country names
 * @param {boolean} openCard - set to true to open the card for the first country in the array
 */
window.dotsMapApi.selectCountries(countries, openCard);

// Example
window.dotsMapApi.selectCountries(["spain", "portugal"], true);
```

### Select organization

Highlights the countries of the organization in the map. Optionally, opens the card for the organization. If the organization has multiple projects, a list of those projects will be open in the card. If the organization has a single project, a card for the project is open.

```js
/**
 * @param {string} organization - organization name
 * @param {boolean} openCard - set to true to open the card for the organization
 */
window.dotsMapApi.selectOrganization(organization, openCard);

// Example
window.dotsMapApi.selectOrganization("Mercados Eléctricos", false);
```

### Select project

Highlights the countries of the project in the map. Optionally, opens the card for the project.

```js
/**
 * @param {string} project - project name
 * @param {boolean} openCard - set to true to open the card for the project
 */
window.dotsMapApi.selectProject(organization, openCard);

// Example
window.dotsMapApi.selectProject("Energy Matching", true);
```

## Configuration

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
    // Color for the dots of the countries currently selected
    selectedColor: "#DB4437",
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
    ]
}
```

TODO

- Reposition color balls on resize.
- What about cards on desktop?
- What about searching without type in desktop?
- Result list for mobile.
- Cards for mobile.
