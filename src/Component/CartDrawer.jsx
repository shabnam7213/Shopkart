import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectCart, selectCartOpen, selectCoupon, selectUser,
  setCartOpen, increaseQty, decreaseQty, removeFromCart,
  clearCart, applyCoupon,
} from "../Slice/ProductSlice";
import { toast } from "react-toastify";

const COUPONS = { SAVE20: 200, FIRST: 500, EXCLUSIVE10: 150 };

function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const open = useSelector(selectCartOpen);
  const coupon = useSelector(selectCoupon);
  const user = useSelector(selectUser);
  const [couponInput, setCouponInput] = useState("");

  const close = () => dispatch(setCartOpen(false));

  const mrp = cart.reduce((s, c) => s + c.originalPrice * c.qty, 0);
  const price = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = mrp - price;
  const gst = Math.round(price * 0.18);
  const platform = cart.length ? 20 : 0;
  const delivery = price > 500 ? 0 : 40;
  const total = price + gst + platform + delivery - coupon;
  const savings = discount + coupon;

  const handleCoupon = () => {
    const val = COUPONS[couponInput.toUpperCase()];
    if (val) {
      dispatch(applyCoupon(val));
      toast.success(`Coupon applied! ₹${val} off 🎉`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const goCheckout = () => {
    if (!user) { toast.error("Please login to checkout"); close(); navigate("/login"); return; }
    close();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 1999, opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed", top: 0, right: 0, width: 420, maxWidth: "100vw",
          height: "100vh", background: "#fff", zIndex: 2000,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Head */}
        <div style={{ background: "#db3022", color: "#fff", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>🛒 My Cart ({cart.reduce((s, c) => s + c.qty, 0)})</span>
          <button onClick={close} style={{ background: "none", border: "none", color: "#fff", fontSize: 26, cursor: "pointer", lineHeight: 1 }}>×</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 12, color: "#878787" }}>
              <div style={{ fontSize: 60 }}>🛒</div>
              <div style={{ fontSize: 17, fontWeight: 700 }}>Your cart is empty</div>
              <div style={{ fontSize: 13 }}>Add items to get started</div>
              <button onClick={close} style={{ marginTop: 8, background: "#db3022", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 4, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 12, padding: 12, border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 10, background: "#fff" }}>
                <img src={item.image} alt={item.name} style={{ width: 70, height: 70, objectFit: "contain", border: "1px solid #f0f0f0", borderRadius: 4, padding: 4 }} onError={(e) => (e.target.src = "https://via.placeholder.com/70")} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, lineHeight: 1.4 }}>{item.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 800 }}>₹{item.price.toLocaleString()}</span>
                    <span style={{ fontSize: 11, color: "#878787", textDecoration: "line-through" }}>₹{item.originalPrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button onClick={() => dispatch(decreaseQty(item.id))} style={{ width: 26, height: 26, border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 16, fontWeight: 700, cursor: "pointer", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontSize: 13, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))} style={{ width: 26, height: 26, border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 16, fontWeight: 700, cursor: "pointer", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button onClick={() => { dispatch(removeFromCart(item.id)); toast.info("Item removed"); }} style={{ marginLeft: 6, background: "none", border: "none", color: "#db3022", fontSize: 11, cursor: "pointer", fontWeight: 600, fontFamily: "Poppins" }}>✕ Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ borderTop: "2px solid #f0f0f0", padding: 16, background: "#fafafa" }}>
            <button onClick={() => { dispatch(clearCart()); toast.info("Cart cleared"); }} style={{ background: "none", border: "1px solid #db3022", color: "#db3022", padding: "5px 12px", borderRadius: 4, fontSize: 12, cursor: "pointer", marginBottom: 12, fontWeight: 600, fontFamily: "Poppins" }}>
              🗑 Clear Cart
            </button>

            {/* Coupon */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                placeholder="Coupon code (try SAVE20)"
                style={{ flex: 1, padding: "7px 10px", border: "1px dashed #e0e0e0", borderRadius: 4, fontSize: 12, fontFamily: "Poppins" }}
              />
              <button onClick={handleCoupon} style={{ background: "#2874f0", color: "#fff", border: "none", padding: "7px 14px", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>
                Apply
              </button>
            </div>

            {/* Price breakdown */}
            {[
              ["Price", `₹${mrp.toLocaleString()}`],
              ["Discount", `-₹${discount.toLocaleString()}`, "#26a541"],
              ...(coupon ? [["Coupon", `-₹${coupon}`, "#26a541"]] : []),
              ["GST (18%)", `₹${gst.toLocaleString()}`],
              ["Platform Fee", `₹${platform}`],
              ["Delivery", delivery ? `₹${delivery}` : "FREE", "#26a541"],
            ].map(([label, val, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#878787", marginBottom: 6 }}>
                <span>{label}</span>
                <span style={{ color: color || "#212121", fontWeight: color ? 600 : 400 }}>{val}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800, borderTop: "1px dashed #e0e0e0", paddingTop: 8, marginTop: 4 }}>
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            {savings > 0 && (
              <div style={{ background: "#e8f5e9", color: "#26a541", fontSize: 12, fontWeight: 600, padding: "7px 10px", borderRadius: 4, textAlign: "center", margin: "10px 0 0" }}>
                🎉 You save ₹{savings.toLocaleString()} on this order!
              </div>
            )}

            <button
              onClick={goCheckout}
              style={{ width: "100%", background: "#ff6900", color: "#fff", border: "none", padding: 14, borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 12, fontFamily: "Poppins", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e55d00")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#ff6900")}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
