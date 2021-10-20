const getDataset = () =>
  (
    window.dotsMapConfig.dataset || [
      {
        "organization": "(AEMO) Australian Energy Market Operator",
        "projectName": "Project EDGE",
        "location": "Australia",
        "projectType": "DER Management",
        "description": "Project EDGE is a distributed energy resource marketplace in Eastern Australia where grid operators across the transmission and distribution interface can exchange grid services, such as requesting and buying the solar electricity stored in batteries of thousands of households across Australia to balance the grid.",
        "builtWith": [
          "DIDs",
          "DSB Messaging",
          "Cache Server for Blockchain data"
        ],
        "urls": [
          {
            "linkText": "Case Study",
            "url": "https://dev-energyweb.pantheonsite.io/case-studies/aemo/"
          },
          {
            "linkText": "Microsite",
            "url": "https://www.energyweb.org/aemo/"
          },
          {
            "linkText": "independent analysis",
            "url": "https://www.canarymedia.com/articles/solar/how-blockchain-could-help-integrate-rooftop-solar-and-evs-into-the-grid"
          },
          {
            "linkText": "EW Analysis",
            "url": "https://medium.com/energy-web-insights/canary-in-the-sunshine-australia-is-showing-the-rest-of-the-world-what-a-modern-grid-looks-like-ce95832cc017"
          },
          {
            "linkText": "Announcement",
            "url": "https://medium.com/energy-web-insights/aemo-announces-open-source-operating-system-for-world-leading-distributed-energy-marketplace-design-a211a6f6c415"
          }
        ]
      },
      {
        "organization": "(APG) Austrian Power Grid",
        "projectName": "APG FlexHub",
        "location": "Austria",
        "projectType": "DER Management",
        "description": "This proof of concept established that a decentralized platform can allow customer-sited energy assets (e.g., battery storage systems) to offer their flexibility into a frequency market, be activated when called on, deliver flexibility when activated, and be compensated for any flexibility provided.",
        "builtWith": [
          "DIDs"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/austrian-power-grid-and-energy-web-foundation-launch-proof-of-concept-to-use-distributed-energy-d9a378f5f5ee"
          }
        ]
      },
      {
        "organization": "Bebat, Fluvius",
        "projectName": "EasyBat",
        "location": "Belgium",
        "projectType": "Lifecycle Management",
        "description": "EasyBat is an open-source solution for decentralized lifecycle battery asset management. The solution is built on the Energy Web Decentralized Operating System (EW-DOS) open-source technology stack and focuses on the entire battery lifecycle. Original equipment manufacturers (OEMs), distributors, installers, and accredited inspection and certification organizations issue and verify every relevant asset transaction. The fact that all these entities work together on a shared decentralized ecosystem is an important and never-seen-before innovation. Partners involve Bebat, the Belgian battery compliance scheme and Fluvius, the electricity and natural gas distribution system operator (DSO) for the Flemish Region of Belgium.",
        "builtWith": [
          "DIDs",
          "IAM Client Lib"
        ],
        "urls": [
          {
            "linkText": "microsite",
            "url": "https://www.energyweb.org/technology/applications/ew-switchboard/easybat/"
          },
          {
            "linkText": "announcement",
            "url": "https://medium.com/energy-web-insights/bebat-launches-easybat-an-open-source-decentralized-solution-for-battery-lifecycle-management-281f2ace61e9"
          }
        ]
      },
      {
        "organization": "(CAISO) California Independent System Operator",
        "projectName": "Flex Alert",
        "location": "US",
        "projectType": "DER Management",
        "description": "Energy Web worked with CAISO (a major U.S. transmission grid operator) to enhance its existing Flex Alert program. With the new system, the public in California can subscribe to receive SMS or email alerts whenever the power grid faces a critical need for conservation. Subscribers can then respond when they intend to conserve, allowing CAISO to forecast the level of conservation—all while preserving the privacy of those subscribers.",
        "builtWith": [
          "DIDs"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/california-grid-operator-launches-new-demand-flexibility-platform-enhancements-to-flex-alert-system-e01ae8030da0"
          }
        ]
      },
      {
        "organization": "(DENA) Deutsche Energie-Agentur",
        "projectName": "Digital DER Registry",
        "location": "Germany",
        "projectType": "DER Management",
        "description": "Germany’s federal energy agency, Deutsche Energie-Agentur (DENA), has selected Energy Web to design and construct a digital registry for distributed energy resources (DERs) across the country in partnership with more than 20 industry players. The project will enable energy assets in Germany, such as thermostats, solar PV systems, batteries, and electric vehicle charging stations to undertake automatic registration with a decentralized ledger of identities, allowing their utilisation by the German grid for a range of services such as virtual power plants and frequency regulation.",
        "builtWith": [
          "Energy Web Chain",
          "DIDs",
          "Switchboard"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/dena-selects-energy-web-to-build-prototype-identity-registry-for-germanys-energy-market-2580f53b2d20"
          }
        ]
      },
      {
        "organization": "Electra Caldense, Bamboo Energy",
        "projectName": "ElectraFlex",
        "location": "Spain",
        "projectType": "DER Management",
        "description": "The ElectraFlex project is focusing on the deployment of a digital platform that will allow Electra Caldense to utilize the flexible capacity of assets connected to their electricity network. ElectraFlex is the world’s first decentralized flexibility platform tailored for the specific needs of a distribution system operator (DSO). The multi-faceted flexibility platform is using Energy Web’s EW-DOS technology stack to assign digital identities to all connected assets and flexibility market participants, allowing them to self-register in energy markets, and offer services to Electra Caldense as well as the Spanish transmission system operator (REE) on behalf of their owners.",
        "builtWith": [
          "DIDs",
          "Switchboard"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/catalonian-grid-operator-electra-caldense-energy-web-and-bamboo-energy-announce-grid-flexibility-51c75e5bcc25"
          }
        ]
      },
      {
        "organization": "Elia Group",
        "projectName": "E-Mobility Dashboard",
        "location": "Belgium,\nGermany",
        "projectType": "DER Management",
        "description": "An open platform to simplify identifying electric vehicles and charge points, through digital identities on the Energy Web Chain, which enables all parties to get trustworthy, live and historic data from devices, improving green electricity purchasing and enabling the emergence of other energy services and opportunities for owners and energy companies",
        "builtWith": [
          "DIDs",
          "Switchboard",
          "IAM Client Lib",
          "EWNS Name Service",
          "Cache Server for Blockchain data",
          "OCN"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/elia-group-and-energy-web-launch-multi-year-strategic-partnership-be2c5d87395f"
          }
        ]
      },
      {
        "organization": "ENGIE Energy Access",
        "projectName": "DeFi Crowdfunding for Energy Access",
        "location": "Sub-Saharan Africa",
        "projectType": "Other",
        "description": "ENGIE Energy Access — one of the leading off-grid, Pay-As-You-Go (PAYG) solar and mini-grid solutions providers in Africa, has partnered with Energy Web to accelerate energy access in sub-Saharan Africa through a decentralized finance (DeFi) crowdfunding platform. The DeFi application will be built on the open-source Energy Web tech stack and enable investors to provide microloans that support clean energy deployment",
        "builtWith": [
          "Energy Web Chain"
        ],
        "urls": [
          {
            "linkText": "EWLab project page",
            "url": "https://lab.energyweb.org/engie-energy-access/"
          },
          {
            "linkText": "Announcement",
            "url": "https://medium.com/energy-web-insights/engie-energy-access-and-energy-web-announce-defi-crowdfunding-platform-to-help-scale-solar-mini-2142029ad84f"
          }
        ]
      },
      {
        "organization": "Foton",
        "projectName": "I-REC Marketplace",
        "location": "Turkey",
        "projectType": "Traceability",
        "description": "Foton and EW cooperated to build a production-ready digital marketplace for renewable energy certificates in Turkey in line with the I-REC Standard. The marketplace is up and running and accessible to renewable energy buyers and sellers.",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/foton-and-energy-web-launch-blockchain-based-i-rec-marketplace-in-turkey-e2847db835f"
          }
        ]
      },
      {
        "organization": "Good Energies Foundation",
        "projectName": "Energy Web Zero",
        "location": "Global",
        "projectType": "Traceability",
        "description": "Zero will be a global search engine for renewable energy certificates and other decarbonization products, that are tokenized on the EW Chain. The goal is to simplify procurement processes, increase transparency about available options, and accelerate decarbonization by matching buyers and sellers across the globe.",
        "builtWith": [
          "Energy Web Chain",
          "DIDs",
          "Green Proofs",
          "Zero"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/energy-web-awarded-good-energies-foundation-grant-for-new-global-renewables-marketplace-794eaa7e14e0"
          }
        ]
      },
      {
        "organization": "Google.org",
        "projectName": "Google Impact Challenge",
        "location": "Europe",
        "projectType": "Other",
        "description": "Creating a digital framework for coordinating distributed energy resources (DERs) across the transmission and distribution market interface of Europe’s power grid.",
        "builtWith": [
          "DIDs",
          "Switchboard",
          "DSB Messaging",
          "FlexRunner"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/google-backs-energy-web-to-harmonize-low-carbon-electricity-markets-across-europe-204c18cd2f12"
          }
        ]
      },
      {
        "organization": "LO3 Energy",
        "projectName": "Pando",
        "location": "Global",
        "projectType": "Traceability",
        "description": "",
        "builtWith": "",
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/lo3-energy-updates-pando-platform-migrates-to-energy-web-chain-d709ae0e5311"
          }
        ]
      },
      {
        "organization": "Mercados Eléctricos",
        "projectName": "I-REC Marketplace",
        "location": "El Salvador",
        "projectType": "Traceability",
        "description": "Mercados Eléctricos and EW cooperated to build a pilot digital marketplace for renewable energy certificates in El Salvador to assess a business case for and technical feasibility of a blockchain-based regional I-REC marketplace. Since El Salvador did not have an I-REC market in the beginning of the pilot (2019), Mercados Eléctricos also took a successful lead in establishing The I-REC Standard in the country. In the near future, up to 200 devices in El Salvador are planned to be added to this pilot platform.",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/central-american-electricity-retailer-mercados-el%C3%A9ctricos-and-energy-web-complete-first-stage-of-a147541c8c44"
          }
        ]
      },
      {
        "organization": "Minden",
        "projectName": "Energy Matching",
        "location": "Japan",
        "projectType": "Traceability",
        "description": "Testing EWC for blockchain-based matching engine for producers and consumers of renewable energy",
        "builtWith": "",
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/energy-web-foundation-and-minna-denryoku-conclude-test-of-blockchain-for-japanese-renewable-energy-bf0627a9ccff"
          }
        ]
      },
      {
        "organization": "NV Energy",
        "projectName": "PEC Marketplace",
        "location": "US",
        "projectType": "Traceability",
        "description": "EW, Blockchains LLC and the Public Utility Commission (PUC) of Nevada cooperated in testing blockchain-based technologies, including the Origin SDK and its issuer module, for creating a modern tracking system for Nevada's renewable energy certificates (\"PECs\").",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/nv-energy-blockchains-llc-and-energy-web-announce-blockchain-pilot-for-nevadas-residential-bbf4571179da"
          }
        ]
      },
      {
        "organization": "PJM EIS",
        "projectName": "GATS - Generation Attribute Tracking System",
        "location": "US",
        "projectType": "Traceability",
        "description": "PJM and EW cooperated in a year-long partnership to test blockchain-based tools (including the Origin SDK) for creating a digital marketplace for voluntary RECs. Several buyers and sellers of RECs tested the marketplace, which was integrated with the PJM GATS registry.",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin"
        ],
        "urls": [
          {
            "linkText": "partner announcement",
            "url": "https://insidelines.pjm.com/pjm-eis-completes-blockchain-pilot-with-energy-web-foundation"
          },
          {
            "linkText": "Announcement",
            "url": "https://medium.com/energy-web-insights/pjm-eis-update-modernizing-a-legacy-u-s-rec-tracking-system-with-blockchain-based-technology-db0ad5a4f924"
          }
        ]
      },
      {
        "organization": "Protocol Labs, Filecoin",
        "projectName": "Proof of Green Mining",
        "location": "Global",
        "projectType": "Traceability",
        "description": "In support of the Crypto Climate Accord (CCA), Protocol Labs and Energy Web executed showcase of an open-source solution for decentralized renewable energy purchasing by crypto miners. Six Filecoin storage providers (i.e., miners) purchased verified renewable energy certificates from 3Degrees and SP Group using Energy Web Zero, a public renewable energy search engine. The solution will eventually be applicable across any blockchain to make it easy for any crypto miner to deliver proof of green mining.",
        "builtWith": [
          "Energy Web Chain",
          "DIDs",
          "Green Proofs",
          "Zero"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/protocol-labs-and-energy-web-complete-first-showcase-of-an-open-source-solution-to-decarbonize-1a8c22ac02f5"
          }
        ]
      },
      {
        "organization": "PTT",
        "projectName": "I-REC Marketplace",
        "location": "Thailand",
        "projectType": "Traceability",
        "description": "PTT and EW cooperated to build a production-ready digital marketplace for renewable energy certificates in Thailand/APAC in line with the I-REC Standard. The marketplace, ReAcc, is starting off with the I-REC certificates but has other products on the roadmap such as digitizing PPAs and green EV charging.",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://energyweb.org/2019/09/11/ptt-and-energy-web-foundation-launch-blockchain-based-renewables-platform-for-thailand-asean-japan/"
          }
        ]
      },
      {
        "organization": "Riddle&Code Energy Solutions",
        "projectName": "MyPower",
        "location": "Austria",
        "projectType": "Traceability",
        "description": "",
        "builtWith": [
          "DIDs"
        ],
        "urls": [
          {
            "linkText": "microsite",
            "url": "https://www.riddleandcode.com/smart-energy"
          },
          {
            "linkText": "Project announcement",
            "url": "https://www.ledgerinsights.com/wien-energie-riddlecode-tokenize-renewable-energy-installations-blockchain"
          }
        ]
      },
      {
        "organization": "Ripple, XRP Foundation",
        "projectName": "Blockchain Decarbonization",
        "location": "Global",
        "projectType": "Traceability",
        "description": "",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin"
        ],
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/xrp-ledger-foundation-ripple-and-energy-web-announce-worlds-first-decarbonized-blockchain-5c3cecbff31a"
          }
        ]
      },
      {
        "organization": "Share&Charge",
        "projectName": "Open Charging Network (OCN)",
        "location": "Global",
        "projectType": "E-Mobility",
        "description": "Share&Charge’s OCN is a decentralized e-roaming solution for seamless electric vehicle (EV) charging across different charge point networks. Since March 2020, the OCN has migrated onto the EnergyWeb Chain and is now a fully decentralized Applications on the EW network.",
        "builtWith": "",
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/share-charge-foundation-launches-open-charging-network-on-energy-web-chain-84af7f6f5b3c"
          }
        ]
      },
      {
        "organization": "Sonnen",
        "projectName": "Proof of Green Storage",
        "location": "Germany",
        "projectType": "Traceability",
        "description": "Onboarding storage assets on the grid and storing excess renewable energy",
        "builtWith": "",
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/sonnen-leverages-energy-web-chain-ew-origin-for-virtual-power-plant-that-saves-wind-energy-862d54df4bed"
          }
        ]
      },
      {
        "organization": "Stedin",
        "projectName": "Stedin Layered Energy System",
        "location": "The Netherlands",
        "projectType": "DER Management",
        "description": "",
        "builtWith": [
          "DIDs",
          "Switchboard"
        ],
        "urls": []
      },
      {
        "organization": "SunSpec Alliance",
        "projectName": "EW-DOS SunSpec Modbus Extension",
        "location": "US",
        "projectType": "DER Management",
        "description": "Solar + Storage ‘Plug & Play’ Solutions",
        "builtWith": "",
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/sunspec-alliance-joins-energy-web-announces-strategic-partnership-43c8438f199d"
          }
        ]
      },
      {
        "organization": "The Energy Origin",
        "projectName": "The Energy Origin (TEO)",
        "location": "Europe",
        "projectType": "Traceability",
        "description": "",
        "builtWith": "",
        "urls": [
          {
            "linkText": "The Energy Origin website",
            "url": "https://theenergyorigin.com/"
          },
          {
            "linkText": "Learn more",
            "url": "https://energyweb.org/2019/09/19/blockchain-teo-the-energy-origin-is-the-first-application-to-migrate-onto-the-energy-web-chain/"
          }
        ]
      },
      {
        "organization": "The I-REC Standard",
        "projectName": "I-REC Registry Integration",
        "location": "Global",
        "projectType": "Traceability",
        "description": "The latest release of  EW Origin, an open-source software development kit (SDK) for the easier and efficient building of decentralized applications for tracking and trading renewable electricity. This release is especially relevant for companies interested in developing and/or operating a digital platform for renewable energy certificates, specifically in line with the I-REC Standard. EW Origin SDK offers integration with the I-REC registry through the full I-REC API, which means digital marketplaces built with EW Origin can offer device and certificate management functionalities that automatically synchronize with the I-REC registry.",
        "builtWith": [
          "Energy Web Chain",
          "EW Origin",
          "Zero"
        ],
        "urls": [
          {
            "linkText": "The Energy Origin website",
            "url": "https://theenergyorigin.com/"
          },
          {
            "linkText": "Learn more",
            "url": "https://energyweb.org/2019/09/19/blockchain-teo-the-energy-origin-is-the-first-application-to-migrate-onto-the-energy-web-chain/"
          }
        ]
      },
      {
        "organization": "Vodafone Business",
        "projectName": "SIM-centric blockchain enabled IoT",
        "location": "Global",
        "projectType": "DER Management",
        "description": "Vodafone Business and EW created a new partnership to help improve the integration of renewable and distributed energy assets within power grids using secure IoT connectivity and blockchain technology.\nThe partnership will combine SIM-centric blockchain technology (SCB) with IoT connectivity from Vodafone Business to create secure IDs for energy assets on the EnergyWeb Chain. This means that renewable and distributed assets like wind turbines, batteries, heat pumps, and solar panels can be integrated with energy grids safely and efficiently.",
        "builtWith": "",
        "urls": [
          {
            "linkText": "Learn more",
            "url": "https://medium.com/energy-web-insights/vodafone-business-and-energy-web-collaborate-to-bring-iot-and-blockchain-technologies-to-renewable-aac4d68502de"
          }
        ]
      }
    ]
  )
    .map(parseUrls)
    .map(transformBuiltWith);

