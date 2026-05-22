import React from "react";
const SERVICES = [
  { icon: "🚚", title: "FREE AND FAST DELIVERY", desc: "Free delivery for all orders over ₹500" },
  { icon: "🎧", title: "24/7 CUSTOMER SERVICE", desc: "Friendly 24/7 customer support" },
  { icon: "✅", title: "MONEY BACK GUARANTEE", desc: "We return money within 30 days" },
];
function Delevery() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
        {SERVICES.map((s) => (
          <div key={s.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, padding: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#212121", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#878787" }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Delevery;
