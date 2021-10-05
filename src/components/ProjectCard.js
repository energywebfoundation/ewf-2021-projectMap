import React from "react";
import Card from "./Card";
import Icon from "./Icon";
import { RoundedLink } from "./RoundedButton";
import "./ProjectCard.css";

const ProjectCard = ({ project, onClose, className }) => (
  <Card
    className={`dots-map__project-card ${className}`}
    title={project.projectName}
    sections={[
      <ProjectCardContent project={project} />,
      <ProjectCardFooter project={project} />,
    ].filter((x) => !!x)}
    footer={
      project.caseStudy && (
        <ProjectCaseStudy projectCaseStudy={project.caseStudy} />
      )
    }
    onClose={onClose}
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
    <Icon name={`${country}.png`} alt={country} />
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
        <RoundedLink target="_blank" rel="noreferrer" href={url}>
          {linkText}
        </RoundedLink>
      </li>
    ))}
  </ul>
);

const ProjectCaseStudy = ({ projectCaseStudy }) => (
  <div
    className="dots-map__project-card__case-study"
    onClick={() => window.open(projectCaseStudy, "_blank")}
  >
    <img src={`${process.env.PUBLIC_URL}/case-study.png`} alt="case study" />
    <span>Read case study→</span>
  </div>
);
