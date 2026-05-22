import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../Slice/ProductSlice";
import AllSectionHeadding from "./AllSectionHeadding";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Button from "./Button";

function SellingProducts() {
  const products = useSelector(selectProducts);
  const scrollRef = useRef();

  const scroll = (dir) => scrollRef.current.scrollBy({ left: dir * 220, behavior: "smooth" });

  const bestSelling = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "24px 24px 32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <AllSectionHeadding tag="This Month" title="Best Selling Products" />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => scroll(-1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18 }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#212121"; }}>‹</button>
            <button onClick={() => scroll(1)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18 }} onMouseEnter={(e) => { e.currentTarget.style.background = "#db3022"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "#f5f5f5"; e.currentTarget.style.color = "#212121"; }}>›</button>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

        <div ref={scrollRef} style={{ display: "flex", gap: 16, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
          {bestSelling.map((p) => (
            <div key={p.id} style={{ minWidth: 200, flexShrink: 0 }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28, paddingTop: 24, borderTop: "1px solid #f0f0f0" }}>
          <Link to="/shop"><Button>View All Products</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default SellingProducts;
