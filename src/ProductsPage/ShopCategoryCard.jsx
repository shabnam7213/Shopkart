import React from "react";
import { Link } from "react-router-dom";
function ShopCategoryCard({ icon, name, count, path }) {
  return (
    <Link to={path || `/category/${name}`} style={{ textDecoration: "none" }}>
      <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 8, padding: "20px 16px", textAlign: "center", cursor: "pointer", transition: "all 0.25s" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.borderColor = "#db3022"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.style.color = "#212121"; e.currentTarget.style.transform = "translateY(0)"; }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{name}</div>
        {count && <div style={{ fontSize: 11, opacity: 0.7 }}>{count} items</div>}
      </div>
    </Link>
  );
}
export default ShopCategoryCard;
