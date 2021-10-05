import React, { useState } from "react";
import "./Icon.css";

const Icon = ({ name, alt, noStyle }) => {
  const [error, setError] = useState(false);
  if (error || !name) {
    return <React.Fragment />;
  }
  return (
    <div
      className={`dots-map__icon ${noStyle ? "dots-map__icon--no-style" : ""}`}
    >
      <img
        src={`${process.env.PUBLIC_URL}/icons/${sanitize(name)}`}
        alt={alt}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default Icon;

function sanitize(name) {
  return name.toLowerCase().replace(/ /g, "_");
}
