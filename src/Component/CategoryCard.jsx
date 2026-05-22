import React from "react";
import { Link } from "react-router-dom";
function CategoryCard({ icon, name, path }) {
  return (
    <Link to={path || `/category/${name}`} style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "20px 12px", border: "1px solid #e0e0e0", borderRadius: 8, cursor: "pointer", transition: "all 0.25s", background: "#fff" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.borderColor = "#db3022"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e0e0e0"; }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#212121" }}>{name}</span>
      </div>
    </Link>
  );
}
export default CategoryCard;
