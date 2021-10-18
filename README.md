# Dots map

An interactive map made out of dots where we plot project information of the [EWF](https://www.energyweb.org/).

## DATA SOURCES
- [Project List](https://docs.google.com/spreadsheets/d/1xFa9h8hoI8dXxrx6I_9XPfoEk-QUOKJ6C-uELhDJEnk/edit#gid=281767465)
- [Company List](https://docs.google.com/spreadsheets/d/1xbzTPciBTE7KnfW4VEB1o7ILuVcdV52TuZCJQxFRKlg/edit#gid=581177707)

## Preparing the DATA for correct JSON conversion
It's important that the JSON file is well formed directly in the spreadsheet so follow this format, especially for the url

- double quotations marks around each key and value

```
[{
"linkText": "Learn more",
 "url": "httpURL1"
 }]
```
- avoid trailing comas  ,  after the last value inside an object

```
{"key": "value", } // this is wrong because it has a trailing coma
{"key": "value"}   // this is RIGHT because it has no trailing coma
```
- use a [CSV to JSON converter](https://www.convertcsv.com/csv-to-json.htm)
- test to see if it is well formed or not

```js
////////////////////  STEPS to Verify if the JSON has problems
// 1 - convert the CSV  with https://www.convertcsv.com/csv-to-json.htm
// 2 - copy the output to the clipboard
// 3 - open a js console in a browser window or anywhere else and create an object
//      var project = >>>PASTE HERE THE ARRAY <<< 
//var projects = [{...},{...}]
// then run this code to see which project has problems
projects.forEach(p => { 
    try {
        console.log(JSON.parse(p.urls))
    } catch (e) {
        console.log("project " + p.projectName + " by " + p.organization + "  - has problems e: " + e) 
    }
   }  
  )
```

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
