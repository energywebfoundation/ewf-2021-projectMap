import React from "react";
import "./Card.css";

const Card = ({ country, organization, title, body, footer }) => (
  <article className="dots-map__card dots-map--slideIn">
    <header className="dots-map__card__header">
      {country && <Country country={country} />}
      {organization && <Organization organization={organization} />}
      <h2>{title}</h2>
    </header>
    <div className="dots-map__card__content">{body}</div>
    {footer && <div className="dots-map__card__footer">{footer}</div>}
  </article>
);

export default Card;

const Country = ({ country }) => {
  const countryName = useCountryName(country);
  return <span className="dots-map__card__country">{countryName}</span>;
};

const Organization = ({ organization }) => (
  <span className="dots-map__card__organization">{organization}</span>
);

function useCountryName(country) {
  switch (country.toLowerCase()) {
    case "us": {
      return "united states";
    }
    default: {
      return country;
    }
  }
}
