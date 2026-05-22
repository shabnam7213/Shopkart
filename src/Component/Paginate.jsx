import React from "react";
function Paginate({ current = 1, total = 1, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onChange && onChange(p)} style={{ width: 36, height: 36, borderRadius: 4, border: "1px solid #e0e0e0", background: p === current ? "#db3022" : "#fff", color: p === current ? "#fff" : "#212121", fontWeight: p === current ? 700 : 400, cursor: "pointer", fontFamily: "Poppins", fontSize: 13 }}>{p}</button>
      ))}
    </div>
  );
}
export default Paginate;
