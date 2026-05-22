import React from "react";

function AllSectionHeadding({ tag, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div className="section-tag">
        <div className="section-tag-bar" />
        <span className="section-tag-text">{tag}</span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#212121" }}>{title}</h2>
    </div>
  );
}

export default AllSectionHeadding;
