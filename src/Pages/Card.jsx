import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCart, selectUser, selectCoupon,
  increaseQty, decreaseQty, removeFromCart, clearCart, applyCoupon,
} from "../Slice/ProductSlice";
import { toast } from "react-toastify";
import BreadCrumb from "../Component/BreadCrumb";
import Button from "../Component/Button";

const COUPONS = { SAVE20: 200, FIRST: 500, EXCLUSIVE10: 150 };

function Card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const coupon = useSelector(selectCoupon);
  const [couponInput, setCouponInput] = useState("");

  const mrp = cart.reduce((s, c) => s + c.originalPrice * c.qty, 0);
  const price = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = mrp - price;
  const gst = Math.round(price * 0.18);
  const platform = cart.length ? 20 : 0;
  const delivery = price > 500 ? 0 : 40;
  const total = price + gst + platform + delivery - coupon;
  const savings = discount + coupon;

  const handleCoupon = () => {
    const val = COUPONS[couponInput.trim().toUpperCase()];
    if (val) { dispatch(applyCoupon(val)); toast.success(`Coupon applied! ₹${val} off 🎉`); }
    else toast.error("Invalid coupon code");
  };

  const handleCheckout = () => {
    if (!user) { toast.error("Please login to proceed"); navigate("/login"); return; }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div>
        <BreadCrumb />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
          <div style={{ background: "#fff", borderRadius: 8, padding: "80px 24px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Your cart is empty</h2>
            <p style={{ color: "#878787", marginBottom: 24 }}>Add products to your cart to see them here.</p>
            <Link to="/shop"><Button>Return to Shop</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" }}>
          {/* Cart items */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Shopping Cart</h2>
              <button onClick={() => { dispatch(clearCart()); toast.info("Cart cleared"); }} style={{ background: "none", border: "1px solid #db3022", color: "#db3022", padding: "6px 14px", borderRadius: 4, fontSize: 12, cursor: "pointer", fontFamily: "Poppins", fontWeight: 600 }}>🗑 Clear All</button>
            </div>

            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, padding: "0 0 12px", borderBottom: "1px solid #f0f0f0", fontSize: 12, fontWeight: 700, color: "#878787" }}>
              <span>Product</span><span style={{ textAlign: "center" }}>Price</span><span style={{ textAlign: "center" }}>Quantity</span><span style={{ textAlign: "center" }}>Subtotal</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 12, padding: "16px 0", borderBottom: "1px solid #f0f0f0", alignItems: "center" }}>
                {/* Product */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button onClick={() => { dispatch(removeFromCart(item.id)); toast.info("Item removed"); }} style={{ background: "#ffecec", border: "none", color: "#db3022", width: 22, height: 22, borderRadius: "50%", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>
                  <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: "contain", border: "1px solid #f0f0f0", borderRadius: 4, padding: 4 }} onError={(e) => (e.target.src = "https://via.placeholder.com/56")} />
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4 }}>{item.name}</div>
                </div>
                {/* Price */}
                <div style={{ textAlign: "center", fontSize: 14, fontWeight: 700 }}>₹{item.price.toLocaleString()}</div>
                {/* Qty */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <button onClick={() => dispatch(decreaseQty(item.id))} style={{ width: 28, height: 28, border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 16, fontWeight: 700, cursor: "pointer", background: "#f5f5f5" }}>−</button>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => dispatch(increaseQty(item.id))} style={{ width: 28, height: 28, border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 16, fontWeight: 700, cursor: "pointer", background: "#f5f5f5" }}>+</button>
                </div>
                {/* Subtotal */}
                <div style={{ textAlign: "center", fontSize: 14, fontWeight: 800, color: "#db3022" }}>₹{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20, flexWrap: "wrap", gap: 12 }}>
              <Link to="/shop"><Button variant="secondary">← Return to Shop</Button></Link>
              <Button variant="secondary">Update Cart</Button>
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Coupon */}
            <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Coupon Code</h3>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  style={{ flex: 1, padding: "9px 12px", border: "1px dashed #e0e0e0", borderRadius: 4, fontSize: 13, fontFamily: "Poppins" }}
                />
                <button onClick={handleCoupon} style={{ background: "#db3022", color: "#fff", border: "none", padding: "9px 16px", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>Apply</button>
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: "#878787" }}>Try: SAVE20, FIRST, EXCLUSIVE10</div>
            </div>

            {/* Price Summary */}
            <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>Cart Total</h3>
              {[
                ["MRP Total", `₹${mrp.toLocaleString()}`],
                ["Discount", `-₹${discount.toLocaleString()}`, "#26a541"],
                ...(coupon ? [["Coupon Discount", `-₹${coupon}`, "#26a541"]] : []),
                ["GST (18%)", `₹${gst.toLocaleString()}`],
                ["Platform Fee", `₹${platform}`],
                ["Delivery", delivery ? `₹${delivery}` : "FREE", delivery ? undefined : "#26a541"],
              ].map(([label, val, color]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 10, color: "#878787" }}>
                  <span>{label}</span>
                  <span style={{ color: color || "#212121", fontWeight: color ? 600 : 400 }}>{val}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, borderTop: "1px solid #e0e0e0", paddingTop: 12, marginTop: 4 }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              {savings > 0 && (
                <div style={{ background: "#e8f5e9", color: "#26a541", fontSize: 13, fontWeight: 600, padding: "8px 12px", borderRadius: 4, textAlign: "center", marginTop: 12 }}>
                  🎉 You save ₹{savings.toLocaleString()} on this order!
                </div>
              )}

              <button
                onClick={handleCheckout}
                style={{ width: "100%", background: "#db3022", color: "#fff", border: "none", padding: 14, borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 16, fontFamily: "Poppins", transition: "all 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b71c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#db3022")}
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
