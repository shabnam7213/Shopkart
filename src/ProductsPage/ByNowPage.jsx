import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../Slice/ProductSlice";
import { useNavigate, Link } from "react-router-dom";
import BreadCrumb from "../Component/BreadCrumb";

function ByNowPage() {
  const cart = useSelector(selectCart);
  const navigate = useNavigate();

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ background: "#fff", borderRadius: 8, padding: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>⚡</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Buy Now</h2>
          <p style={{ color: "#878787", marginBottom: 24, fontSize: 14 }}>
            {cart.length ? `You have ${cart.reduce((s, c) => s + c.qty, 0)} items ready for instant checkout.` : "Add products to cart first to buy now."}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {cart.length ? (
              <button onClick={() => navigate("/checkout")} style={{ background: "#ff6900", color: "#fff", border: "none", padding: "13px 32px", borderRadius: 4, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Poppins" }}>
                Proceed to Checkout →
              </button>
            ) : (
              <Link to="/shop" style={{ background: "#db3022", color: "#fff", padding: "13px 32px", borderRadius: 4, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>
                Browse Products
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ByNowPage;
