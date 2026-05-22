import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../Slice/ProductSlice";
import ProductCard from "../Component/ProductCard";
import BreadCrumb from "../Component/BreadCrumb";
import AllSectionHeadding from "../Component/AllSectionHeadding";
import Skeliton from "../Component/Skeliton";
import Paginate from "../Component/Paginate";

const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Top Rated"];

function CategorySection() {
  const { cat } = useParams();
  const decodedCat = decodeURIComponent(cat || "");
  const products = useSelector(selectProducts);
  const [sort, setSort] = useState("Default");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  let filtered = products.filter((p) =>
    p.category === decodedCat ||
    p.category.toLowerCase().includes(decodedCat.toLowerCase()) ||
    decodedCat.toLowerCase().includes(p.category.toLowerCase())
  );

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "Top Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            <AllSectionHeadding tag={decodedCat} title={`${decodedCat} (${filtered.length} items)`} />
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: "#878787" }}>Sort by:</span>
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value); setPage(1); }}
                style={{ padding: "8px 12px", border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 13, fontFamily: "Poppins", cursor: "pointer", outline: "none" }}
              >
                {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

          {paginated.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#878787" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#212121", marginBottom: 8 }}>No products in this category</h2>
              <p style={{ fontSize: 14 }}>We're adding more products soon!</p>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
                {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              {totalPages > 1 && <Paginate current={page} total={totalPages} onChange={setPage} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
