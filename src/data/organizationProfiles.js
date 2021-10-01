const getOrganizationProfiles = () =>
  window.dotsMapConfig.organizationProfiles || [
    {
      acronym: "AEMO",
      name: "Australian Energy Market Operator",
      type: "TSO",
      groups: "projects",
      country: "Australia",
      logo: "Affiliate-Logo-AEMO-PRIMARY-1024x395.png",
      description:
        "The Australian Energy Market Operator performs an array of gas and electricity market, operational, development and planning functions. It manages the National Electricity Market, the Wholesale Electricity Market and the Victorian gas transmission network.",
      url: "https://aemo.com.au",
    },
  ];

export default getOrganizationProfiles;
