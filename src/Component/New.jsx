import React from "react";
import { Link } from "react-router-dom";
import AllSectionHeadding from "./AllSectionHeadding";

function New() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <AllSectionHeadding tag="Featured" title="New Arrival" />
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "320px 160px", gap: 12 }}>
          {/* PS5 — big left */}
          <Link to="/category/Electronics" style={{ textDecoration: "none", gridRow: "1 / 3" }}>
            <div
              style={{ background: "#000", borderRadius: 8, height: "100%", display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1)"}
            >
              <img src="https://images.unsplash.com/photo-1607853202273-232359ecbde9?w=600&h=600&fit=crop" alt="PS5" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8, position: "absolute", top: 0, left: 0, transition: "transform 0.4s ease" }} onError={(e) => (e.target.style.opacity = 0)} />
              <div style={{ position: "relative", zIndex: 1, padding: "20px 24px", color: "#fff" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>PlayStation 5</h3>
                <p style={{ fontSize: 13, opacity: 0.8, marginBottom: 10 }}>Black and White version of the PS5 coming out on sale.</p>
                <span style={{ fontSize: 13, fontWeight: 600, borderBottom: "1px solid #fff", paddingBottom: 2 }}>Shop Now</span>
              </div>
            </div>
          </Link>

          {/* Women's Collections */}
          <Link to="/category/Woman's Fashion" style={{ textDecoration: "none" }}>
            <div style={{ background: "#111", borderRadius: 8, height: "100%", display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=320&fit=crop" alt="Fashion" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, position: "absolute", top: 0, left: 0, transition: "transform 0.4s ease" }} onError={(e) => (e.target.style.opacity = 0)} />
              <div style={{ position: "relative", zIndex: 1, padding: "16px 20px", color: "#fff" }}>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Women's Collections</h3>
                <p style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>Featured woman collections that give you another vibe.</p>
                <span style={{ fontSize: 12, fontWeight: 600, borderBottom: "1px solid #fff", paddingBottom: 2 }}>Shop Now</span>
              </div>
            </div>
          </Link>

          {/* Speakers */}
          <Link to="/category/Electronics" style={{ textDecoration: "none" }}>
            <div style={{ background: "#222", borderRadius: 8, height: "100%", display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
              <img src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=200&fit=crop" alt="Speakers" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, position: "absolute", top: 0, left: 0, transition: "transform 0.4s ease" }} onError={(e) => (e.target.style.opacity = 0)} />
              <div style={{ position: "relative", zIndex: 1, padding: "14px 16px", color: "#fff" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Speakers</h3>
                <p style={{ fontSize: 11, opacity: 0.8, marginBottom: 6 }}>Amazon wireless speakers</p>
                <span style={{ fontSize: 11, fontWeight: 600, borderBottom: "1px solid #fff", paddingBottom: 2 }}>Shop Now</span>
              </div>
            </div>
          </Link>

          {/* Perfume */}
          <Link to="/category/Health & Beauty" style={{ textDecoration: "none" }}>
            <div style={{ background: "#1a1a1a", borderRadius: 8, height: "100%", display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1.05)"} onMouseLeave={(e) => e.currentTarget.querySelector("img").style.transform = "scale(1)"}>
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=200&fit=crop" alt="Perfume" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, position: "absolute", top: 0, left: 0, transition: "transform 0.4s ease" }} onError={(e) => (e.target.style.opacity = 0)} />
              <div style={{ position: "relative", zIndex: 1, padding: "14px 16px", color: "#fff" }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Perfume</h3>
                <p style={{ fontSize: 11, opacity: 0.8, marginBottom: 6 }}>GUCCI INTENSE OUD EDP</p>
                <span style={{ fontSize: 11, fontWeight: 600, borderBottom: "1px solid #fff", paddingBottom: 2 }}>Shop Now</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default New;
