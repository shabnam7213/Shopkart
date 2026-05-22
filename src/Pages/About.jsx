import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Component/BreadCrumb";
import AllSectionHeadding from "../Component/AllSectionHeadding";

const TEAM = [
  { name: "Tom Cruise", role: "Founder & Chairman", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Emma Watson", role: "Managing Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Will Smith", role: "Product Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
];

const STATS = [
  { icon: "🏪", value: "10.5k", label: "Sellers active on our site" },
  { icon: "💰", value: "33k", label: "Monthly product sales" },
  { icon: "🛍️", value: "45.5k", label: "Customers active on our site" },
  { icon: "💵", value: "25k", label: "Annual gross sales on our site" },
];

function About() {
  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* Hero */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", marginBottom: 60, padding: "40px 0" }}>
          <div>
            <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, marginBottom: 20 }}>Our Story</h1>
            <p style={{ fontSize: 14, color: "#878787", lineHeight: 1.9, marginBottom: 16 }}>
              Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
            </p>
            <p style={{ fontSize: 14, color: "#878787", lineHeight: 1.9 }}>
              Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer electronics to fashion and lifestyle.
            </p>
          </div>
          <div style={{ borderRadius: 10, overflow: "hidden", height: 360 }}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="Our Story"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 16, marginBottom: 60 }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: "32px 20px", textAlign: "center", transition: "all 0.3s", cursor: "default", background: "#fff" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.borderColor = "#db3022"; e.currentTarget.querySelectorAll("div").forEach((d) => (d.style.color = "#fff")); }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#e0e0e0"; e.currentTarget.querySelectorAll("div").forEach((d) => (d.style.color = "")); }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{stat.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "#878787" }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <AllSectionHeadding tag="Our Team" title="Meet the Team" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {TEAM.map((member) => (
              <div key={member.name} style={{ textAlign: "center" }}>
                <div style={{ width: "100%", height: 240, borderRadius: 8, overflow: "hidden", marginBottom: 16, background: "#f8f8f8" }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/240")}
                  />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>
                <p style={{ fontSize: 13, color: "#878787" }}>{member.role}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 12 }}>
                  {["𝕏", "📘", "📸"].map((icon) => (
                    <span key={icon} style={{ fontSize: 18, cursor: "pointer", transition: "transform 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    >{icon}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 24 }}>
          {[
            { icon: "🚚", title: "FREE AND FAST DELIVERY", desc: "Free delivery for all orders over ₹500" },
            { icon: "🎧", title: "24/7 CUSTOMER SERVICE", desc: "Friendly 24/7 customer support" },
            { icon: "✅", title: "MONEY BACK GUARANTEE", desc: "We return money within 30 days" },
          ].map((s) => (
            <div key={s.title} style={{ textAlign: "center", padding: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#212121", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 14px" }}>{s.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#878787" }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
