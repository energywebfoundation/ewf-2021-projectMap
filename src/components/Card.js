import React from "react";
import Icon from "./Icon";
import "./Card.css";
import { getCountryName } from "../services/datasetUtils";

const Card = ({
  className = "",
  country,
  organization,
  title,
  sections,
  footer,
  onClose,
}) => (
  <article className={`dots-map__card ${className}`}>
    <header className="dots-map__card__header">
      {country && <Country country={country} />}
      {organization && <Organization organization={organization} />}
      <h2>{title}</h2>
      <CloseCard onClose={onClose} />
    </header>
    <div className="dots-map__card__scrollable">
      {sections.map((section, index) => (
        <div key={index} className="dots-map__card__section">
          {section}
        </div>
      ))}
    </div>
    {footer && <div className="dots-map__card__footer">{footer}</div>}
  </article>
);

export default Card;

const Country = ({ country }) => {
  const countryName = getCountryName(country);
  return (
    <div className="dots-map__card__country">
      <Icon name={`${country}.png`} alt={countryName} noStyle={true} />
      <span>{countryName}</span>
    </div>
  );
};

const Organization = ({ organization }) => (
  <span className="dots-map__card__organization">{organization}</span>
);

const CloseCard = ({ onClose }) => (
  <button className="dots-map__card__close-button" onClick={onClose}>
    <Icon name="../close.png" alt="close" />
  </button>
);
