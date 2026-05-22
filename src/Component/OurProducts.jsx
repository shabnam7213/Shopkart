import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectProducts } from "../Slice/ProductSlice";
import AllSectionHeadding from "./AllSectionHeadding";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import Button from "./Button";

function OurProducts() {
  const products = useSelector(selectProducts);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? products : products.slice(0, 8);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "24px 24px 32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
          <AllSectionHeadding tag="Our Products" title="Explore Our Products" />
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18 }}>‹</button>
            <button style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e0e0e0", background: "#f5f5f5", cursor: "pointer", fontSize: 18 }}>›</button>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
          {displayed.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28, paddingTop: 24, borderTop: "1px solid #f0f0f0" }}>
          <Link to="/shop"><Button>View All Products</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default OurProducts;
