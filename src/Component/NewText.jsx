import React from "react";
function NewText({ tag, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 16, height: 28, background: "#db3022", borderRadius: 3 }} />
        <span style={{ color: "#db3022", fontSize: 13, fontWeight: 600 }}>{tag}</span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800 }}>{title}</h2>
    </div>
  );
}
export default NewText;
