import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartCount, selectUser, selectWishlist,
  setSearch, setCartOpen, logout,
} from "../Slice/ProductSlice";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineUser } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

// Top category bar — keeps emojis as user wants
const CATEGORIES = [
  { name: "Woman's Fashion", icon: "👗" },
  { name: "Men's Fashion",   icon: "👔" },
  { name: "Electronics",     icon: "💻" },
  { name: "Home & Lifestyle",icon: "🏠" },
  { name: "Medicine",        icon: "💊" },
  { name: "Sports & Outdoor",icon: "⚽" },
  { name: "Baby's & Toys",   icon: "🧸" },
  { name: "Groceries",       icon: "🛒" },
  { name: "Health & Beauty", icon: "💄" },
];

function Navber() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const user = useSelector(selectUser);
  const wishlist = useSelector(selectWishlist);
  const [searchVal, setSearchVal] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest(".user-menu-wrap")) setUserMenuOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    dispatch(setSearch(searchVal));
    navigate(`/shop?q=${encodeURIComponent(searchVal)}`);
    setSearchVal("");
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    toast.info("Logged out successfully");
    navigate("/");
  };

  return (
    <>
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 1000,
          background: "#fff",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.12)" : "0 1px 0 #e0e0e0",
          transition: "box-shadow 0.3s",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, height: 60 }}>
            {/* LOGO */}
            <Link to="/" style={{ textDecoration: "none", flexShrink: 0 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: "#212121", letterSpacing: -0.5 }}>Exclusive</span>
            </Link>

            {/* NAV LINKS — desktop */}
            <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="hidden-mobile">
              {[
                { label: "Home", path: "/" },
                { label: "Contact", path: "/contact" },
                { label: "About", path: "/about" },
                { label: "Sign Up", path: "/signup" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ fontSize: 14, fontWeight: 500, color: "#212121", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => (e.target.style.color = "#db3022")}
                  onMouseLeave={(e) => (e.target.style.color = "#212121")}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* SEARCH */}
            <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 420, display: "flex", alignItems: "center", background: "#f5f5f5", borderRadius: 4, overflow: "hidden", border: "1px solid #e0e0e0" }}>
              <input
                ref={searchRef}
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="What are you looking for?"
                style={{ flex: 1, padding: "9px 14px", border: "none", background: "transparent", fontSize: 13, outline: "none", fontFamily: "Poppins" }}
              />
              <button type="submit" style={{ background: "none", border: "none", padding: "0 14px", cursor: "pointer", color: "#878787", display: "flex", alignItems: "center" }}>
                <AiOutlineSearch size={20} />
              </button>
            </form>

            {/* RIGHT ACTIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexShrink: 0 }}>

              {/* WISHLIST — icon */}
              <Link to="/wishlist" style={{ position: "relative", textDecoration: "none", color: "#212121", display: "flex", alignItems: "center" }} title="Wishlist">
                <AiOutlineHeart size={24} />
                {wishlist.length > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#db3022", color: "#fff", fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* CART — icon */}
              <button
                onClick={() => dispatch(setCartOpen(true))}
                style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: "#212121", display: "flex", alignItems: "center" }}
                title="Cart"
              >
                <BsCart3 size={22} />
                {cartCount > 0 && (
                  <span style={{ position: "absolute", top: -6, right: -6, background: "#db3022", color: "#fff", fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px" }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* USER — icon */}
              <div className="user-menu-wrap" style={{ position: "relative" }}>
                {user ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      style={{ background: "#db3022", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </button>
                    {userMenuOpen && (
                      <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)", minWidth: 200, zIndex: 500, overflow: "hidden", border: "1px solid #f0f0f0" }}>
                        {[
                          { label: "My Profile", path: "/account" },
                          { label: "Wishlist", path: "/wishlist" },
                          { label: "Shop Now", path: "/shop" },
                        ].map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setUserMenuOpen(false)}
                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 18px", fontSize: 13, color: "#212121", textDecoration: "none", transition: "background 0.2s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <AiOutlineUser size={15} />
                            {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          style={{ display: "block", width: "100%", padding: "11px 18px", fontSize: 13, color: "#db3022", background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "Poppins" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#fff5f5")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" style={{ background: "#db3022", color: "#fff", padding: "8px 20px", borderRadius: 4, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                    Login
                  </Link>
                )}
              </div>

              {/* MOBILE MENU */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ background: "none", border: "none", cursor: "pointer", display: "none", color: "#212121" }}
                className="show-mobile"
              >
                <HiOutlineMenuAlt3 size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* CATEGORY BAR — keeps emojis as user wants, not changed */}
        <div style={{ borderTop: "1px solid #f0f0f0", background: "#fff", overflowX: "auto" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", gap: 0 }}>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                to={`/category/${encodeURIComponent(cat.name)}`}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 14px", fontSize: 12, fontWeight: 500, color: "#212121", textDecoration: "none", whiteSpace: "nowrap", borderBottom: "3px solid transparent", transition: "all 0.2s", flexShrink: 0 }}
                onMouseEnter={(e) => { e.currentTarget.style.borderBottomColor = "#db3022"; e.currentTarget.style.color = "#db3022"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "transparent"; e.currentTarget.style.color = "#212121"; }}
              >
                <span style={{ fontSize: 16 }}>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navber;
