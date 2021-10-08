# Dots map

An interactive map made out of dots where we plot project information of the [EWF](https://www.energyweb.org/).

## Build

This application has been created with [create-react-app](https://create-react-app.dev/). To build it, simply run:

```bash
npm run build
```

The resulting JS + HTML + CSS will be generated in the `build` folder.

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
