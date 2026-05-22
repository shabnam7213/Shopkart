import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart, toggleWishlist, increaseQty, decreaseQty,
  selectCart, selectWishlist, selectUser,
} from "../Slice/ProductSlice";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsEye, BsLightning } from "react-icons/bs";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlist);
  const user = useSelector(selectUser);
  const [showDetail, setShowDetail] = useState(false);

  const inCart = cart.find((c) => c.id === product.id);
  const inWish = wishlist.includes(product.id);
  const disc = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name.slice(0, 28)}... added to cart!`);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    toast[inWish ? "info" : "success"](
      inWish ? "Removed from wishlist" : "Added to wishlist!"
    );
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!user) { toast.error("Please login to buy"); navigate("/login"); return; }
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  // Star rating renderer
  const StarRating = ({ rating, size = 12 }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) =>
        s <= Math.round(rating)
          ? <AiFillStar key={s} size={size} style={{ color: "#f5a623" }} />
          : <AiOutlineStar key={s} size={size} style={{ color: "#ddd" }} />
      )}
    </div>
  );

  return (
    <>
      <div
        className="prod-card"
        style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: 10,
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          transition: "transform 0.2s, box-shadow 0.2s",
          width: "100%",
        }}
        onClick={() => setShowDetail(true)}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)"; }}
      >
        {/* Badge */}
        {product.badge && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "#db3022", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, zIndex: 2 }}>
            {product.badge}
          </div>
        )}

        {/* Wishlist icon — react-icon not emoji */}
        <button
          onClick={handleWish}
          title={inWish ? "Remove from wishlist" : "Add to wishlist"}
          style={{ position: "absolute", top: 10, right: 10, background: "#fff", border: "1px solid #e8e8e8", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.1)", transition: "all 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#fff0f0")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          {inWish
            ? <AiFillHeart size={16} style={{ color: "#db3022" }} />
            : <AiOutlineHeart size={16} style={{ color: "#555" }} />}
        </button>

        {/* Quick view icon */}
        <button
          onClick={(e) => { e.stopPropagation(); setShowDetail(true); }}
          title="Quick view"
          style={{ position: "absolute", top: 48, right: 10, background: "#fff", border: "1px solid #e8e8e8", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 1px 4px rgba(0,0,0,0.1)", transition: "all 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <BsEye size={15} style={{ color: "#555" }} />
        </button>

        {/* Image — fixed height, object-contain so nothing gets clipped */}
        <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "#f8f8f8", overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", transition: "transform 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/200x200/f8f8f8/999?text=No+Image";
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "12px 14px 6px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.45, marginBottom: 7, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", color: "#212121" }}>
            {product.name}
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 6 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: "#db3022" }}>₹{product.price.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: "#aaa", textDecoration: "line-through" }}>₹{product.originalPrice.toLocaleString()}</span>
            <span style={{ fontSize: 11, color: "#26a541", fontWeight: 700 }}>{disc}% off</span>
          </div>

          {/* Star rating — icons, not green badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <StarRating rating={product.rating} size={12} />
            <span style={{ fontSize: 11, color: "#878787" }}>({product.reviews.toLocaleString()})</span>
          </div>

          <div style={{ fontSize: 11, color: "#26a541", fontWeight: 500, marginBottom: 8 }}>{product.delivery}</div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 6, padding: "8px 12px 12px", borderTop: "1px solid #f0f0f0" }}>
          {inCart ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, justifyContent: "center" }} onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch(decreaseQty(product.id)); }}
                style={{ width: 30, height: 30, border: "1px solid #e0e0e0", borderRadius: 5, fontSize: 18, fontWeight: 700, cursor: "pointer", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}
              >−</button>
              <span style={{ fontSize: 14, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{inCart.qty}</span>
              <button
                onClick={(e) => { e.stopPropagation(); dispatch(increaseQty(product.id)); }}
                style={{ width: 30, height: 30, border: "1px solid #e0e0e0", borderRadius: 5, fontSize: 18, fontWeight: 700, cursor: "pointer", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}
              >+</button>
            </div>
          ) : (
            <>
              {/* Add to Cart — dark/black button */}
              <button
                onClick={handleAddToCart}
                style={{ flex: 1, padding: "9px 4px", background: "#212121", color: "#fff", border: "none", borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#db3022")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#212121")}
              >
                <FiShoppingCart size={13} /> Add to Cart
              </button>

              {/* Buy Now — red button */}
              <button
                onClick={handleBuyNow}
                style={{ flex: 1, padding: "9px 4px", background: "#db3022", color: "#fff", border: "none", borderRadius: 5, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins", transition: "background 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b71c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#db3022")}
              >
                <BsLightning size={13} /> Buy Now
              </button>
            </>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <ProductDetailModal product={product} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}

function ProductDetailModal({ product, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const inCart = cart.find((c) => c.id === product.id);
  const disc = Math.round((1 - product.price / product.originalPrice) * 100);

  const StarRating = ({ rating }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) =>
        s <= Math.round(rating)
          ? <AiFillStar key={s} size={15} style={{ color: "#f5a623" }} />
          : <AiOutlineStar key={s} size={15} style={{ color: "#ddd" }} />
      )}
    </div>
  );

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 12, width: 820, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", fontSize: 26, cursor: "pointer", color: "#878787", zIndex: 1, lineHeight: 1 }}
        >×</button>

        <div style={{ display: "flex", gap: 24, padding: 28, flexWrap: "wrap" }}>
          {/* Image */}
          <div style={{ width: 260, flexShrink: 0 }}>
            <div style={{ border: "1px solid #e0e0e0", borderRadius: 8, padding: 16, display: "flex", alignItems: "center", justifyContent: "center", height: 260, background: "#f8f8f8" }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/260x260/f8f8f8/999?text=No+Image"; }}
              />
            </div>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, lineHeight: 1.4 }}>{product.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <StarRating rating={product.rating} />
              <span style={{ fontSize: 13, color: "#878787" }}>{product.reviews.toLocaleString()} ratings</span>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: "#db3022" }}>₹{product.price.toLocaleString()}</span>
              <span style={{ fontSize: 14, color: "#878787", textDecoration: "line-through", marginLeft: 10 }}>₹{product.originalPrice.toLocaleString()}</span>
              <span style={{ fontSize: 14, color: "#26a541", fontWeight: 700, marginLeft: 8 }}>{disc}% off</span>
              <div style={{ fontSize: 13, color: "#26a541", marginTop: 4 }}>{product.delivery}</div>
            </div>

            {/* Offers */}
            <div style={{ background: "#fff8e1", borderRadius: 6, padding: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Available Offers</div>
              {[
                "Bank Offer — 10% cashback on SBI Credit Card, T&C Apply",
                "No Cost EMI — ₹" + Math.round(product.price / 6).toLocaleString() + "/month × 6 months",
                "Exchange Offer — Get extra ₹500 off on old device exchange",
              ].map((o, i) => (
                <div key={i} style={{ fontSize: 12, color: "#878787", marginBottom: 4, paddingLeft: 14, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0 }}>•</span>{o}
                </div>
              ))}
            </div>

            <p style={{ fontSize: 13, color: "#878787", marginBottom: 16, lineHeight: 1.6 }}>{product.description}</p>

            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              {inCart ? (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => dispatch(decreaseQty(product.id))} style={{ width: 34, height: 34, border: "1px solid #e0e0e0", borderRadius: 5, fontSize: 18, fontWeight: 700, cursor: "pointer", background: "#f5f5f5" }}>−</button>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>{inCart.qty}</span>
                  <button onClick={() => dispatch(increaseQty(product.id))} style={{ width: 34, height: 34, border: "1px solid #e0e0e0", borderRadius: 5, fontSize: 18, fontWeight: 700, cursor: "pointer", background: "#f5f5f5" }}>+</button>
                </div>
              ) : (
                <button
                  onClick={() => { dispatch(addToCart(product)); toast.success("Added to cart!"); }}
                  style={{ flex: 1, padding: 13, background: "#212121", color: "#fff", border: "none", borderRadius: 5, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#db3022")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#212121")}
                >
                  <FiShoppingCart size={16} /> Add to Cart
                </button>
              )}
              <button
                onClick={() => {
                  if (!user) { toast.error("Please login"); navigate("/login"); return; }
                  dispatch(addToCart(product)); onClose(); navigate("/checkout");
                }}
                style={{ flex: 1, padding: 13, background: "#db3022", color: "#fff", border: "none", borderRadius: 5, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b71c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#db3022")}
              >
                <BsLightning size={16} /> Buy Now
              </button>
            </div>

            {/* Specs */}
            {product.specs && (
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Specifications</div>
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} style={{ display: "flex", fontSize: 13, borderBottom: "1px solid #f0f0f0", padding: "7px 0" }}>
                    <span style={{ color: "#878787", width: 120, flexShrink: 0 }}>{k}</span>
                    <span style={{ fontWeight: 600 }}>{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
