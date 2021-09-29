import React from "react";
import Card from "./Card";

const ProjectListCard = ({ country, projects }) => (
  <Card
    title={`Country: ${country}`}
    header={<ProjectListCardHeader projectsCount={projects.length} />}
    body={<ProjectListCardContent projects={projects} />}
  />
);

export default ProjectListCard;

const ProjectListCardHeader = ({ projectsCount }) => (
  <strong style={{ fontSize: "22px" }}>{projectsCount} Projects</strong>
);

const ProjectListCardContent = ({ projects }) => (
  <ul>
    {projects.map((project, index) => (
      <li
        key={index}
        style={{
          borderTop: index > 0 ? "1px solid #C4C4C4" : undefined,
          padding: 25,
          paddingTop: 13,
          paddingBottom: 16,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ProjectListEntry project={project} />
        <div style={{ marginLeft: 4 }}>
          <GoToButton />
        </div>
      </li>
    ))}
  </ul>
);

const ProjectListEntry = ({ project }) => (
  <div style={{ flexGrow: 1 }}>
    <u style={{ color: "#A566FF", textDecoration: "none" }}>
      {project.projectType}
    </u>
    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: 4 }}>
      {project.projectName}
    </h3>
    <strong style={{ display: "block", marginTop: 4 }}>
      {project.organization}
    </strong>
  </div>
);

const GoToButton = () => (
  <button
    style={{
      color: "var(--main-color)",
      fontSize: 18,
      width: 40,
      height: 40,
      borderRadius: "50%",
      border: "1px solid #DFDFDF",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <span>&rarr;</span>
  </button>
);
