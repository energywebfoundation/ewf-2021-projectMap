import React from "react";

const Card = ({ title, header = <React.Fragment />, body }) => (
  <article
    style={{
      borderRadius: "8px",
      width: 300,
      height: 450,
      border: "0.5px solid #D3D3D3",
      boxShadow: "-2px 2px 12px rgba(0, 0, 0, 0.15)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <header
      style={{
        paddingTop: 25,
        paddingBottom: 16,
        paddingRight: 25,
        paddingLeft: 25,
        borderBottom: "1px solid #C4C4C4",
      }}
    >
      <h2
        style={{
          fontSize: "14px",
        }}
      >
        {title}
      </h2>
      {header}
    </header>
    <div
      style={{
        flexGrow: 1,
        overflow: "auto",
      }}
    >
      {body}
    </div>
  </article>
);

export default Card;
