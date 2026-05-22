import React from "react";

function Skeliton({ count = 4 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden" }}>
          <div className="skeleton" style={{ height: 180 }} />
          <div style={{ padding: 12 }}>
            <div className="skeleton" style={{ height: 12, marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 12, width: "70%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 18, width: "50%", marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 10, width: "40%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeliton;