export default getDataset;

function parseUrls(project) {
  return {
    ...project,
    urls: Array.isArray(project.urls) ? project.urls : JSON.parse(project.urls),
  };
}

function transformBuiltWith(project) {
  return {
    ...project,
    builtWith: Array.isArray(project.builtWith)
      ? pairLinkTextToUrl(project.builtWith)
      : [],
  };
}

function pairLinkTextToUrl(builtWith) {
  const builtWithUrls = {
    DIDs:                               "https://energy-web-foundation.gitbook.io/energy-web/foundational-concepts/self-sovereign-identity#decentralized-identifiers-dids",
    Switchboard:                        "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/application-layer/identity-management-applications#switchboard",
    "IAM Client Lib":                   "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/utility-layer-1#identity-access-and-management-iam-client-library",
    "DSB Messaging":                    "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/utility-layer-1#decentralized-service-bus-dsb",
    "Cache Server for Blockchain data": "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/utility-layer-1#identity-access-and-management-iam-cache-server",
    Staking:                            "https://energy-web-foundation.gitbook.io/energy-web/token/staking",
    Watchtower:                         "",
    "EWNS Name Service":                "https://energy-web-foundation.gitbook.io/energy-web/how-tos-and-tutorials/using-the-ethereum-name-service-ens",
    "EKC- Enterprise Key Connect":      "",
    "Energy Web Chain":                 "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/trust-layer-energy-web-chain",
    "EW Origin":						            "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/application-layer/clean-energy-traceability-applications#origin-core-sdk",
	  FlexRunner:						              "",
	  Zero:								                "https://energy-web-foundation.gitbook.io/energy-web/technology/the-stack/application-layer/clean-energy-traceability-applications#zero-in-development",
	  "Green Proofs":						          "",
  };
  return builtWith.map((linkText) => ({
    linkText,
    url: builtWithUrls[linkText],
  }));
}
