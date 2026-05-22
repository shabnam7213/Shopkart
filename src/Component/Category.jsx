import React from "react";
import { Link } from "react-router-dom";
import AllSectionHeadding from "./AllSectionHeadding";
import { MdPhoneAndroid, MdLaptop, MdWatch, MdCameraAlt, MdHeadphones, MdSportsEsports, MdCheckroom, MdFaceRetouchingNatural } from "react-icons/md";

const CATS = [
  { name: "Phones",       Icon: MdPhoneAndroid,           path: "/category/Mobiles" },
  { name: "Computers",    Icon: MdLaptop,                 path: "/category/Electronics" },
  { name: "Smart Watch",  Icon: MdWatch,                  path: "/category/Electronics" },
  { name: "Camera",       Icon: MdCameraAlt,              path: "/category/Electronics" },
  { name: "Headphones",   Icon: MdHeadphones,             path: "/category/Electronics" },
  { name: "Gaming",       Icon: MdSportsEsports,          path: "/category/Electronics" },
  { name: "Fashion",      Icon: MdCheckroom,              path: "/category/Woman's Fashion" },
  { name: "Beauty",       Icon: MdFaceRetouchingNatural,  path: "/category/Health & Beauty" },
];

function Category() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <AllSectionHeadding tag="Categories" title="Browse By Category" />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#db3022"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#212121"; e.currentTarget.style.borderColor = "#e0e0e0"; }}>‹</button>
            <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#db3022"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#212121"; e.currentTarget.style.borderColor = "#e0e0e0"; }}>›</button>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 12 }}>
          {CATS.map((cat) => (
            <Link key={cat.name} to={cat.path} style={{ textDecoration: "none" }}>
              <div
                className="cat-icon-card"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "22px 12px", border: "1px solid #e0e0e0", borderRadius: 8, cursor: "pointer", transition: "all 0.25s", background: "#fff" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#db3022";
                  e.currentTarget.style.borderColor = "#db3022";
                  e.currentTarget.querySelector(".cat-icon").style.color = "#fff";
                  e.currentTarget.querySelector(".cat-label").style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#e0e0e0";
                  e.currentTarget.querySelector(".cat-icon").style.color = "#212121";
                  e.currentTarget.querySelector(".cat-label").style.color = "#212121";
                }}
              >
                <cat.Icon className="cat-icon" size={30} style={{ color: "#212121", transition: "color 0.25s" }} />
                <span className="cat-label" style={{ fontSize: 12, fontWeight: 500, color: "#212121", transition: "color 0.25s", textAlign: "center" }}>{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
