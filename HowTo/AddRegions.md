# How to add or edit a Region

Regions are configured in the [/src/data/regions.js](./src/data/regions.js): file

you can
 
1. add more countries to a region
2. create new regions


## Regions Configuration

Regions have their own dataset, `data/regions.js`. Here's an explanation on what each field of each region mean:

```js
{
    // ID of the region. Must be unique.
    id: "us",
    // Name of the region as it will be displayed.
    readableName: "United States",
    // IDs of the countries that compose that region according to the map dataset. Each country in the list will be highlighted in the map.
    countries: ["us"],
    // (optional) Relative position of the circle with the projects count as it will be rendered in the map. If not provided, the app attempts to compute it
    // by averaging the positions of the countries.
    relativePosition: {
        // 0 means extreme left and 1, extreme right
        x: 0.2,
        // 0 means top and 1, bottom
        y: 0.4
    }
}
```

This configuration allows you to define regions such as Europe, but as seen in the example, you can also define individual countries as regions. Using countries as regions will render their floating-clickable circles on the map.



## 1 - Add more countries to a region

1. First identify the `id` of the country you want to add from the [map.js](../src/data/map.js) file
2. Add that id to the list of countries in the regions.js file

eg: imagine you want to add "south africa" to the "sub saharan africa region": check in the map for the "id" which in this case is `south_sub-saharan_africa`  and add it to the
`regions.countries` of the region you want


## 2 - Creating a new Region

Imagine you want to create the region "South America" with the countries Brazil and Argentina

- add a block among the regions

```
{
  id: "south_america",
  readableName: "South America",
  countries: ["brazil", "argentina"],
},
```
- add any country you want in the "countries" array. Remember, these should be the "ids" that appear in the [map.js](../src/data/map.js) file

- you will then need to add the flag for the region in the [public/icons](../public/icons/) folder




### IMPORTANT

{% note %}
<p class="callout warning"> Important: when you add a new region, make sure there is actually a project in any of the countries of that project</p>
{% endnote %}