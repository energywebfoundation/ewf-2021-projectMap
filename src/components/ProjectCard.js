import React from "react";

const ProjectCard = ({ project }) => {
  <article>
    <header>
      <h2>{project.projectName}</h2>
    </header>
    <div>
      <dl>
        <dt>Type:</dt>
        <dd>{project.projectType}</dd>
        <dt>Country:</dt>
        <dd>{project.location}</dd>
        <dt>Partner:</dt>
        <dd>{project.organization}</dd>
      </dl>
      <p>{project.description}</p>
      <ul>
        {project.urls.map(({ linkText, url }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer">
              {linkText}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </article>;
};

export default ProjectCard;
