import React from "react";
import Card from "./Card";

const ProjectCard = ({ project }) => (
  <Card
    subtitle={project.projectName}
    body={<ProjectCardContent project={project} />}
  />
);

export default ProjectCard;

const ProjectCardContent = ({ project }) => (
  <div
    style={{
      flexGrow: 1,
      margin: 25,
      marginTop: 15,
      marginBottom: 15,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <section>
      <HorizontalDef dt="Type" dd={project.projectType} />
      <HorizontalDef dt="Country" dd={project.location} />
      <HorizontalDef dt="Partner" dd={project.organization} />
    </section>
    <p
      style={{
        fontSize: 14,
        marginTop: 17,
        color: "#9b9b9b",
        flexGrow: 1,
      }}
    >
      {project.description}
    </p>
    <ul>
      {project.urls.map(({ linkText, url }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 12,
              color: "#4F4F4F",
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <span style={{ display: "inline-block", marginRight: 8 }}>
              {linkText.toLowerCase()}
            </span>
            <span style={{ fontSize: 16 }}>&rarr;</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const HorizontalDef = ({ dt, dd }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <div style={{ width: "20%" }}>
      <strong>{dt}: </strong>
    </div>
    <div style={{ flexGrow: 1 }}>{dd}</div>
  </div>
);
