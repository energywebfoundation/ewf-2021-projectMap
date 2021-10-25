import React, { useState } from "react";
import "./Icon.css";
import { toId } from "../services/sanitize";

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
        src={`${process.env.PUBLIC_URL}/icons/${toId(name)}`}
        alt={alt}
        onError={() => setError(true)}
      />
    </div>
  );
};

export default Icon;
