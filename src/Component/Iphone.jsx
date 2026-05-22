import React from "react";
import { Link } from "react-router-dom";
function Iphone() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#000", borderRadius: 8, padding: "40px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ color: "#fff" }}>
          <div style={{ fontSize: 13, color: "#878787", marginBottom: 8 }}>iPhone 14 Series</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>Up to 10%<br />off Voucher</h2>
          <Link to="/category/Mobiles" style={{ color: "#fff", fontSize: 14, fontWeight: 600, borderBottom: "1px solid #fff", paddingBottom: 2, textDecoration: "none" }}>Shop Now →</Link>
        </div>
        <img src="https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400&h=300&fit=crop" alt="iPhone" style={{ width: 300, objectFit: "contain", filter: "drop-shadow(0 0 40px rgba(255,255,255,0.1))" }} onError={(e) => (e.target.style.display = "none")} />
      </div>
    </div>
  );
}
export default Iphone;
