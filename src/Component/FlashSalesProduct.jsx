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

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 32px" }}>
      <div style={{ background: "#fff", borderRadius: 8, padding: "24px 24px 32px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div>
            <AllSectionHeadding tag="Today's" title="Flash Sales" />
          </div>
          <Timer />
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

        {/* Product scroll */}
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