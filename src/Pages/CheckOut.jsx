import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCart, selectUser, selectCoupon, clearCart, addOrder, applyCoupon } from "../Slice/ProductSlice";
import { toast } from "react-toastify";
import BreadCrumb from "../Component/BreadCrumb";

function CheckOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const coupon = useSelector(selectCoupon);
  const [step, setStep] = useState(1);
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [addr, setAddr] = useState({ firstName: "", lastName: "", company: "", address: "", city: "", state: "", pincode: "", phone: "", email: user?.email || "" });
  const [payMethod, setPayMethod] = useState("upi");

  const mrp = cart.reduce((s, c) => s + c.originalPrice * c.qty, 0);
  const price = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const discount = mrp - price;
  const gst = Math.round(price * 0.18);
  const platform = cart.length ? 20 : 0;
  const delivery = price > 500 ? 0 : 40;
  const total = price + gst + platform + delivery - coupon;

  const handleStep1 = () => {
    if (!addr.firstName || !addr.address || !addr.city || !addr.pincode || !addr.phone) {
      toast.error("Please fill all required fields"); return;
    }
    if (addr.pincode.length !== 6) { toast.error("Enter valid 6-digit pincode"); return; }
    if (addr.phone.length !== 10) { toast.error("Enter valid 10-digit phone"); return; }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const oid = "EXC" + Date.now().toString().slice(-8);
    setOrderId(oid);
    dispatch(addOrder({ id: oid, items: cart, total, date: new Date().toISOString(), status: "Confirmed", address: addr }));
    dispatch(clearCart());
    dispatch(applyCoupon(0));
    setPlaced(true);
  };

  if (!user) {
    navigate("/login"); return null;
  }

  if (placed) {
    return (
      <div style={{ maxWidth: 600, margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
        <div style={{ background: "#fff", borderRadius: 12, padding: 48, boxShadow: "0 4px 24px rgba(0,0,0,0.1)" }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10 }}>Order Placed Successfully!</h2>
          <p style={{ color: "#878787", marginBottom: 20 }}>Your order has been placed and will be delivered soon.</p>
          <div style={{ background: "#f5f5f5", borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: "#878787", marginBottom: 4 }}>Order ID</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#db3022" }}>{orderId}</div>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/")} style={{ background: "#db3022", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 4, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins" }}>Continue Shopping</button>
            <button onClick={() => navigate("/account")} style={{ background: "#fff", color: "#212121", border: "1px solid #e0e0e0", padding: "12px 28px", borderRadius: 4, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins" }}>View Orders</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        {/* Steps */}
        <div style={{ display: "flex", marginBottom: 24, background: "#fff", borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0" }}>
          {[["1", "Address"], ["2", "Payment"], ["3", "Confirm"]].map(([n, label], i) => (
            <div key={n} style={{ flex: 1, padding: "14px", textAlign: "center", fontSize: 13, fontWeight: 600, background: step === i + 1 ? "#db3022" : step > i + 1 ? "#e8f5e9" : "#fff", color: step === i + 1 ? "#fff" : step > i + 1 ? "#26a541" : "#878787", borderRight: i < 2 ? "1px solid #e0e0e0" : "none" }}>
              {step > i + 1 ? "✓ " : n + ". "}{label}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" }}>
          {/* Left */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            {step === 1 && (
              <>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Billing Details</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {[["firstName", "First Name *"], ["lastName", "Last Name"], ["company", "Company Name"], ["address", "Street Address *"], ["city", "City *"], ["state", "State"], ["pincode", "Pincode *"], ["phone", "Phone Number *"], ["email", "Email"]].map(([key, label]) => (
                    <div key={key} style={{ gridColumn: ["address", "email"].includes(key) ? "1/-1" : "auto" }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 5, color: "#555" }}>{label}</label>
                      <input
                        value={addr[key]}
                        onChange={(e) => setAddr({ ...addr, [key]: e.target.value })}
                        maxLength={key === "pincode" ? 6 : key === "phone" ? 10 : undefined}
                        style={{ width: "100%", padding: "9px 12px", border: "1px solid #e0e0e0", borderRadius: 4, fontSize: 13, fontFamily: "Poppins", outline: "none", transition: "border 0.2s" }}
                        onFocus={(e) => (e.target.style.borderColor = "#db3022")}
                        onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={handleStep1} style={{ marginTop: 24, background: "#db3022", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 4, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins" }}>
                  Continue to Payment →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Payment Method</h3>
                {[["upi", "💳 UPI / Net Banking", "Pay instantly via UPI apps like PhonePe, GPay, Paytm"], ["card", "💳 Debit / Credit Card", "Visa, Mastercard, RuPay accepted"], ["emi", "📅 No Cost EMI", "0% interest EMI on select bank cards"], ["cod", "💵 Cash on Delivery", "Pay when your order arrives at your door"]].map(([val, label, desc]) => (
                  <label key={val} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: 14, border: `1px solid ${payMethod === val ? "#db3022" : "#e0e0e0"}`, borderRadius: 8, marginBottom: 10, cursor: "pointer", background: payMethod === val ? "#fff5f5" : "#fff", transition: "all 0.2s" }}>
                    <input type="radio" name="pay" value={val} checked={payMethod === val} onChange={() => setPayMethod(val)} style={{ marginTop: 3 }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
                      <div style={{ fontSize: 12, color: "#878787", marginTop: 3 }}>{desc}</div>
                    </div>
                  </label>
                ))}
                <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                  <button onClick={() => setStep(1)} style={{ background: "#fff", color: "#212121", border: "1px solid #e0e0e0", padding: "12px 24px", borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "Poppins" }}>← Back</button>
                  <button onClick={handlePlaceOrder} style={{ flex: 1, background: "#ff6900", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins" }}>
                    Place Order ₹{total.toLocaleString()} →
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right - order summary */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: 10, marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #f5f5f5" }}>
                <img src={item.image} alt={item.name} style={{ width: 52, height: 52, objectFit: "contain", border: "1px solid #f0f0f0", borderRadius: 4, padding: 4 }} onError={(e) => (e.target.src = "https://via.placeholder.com/52")} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4, marginBottom: 3 }}>{item.name.slice(0, 35)}...</div>
                  <div style={{ fontSize: 12, color: "#878787" }}>₹{item.price.toLocaleString()} × {item.qty}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>₹{(item.price * item.qty).toLocaleString()}</div>
              </div>
            ))}
            {[["MRP", `₹${mrp.toLocaleString()}`], ["Discount", `-₹${discount.toLocaleString()}`, "#26a541"], ...(coupon ? [["Coupon", `-₹${coupon}`, "#26a541"]] : []), ["GST (18%)", `₹${gst.toLocaleString()}`], ["Platform Fee", `₹${platform}`], ["Delivery", delivery ? `₹${delivery}` : "FREE", delivery ? undefined : "#26a541"]].map(([l, v, c]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8, color: "#878787" }}>
                <span>{l}</span><span style={{ color: c || "#212121", fontWeight: c ? 600 : 400 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800, borderTop: "1px solid #e0e0e0", paddingTop: 10, marginTop: 4 }}>
              <span>Total</span><span>₹{total.toLocaleString()}</span>
            </div>
            {discount + coupon > 0 && (
              <div style={{ background: "#e8f5e9", color: "#26a541", fontSize: 12, fontWeight: 600, padding: "8px 10px", borderRadius: 4, textAlign: "center", marginTop: 10 }}>
                🎉 You save ₹{(discount + coupon).toLocaleString()}!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
