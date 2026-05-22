import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, selectUser } from "../Slice/ProductSlice";
import MusicTimer from "./MusicTimer";
import { toast } from "react-toastify";

function MusicSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const jbl = {
    id: 6, name: "JBL Boombox 3 Speaker", category: "Electronics",
    price: 8999, originalPrice: 14999, rating: 4.6, reviews: 743,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    badge: "Sale", delivery: "Free Delivery", brand: "JBL",
    description: "Portable Bluetooth speaker with 24-hour playtime and IP67 waterproofing.",
    specs: { Battery: "24 hours", Bluetooth: "5.3", Waterproof: "IP67", Weight: "2.4 kg" },
  };

  const handleBuy = () => {
    if (!user) { toast.error("Please login to buy"); navigate("/login"); return; }
    dispatch(addToCart(jbl));
    navigate("/checkout");
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div
        style={{ background: "#000", borderRadius: 8, padding: "48px 56px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", minHeight: 320, overflow: "hidden", position: "relative" }}
      >
        {/* Green glow */}
        <div style={{ position: "absolute", top: "50%", right: 280, width: 300, height: 300, background: "rgba(0,200,100,0.08)", borderRadius: "50%", transform: "translateY(-50%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ color: "#fff", flex: 1, minWidth: 260, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, color: "#26a541", fontWeight: 600, marginBottom: 12 }}>Categories</div>
          <h2 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 24 }}>
            Enhance Your<br />Music Experience
          </h2>
          <div style={{ marginBottom: 28 }}>
            <MusicTimer />
          </div>
          <button
            onClick={handleBuy}
            style={{ background: "#26a541", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 4, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins", transition: "all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#1e7d32"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#26a541"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            Buy Now!
          </button>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Glow circle behind speaker */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
          <img
            src={jbl.image}
            alt="JBL Speaker"
            style={{ width: 340, height: 320, objectFit: "contain", position: "relative", filter: "drop-shadow(0 0 40px rgba(0,200,100,0.3))" }}
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      </div>
    </div>
  );
}

export default MusicSection;
