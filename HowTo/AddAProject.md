# How to add a New Project

There are 2 ways to add a project to the list

1. [Method 1](#method1) adding it to the [Project List](https://docs.google.com/spreadsheets/u/1/d/1xFa9h8hoI8dXxrx6I_9XPfoEk-QUOKJ6C-uELhDJEnk/htmlview?pru=AAABfbYNoWA*dF_yuDKDoZyMpZNmh5fSBw#) (tab `project_index_edits_for_main_site`) and exporting the data (longer but better)
2. [Method 2](#method2) adding the project directly in the [/src/data/dataset.js](./src/data/dataset.js) file



## <a name="method1">Method 1</a> - Editing and exporting the project list

this is the longest method, but ensures that the data is always in sync between the spreadsheet and the project map. 
but you can also do method Nr2 and then add it by hand to the excel sheet

### 1.1 - Edit the Project List
add the project as a line in the [Project List](https://docs.google.com/spreadsheets/u/1/d/1xFa9h8hoI8dXxrx6I_9XPfoEk-QUOKJ6C-uELhDJEnk/htmlview?pru=AAABfbYNoWA*dF_yuDKDoZyMpZNmh5fSBw#) tab `project_index_edits_for_main_site`

### 1.2 Preparing the DATA for correct JSON conversion

It's important that the JSON file is well formed directly in the spreadsheet so follow this format, especially for the url

- double quotations marks around each key and value

```
[{
"linkText": "Learn more",
 "url": "httpURL1"
 }]
```

- avoid trailing comas , after the last value inside an object

```
{"key": "value", } // this is wrong because it has a trailing coma
{"key": "value"}   // this is RIGHT because it has no trailing coma
```

### 1.3 Export the data to CSV and JSON

- use a CSV to JSON converter like like [csvjson](https://csvjson.com/csv2json) (important: use the "Parse Json" option)
  beware of other solutions like [convertcsv](https://www.convertcsv.com/csv-to-json.htm) that don't parse the json
- test to see if it is well formed or not

```js
////////////////////  OPTIONAL STEPS to Verify if the JSON has problems
// 1 - convert the CSV  with https://csvjson.com/csv2json
// 2 - copy the output to the clipboard
// 3 - open a js console in a browser window or anywhere else and create an object
//      var project = >>>PASTE HERE THE ARRAY <<<
//var projects = [{...},{...}]
// then run this code to see which project has problems
projects.forEach((p) => {
  try {
    console.log(JSON.parse(JSON.stringify(p)));
  } catch (e) {
    console.log(
      "project " +
        p.projectName +
        " by " +
        p.organization +
        "  - has problems e: " +
        e
    );
  }
});
```

### 1.4 add the JSON to the dataset
- copy the JSON
- open the [dataset.js](./src/data/dataset.js) 
- select and delete the object inside of `window.dotsMapConfig.dataset || [` and the trailing `]`
- paste the copied json inside the `window.dotsMapConfig.dataset || [` paste_here `]`
- save the file and test it



## <a name="method2">Method 2</a> - Add a Project by editing directly the dataset.js file
- open the [dataset.js](./src/data/dataset.js) 
- add a sample project like this below

```
{
        organization: "AAA-Test New Project",
        projectName: "AAA-TEST Project",
        location: "Germany",
        projectType: "DER Management",
        description:
          "description of project Test",
        builtWith: ["DIDs", "DSB Messaging"],
        urls: [
          {
            linkText: "Learn more",
            url: "https://medium.com/energy-web-insights/austrian-power-grid-and-energy-web-foundation-launch-proof-of-concept-to-use-distributed-energy-d9a378f5f5ee",
          },
        ],
      },
```
Important notes:

- the `location` must be one of the country ids in [map.js](./src/dataset/map.js) (font case doesn't matter = you can write "Germany" even if the country id inside of map.js is "germany")
- the `builtWith` needs to be either 
 - one of the available component names in [`builtWithUrls`](https://github.com/energywebfoundation/ewf-2021-projectMap/blob/5ac084f6d12612a7c56bac455db7f27f5d294e43/src/data/dataset.js#L481) object in [dataset.js](./src/data/dataset.js.js) - if you want it to have a link
 - or any other string you want (but it won't have a link)