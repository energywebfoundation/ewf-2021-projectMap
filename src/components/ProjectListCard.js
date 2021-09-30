import React from "react";
import Card from "./Card";

const ProjectListCard = ({ country, projects, onProjectClick }) => (
  <Card
    title={`Country: ${country}`}
    subtitle={`${projects.length} Projects`}
    body={
      <ProjectListCardContent
        projects={projects}
        onProjectClick={onProjectClick}
      />
    }
  />
);

export default ProjectListCard;

const ProjectListCardContent = ({ projects, onProjectClick }) => (
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
          <GoToButton onClick={() => onProjectClick(project)} />
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

const GoToButton = ({ onClick }) => (
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
    onClick={onClick}
  >
    <span>&rarr;</span>
  </button>
);
