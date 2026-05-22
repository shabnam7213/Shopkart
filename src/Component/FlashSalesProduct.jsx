import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../Slice/ProductSlice";
import AllSectionHeadding from "./AllSectionHeadding";
import Timer from "./Timer";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Button from "./Button";

function FlashSalesProduct() {
  const products = useSelector(selectProducts);
  const scrollRef = useRef();

  const scroll = (dir) => {
    scrollRef.current.scrollBy({ left: dir * 230, behavior: "smooth" });
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "24px 24px 32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div>
            <AllSectionHeadding tag="Today's" title="Flash Sales" />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <Timer />
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => scroll(-1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#db3022"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#212121"; e.currentTarget.style.borderColor = "#e0e0e0"; }}>‹</button>
              <button onClick={() => scroll(1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#db3022"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#212121"; e.currentTarget.style.borderColor = "#e0e0e0"; }}>›</button>
            </div>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

        {/* Wider cards: minWidth 220 instead of 200 */}
        <div ref={scrollRef} style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
          {products.slice(0, 8).map((p) => (
            <div key={p.id} style={{ minWidth: 220, flexShrink: 0 }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #f0f0f0", marginTop: 28, paddingTop: 24, textAlign: "center" }}>
          <Link to="/shop"><Button>View All Products</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default FlashSalesProduct;
