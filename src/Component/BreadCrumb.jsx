import React from "react";
import { Link, useLocation } from "react-router-dom";

function BreadCrumb() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#878787" }}>
        <Link to="/" style={{ color: "#878787", textDecoration: "none" }}>Home</Link>
        {paths.map((p, i) => (
          <React.Fragment key={i}>
            <span>/</span>
            <span style={{ color: i === paths.length - 1 ? "#212121" : "#878787", textTransform: "capitalize" }}>
              {decodeURIComponent(p)}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default BreadCrumb;
