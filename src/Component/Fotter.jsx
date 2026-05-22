import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Fotter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) { toast.error("Please enter a valid email"); return; }
    toast.success("Subscribed successfully! 🎉");
    setEmail("");
  };

  return (
    <footer style={{ background: "#000", color: "#fff", padding: "48px 0 24px", marginTop: "auto" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Exclusive</h3>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Subscribe</div>
            <div style={{ fontSize: 13, color: "#aaa", marginBottom: 14 }}>Get 10% off your first order</div>
            <form onSubmit={handleSubscribe} style={{ display: "flex", border: "1px solid #aaa", borderRadius: 4, overflow: "hidden" }}>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{ flex: 1, padding: "8px 12px", background: "transparent", border: "none", color: "#fff", fontSize: 12, outline: "none", fontFamily: "Poppins" }} />
              <button type="submit" style={{ background: "none", border: "none", color: "#fff", padding: "8px 12px", cursor: "pointer", fontSize: 16 }}>→</button>
            </form>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Support</h4>
            {["111 Bijoy Sarani, Dhaka, Bangladesh", "exclusive@gmail.com", "+88015-88888-9999"].map((item) => (
              <div key={item} style={{ fontSize: 13, color: "#aaa", marginBottom: 10, lineHeight: 1.5 }}>{item}</div>
            ))}
          </div>

          {/* Account */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Account</h4>
            {[["My Account", "/account"], ["Login / Register", "/login"], ["Cart", "/cart"], ["Wishlist", "/wishlist"], ["Shop", "/shop"]].map(([label, path]) => (
              <Link key={label} to={path} style={{ display: "block", fontSize: 13, color: "#aaa", marginBottom: 10, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#aaa")}>{label}</Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Quick Link</h4>
            {[["Privacy Policy", "#"], ["Terms of Use", "#"], ["FAQ", "/contact"], ["Contact", "/contact"]].map(([label, path]) => (
              <Link key={label} to={path} style={{ display: "block", fontSize: 13, color: "#aaa", marginBottom: 10, textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => (e.target.style.color = "#fff")} onMouseLeave={(e) => (e.target.style.color = "#aaa")}>{label}</Link>
            ))}
          </div>

          {/* Download App */}
          <div>
            <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Download App</h4>
            <div style={{ fontSize: 12, color: "#aaa", marginBottom: 12 }}>Save ₹200 with App – New User Only</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <div style={{ background: "#1a1a1a", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", border: "1px solid #333" }}>
                <span style={{ fontSize: 20 }}>📱</span>
                <div>
                  <div style={{ fontSize: 9, color: "#aaa" }}>Get it on</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>Google Play</div>
                </div>
              </div>
              <div style={{ background: "#1a1a1a", borderRadius: 6, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", border: "1px solid #333" }}>
                <span style={{ fontSize: 20 }}>🍎</span>
                <div>
                  <div style={{ fontSize: 9, color: "#aaa" }}>Download on</div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>App Store</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {["𝕏", "📘", "📸", "🔗", "▶️"].map((icon) => (
                <span key={icon} style={{ fontSize: 20, cursor: "pointer", transition: "transform 0.2s" }} onMouseEnter={(e) => (e.target.style.transform = "scale(1.3)")} onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}>{icon}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #333", paddingTop: 24, textAlign: "center", fontSize: 13, color: "#666" }}>
          © Copyright Exclusive 2024. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Fotter;
