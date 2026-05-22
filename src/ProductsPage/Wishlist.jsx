import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectWishlist, selectProducts, toggleWishlist, addToCart } from "../Slice/ProductSlice";
import { toast } from "react-toastify";
import BreadCrumb from "../Component/BreadCrumb";
import AllSectionHeadding from "../Component/AllSectionHeadding";
import ProductCard from "../Component/ProductCard";

function Wishlist() {
  const wishlist = useSelector(selectWishlist);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  const moveAllToCart = () => {
    wishedProducts.forEach((p) => dispatch(addToCart(p)));
    toast.success("All wishlist items added to cart! 🛒");
  };

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
            <AllSectionHeadding tag="Wishlist" title={`My Wishlist (${wishedProducts.length})`} />
            {wishedProducts.length > 0 && (
              <button
                onClick={moveAllToCart}
                style={{ background: "none", border: "1px solid #212121", padding: "10px 24px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#212121"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#212121"; }}
              >
                Move All To Cart
              </button>
            )}
          </div>

          <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 24 }} />

          {wishedProducts.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#878787" }}>
              <div style={{ fontSize: 72, marginBottom: 16 }}>❤️</div>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "#212121" }}>Your wishlist is empty</h2>
              <p style={{ fontSize: 14, marginBottom: 24 }}>Save items you love to your wishlist and buy them later.</p>
              <Link to="/shop" style={{ background: "#db3022", color: "#fff", padding: "12px 28px", borderRadius: 4, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 16 }}>
              {wishedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
