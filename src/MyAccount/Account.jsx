import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectUser, selectOrders, selectWishlist, selectCart, logout } from "../Slice/ProductSlice";
import { toast } from "react-toastify";
import BreadCrumb from "../Component/BreadCrumb";

function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const orders = useSelector(selectOrders);
  const wishlist = useSelector(selectWishlist);
  const cart = useSelector(selectCart);

  if (!user) { navigate("/login"); return null; }

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16, alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0f0f0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#db3022", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, margin: "0 auto 12px" }}>
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{user.name}</div>
              <div style={{ fontSize: 12, color: "#878787", marginTop: 4 }}>{user.email}</div>
            </div>

            {[["👤", "My Profile", "/account"], ["❤️", "Wishlist", "/wishlist"], ["🛒", "Cart", "/cart"], ["🛍️", "Shop Now", "/shop"]].map(([icon, label, path]) => (
              <Link key={label} to={path} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", fontSize: 14, color: "#212121", textDecoration: "none", borderBottom: "1px solid #f5f5f5", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#db3022")} onMouseLeave={(e) => (e.currentTarget.style.color = "#212121")}>
                <span>{icon}</span>{label}
              </Link>
            ))}

            <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", fontSize: 14, color: "#db3022", background: "none", border: "none", cursor: "pointer", fontFamily: "Poppins", fontWeight: 600, marginTop: 8 }}>
              🚪 Logout
            </button>
          </div>

          {/* Main */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[["📦", orders.length, "Orders"], ["❤️", wishlist.length, "Wishlist"], ["🛒", cart.reduce((s, c) => s + c.qty, 0), "Cart Items"]].map(([icon, val, label]) => (
                <div key={label} style={{ background: "#fff", borderRadius: 8, padding: 20, textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: "#db3022", marginBottom: 4 }}>{val}</div>
                  <div style={{ fontSize: 13, color: "#878787" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Orders */}
            <div style={{ background: "#fff", borderRadius: 8, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>My Orders</h3>
              {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#878787" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>No orders yet</div>
                  <div style={{ fontSize: 13, marginBottom: 16 }}>Your placed orders will appear here</div>
                  <Link to="/shop" style={{ background: "#db3022", color: "#fff", padding: "10px 24px", borderRadius: 4, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Shop Now</Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>Order #{order.id}</div>
                        <div style={{ fontSize: 12, color: "#878787", marginTop: 2 }}>{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ background: "#e8f5e9", color: "#26a541", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 4 }}>{order.status}</span>
                        <span style={{ fontWeight: 800, fontSize: 15 }}>₹{order.total?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {order.items?.slice(0, 4).map((item) => (
                        <img key={item.id} src={item.image} alt={item.name} style={{ width: 44, height: 44, objectFit: "contain", border: "1px solid #f0f0f0", borderRadius: 4, padding: 3 }} onError={(e) => (e.target.src = "https://via.placeholder.com/44")} />
                      ))}
                      {(order.items?.length || 0) > 4 && <div style={{ width: 44, height: 44, border: "1px solid #f0f0f0", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#878787" }}>+{order.items.length - 4}</div>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
