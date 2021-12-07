# How to add an Organization

Organizations or companies appear in the `partners` tab of the project map

There are 2 methods to add a company description

1. adding it by hand to the [./src/data/organizationProfiles.js](./src/data/organizationProfiles.js)
2. adding it to the [List_Companies](https://docs.google.com/spreadsheets/d/1xbzTPciBTE7KnfW4VEB1o7ILuVcdV52TuZCJQxFRKlg/edit?usp=sharing) spreadsheet and exporting it all items

Method 1 is suggested as it is faster.<br>

Method 2 is fine if you want to keep track also on the google sheets. Method 2 follows a similar dynamic to ["How to add a new Project"](./AddAProject.md), so read the instructions there first, but use the [List_Companies](https://docs.google.com/spreadsheets/d/1xbzTPciBTE7KnfW4VEB1o7ILuVcdV52TuZCJQxFRKlg/edit?usp=sharing) spreadsheet

## 1 - editing organizationProfiles.js by hand

- open [./src/data/organizationProfiles.js](./src/data/organizationProfiles.js)
- duplicate any of the objects or copy paste this one into the array

```
{
      acronym: "AEMO",
      name: "Australian Energy Market Operator",
      type: "TSO",
      groups: "projects",
      country: "Australia",
      logo: "Affiliate-Logo-AEMO-PRIMARY-1024x395.png",
      description:
        "insert company description here",
      url: "https://aemo.com.au",
    },
```
- prepare a company logo and add it to the [public/icons](../public/icons/) folder
 - constraint the width of the logo to 25px (this should be changed in the future)
 
 ### Note on the naming
 the [dataset.js](../src/data/dataset.js) concatenates the 

	- `organizationProfiles.acronym` (eg: _AEMO_)
	- and `organizationProfiles.name` (eg: _Australian Energy Market Operator_)

which will result in `dataset.organization: "(AEMO) Australian Energy Market Operator"`
	
it's indifferent to the code if you add or not an acronym
