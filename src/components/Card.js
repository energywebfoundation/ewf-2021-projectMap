import React from "react";

const Card = ({ title, subtitle, body }) => (
  <article
    style={{
      borderRadius: "8px",
      width: 300,
      height: 450,
      border: "0.5px solid #D3D3D3",
      boxShadow: "-2px 2px 12px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
      background: "white",
    }}
  >
    <header
      style={{
        paddingTop: 25,
        paddingBottom: 16,
        paddingRight: 25,
        paddingLeft: 25,
        borderBottom: "1px solid #C4C4C4",
        textTransform: "capitalize",
      }}
    >
      {title && (
        <h2
          style={{
            fontSize: "14px",
          }}
        >
          {title}
        </h2>
      )}
      {subtitle && <strong style={{ fontSize: "22px" }}>{subtitle}</strong>}
    </header>
    <div
      style={{
        flexGrow: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {body}
    </div>
  </article>
);

export default Card;
