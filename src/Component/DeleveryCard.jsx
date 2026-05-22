import React from "react";
function DeleveryCard({ icon, title, desc }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, padding: 24 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#212121", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#878787" }}>{desc}</div>
    </div>
  );
}
export default DeleveryCard;
