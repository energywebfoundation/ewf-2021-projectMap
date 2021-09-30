import React from "react";
import Card from "./Card";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => (
  <Card
    title={project.projectName}
    body={<ProjectCardContent project={project} />}
    footer={<ProjectCardFooter project={project} />}
  />
);

export default ProjectCard;

const ProjectCardContent = ({ project }) => (
  <div className="dots-map__project-card__content">
    <ProjectType projectType={project.projectType} />
    <ProjectLocation projectLocation={project.location} />
    <ProjectOrganizations projectOrganizations={project.organization} />
  </div>
);

const ProjectCardFooter = ({ project }) => (
  <div className="dots-map__project-card__footer">
    <ProjectDescription projectDescription={project.description} />
    <Filler />
    <ProjectUrls projectUrls={project.urls} />
  </div>
);

const ProjectType = ({ projectType }) => (
  <section className="dots-map__project-card__project-type">
    <SectionTitle title="project type" />
    <span className="dots-map__project-card__project-type-badge">
      {projectType}
    </span>
  </section>
);

const SectionTitle = ({ title }) => (
  <h4 className="dots-map__project-card__section-title">{title}</h4>
);

const ProjectLocation = ({ projectLocation }) => (
  <section className="dots-map__project-card__project-location">
    <SectionTitle title="country" />
    <ul>
      {projectLocation.split(",").map((country) => (
        <li key={country}>
          <Country country={country.trim()} />
        </li>
      ))}
    </ul>
  </section>
);

const Country = ({ country }) => (
  <div className="dots-map__project-card__country">
    <span>{country}</span>
  </div>
);

const ProjectOrganizations = ({ projectOrganizations }) => (
  <section className="dots-map__project-card__project-organization">
    <SectionTitle title="partners" />
    <ul>
      {projectOrganizations.split(",").map((organization) => (
        <li key={organization}>{organization.trim()}</li>
      ))}
    </ul>
  </section>
);

const ProjectDescription = ({ projectDescription = "" }) => (
  <section className="dots-map__project-card__project-description">
    {projectDescription.split("\n").map((paragraph, index) => (
      <p key={index}>{paragraph.trim()}</p>
    ))}
  </section>
);

const Filler = () => <div className="dots-map__project-card__filler"></div>;

const ProjectUrls = ({ projectUrls = [] }) => (
  <ul className="dots-map__project-card__project-urls">
    {projectUrls.map(({ linkText, url }) => (
      <li key={url}>
        <a href={url} target="_blank" rel="noreferrer">
          <span>{linkText}</span>
        </a>
      </li>
    ))}
  </ul>
);
