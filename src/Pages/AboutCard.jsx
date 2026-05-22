import React from "react";
function AboutCard({ icon, title, desc }) {
  return (
    <div style={{ textAlign: "center", padding: 24 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#212121", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 14px" }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#878787" }}>{desc}</div>
    </div>
  );
}
export default AboutCard;
