import React from "react";
function TeamCard({ name, role, img }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ width: "100%", height: 240, borderRadius: 8, overflow: "hidden", marginBottom: 16, background: "#f8f8f8" }}>
        <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} onError={(e) => (e.target.src = "https://via.placeholder.com/240")} />
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{name}</h3>
      <p style={{ fontSize: 13, color: "#878787" }}>{role}</p>
    </div>
  );
}
export default TeamCard;
