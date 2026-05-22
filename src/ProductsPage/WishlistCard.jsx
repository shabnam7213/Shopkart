import React from "react";
import { useDispatch } from "react-redux";
import { toggleWishlist, addToCart } from "../Slice/ProductSlice";
import { toast } from "react-toastify";
function WishlistCard({ product }) {
  const dispatch = useDispatch();
  const disc = Math.round((1 - product.price / product.originalPrice) * 100);
  return (
    <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, overflow: "hidden", background: "#fff", position: "relative" }}>
      <button onClick={() => { dispatch(toggleWishlist(product.id)); toast.info("Removed from wishlist"); }} style={{ position: "absolute", top: 8, right: 8, background: "#fff", border: "none", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      <div style={{ height: 160, display: "flex", alignItems: "center", justifyContent: "center", padding: 12, background: "#f8f8f8" }}>
        <img src={product.image} alt={product.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} onError={(e) => (e.target.src = "https://via.placeholder.com/160")} />
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, lineHeight: 1.4 }}>{product.name}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 800 }}>₹{product.price.toLocaleString()}</span>
          <span style={{ fontSize: 12, color: "#878787", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString()}</span>
          <span style={{ fontSize: 11, color: "#26a541", fontWeight: 700 }}>{disc}% off</span>
        </div>
        <button onClick={() => { dispatch(addToCart(product)); toast.success("Added to cart! 🛒"); }} style={{ width: "100%", background: "#db3022", color: "#fff", border: "none", padding: "9px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default WishlistCard;
