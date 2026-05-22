import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { selectProducts, setSearch, setCategory, selectSearch, selectCategory } from "../Slice/ProductSlice";
import ProductCard from "../Component/ProductCard";
import BreadCrumb from "../Component/BreadCrumb";
import Skeliton from "../Component/Skeliton";
import Paginate from "../Component/Paginate";
import AllSectionHeadding from "../Component/AllSectionHeadding";

const SORT_OPTIONS = ["Default", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Reviews"];
const ALL_CATS = ["All", "Electronics", "Mobiles", "Fashion", "Woman's Fashion", "Men's Fashion", "Health & Beauty", "Furniture", "Books", "Sports & Outdoor", "Baby's & Toys"];

const PER_PAGE = 8;

function ShopNow() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const products = useSelector(selectProducts);
  const reduxSearch = useSelector(selectSearch);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("Default");
  const [page, setPage] = useState(1);
  const [localSearch, setLocalSearch] = useState(searchParams.get("q") || "");
  const [activeCat, setActiveCat] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200000]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setLocalSearch(q);
  }, [searchParams]);

  let filtered = products.filter((p) => {
    const q = localSearch.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    const matchCat = activeCat === "All" || p.category === activeCat || p.category.includes(activeCat);
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchQ && matchCat && matchPrice;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "Top Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "Most Reviews") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <AllSectionHeadding tag="Our Store" title="Explore All Products" />

          {/* Search + Sort bar */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={localSearch}
              onChange={(e) => { setLocalSearch(e.target.value); setPage(1); }}
              placeholder="Search products..."
              style={{ flex: 1, minWidth: 200, padding: "9px 14px", border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 13, fontFamily: "Poppins", outline: "none" }}
              onFocus={(e) => (e.target.style.borderColor = "#db3022")}
              onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            />
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              style={{ padding: "9px 14px", border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 13, fontFamily: "Poppins", cursor: "pointer", outline: "none" }}
            >
              {SORT_OPTIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <div style={{ fontSize: 13, color: "#878787" }}>{filtered.length} products</div>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {ALL_CATS.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCat(c); setPage(1); }}
                style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid", borderColor: activeCat === c ? "#db3022" : "#e0e0e0", background: activeCat === c ? "#db3022" : "#fff", color: activeCat === c ? "#fff" : "#212121", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins", transition: "all 0.2s" }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

          {loading ? (
            <Skeliton count={8} />
          ) : paginated.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#878787" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No products found</div>
              <div style={{ fontSize: 14 }}>Try a different search term or category</div>
              <button onClick={() => { setLocalSearch(""); setActiveCat("All"); }} style={{ marginTop: 16, background: "#db3022", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 4, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>Clear Filters</button>
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

export default ShopNow;
