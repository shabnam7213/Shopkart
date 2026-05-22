import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Component/BreadCrumb";
function ErrorPage() {
  return (
    <div>
      <BreadCrumb />
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 80, fontWeight: 800, color: "#212121", marginBottom: 16, lineHeight: 1 }}>404</div>
        <p style={{ color: "#878787", marginBottom: 8, fontSize: 16 }}>Not Found</p>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Oops! Page not found.</h2>
        <p style={{ color: "#878787", marginBottom: 28, fontSize: 14 }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" style={{ background: "#db3022", color: "#fff", padding: "13px 32px", borderRadius: 4, textDecoration: "none", fontWeight: 700, fontSize: 14, display: "inline-block" }}>
          Back to Home Page
        </Link>
      </div>
    </div>
  );
}
export default ErrorPage;
