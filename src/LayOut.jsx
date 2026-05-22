import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navber from "./Component/Navber";
import Fotter from "./Component/Fotter";
import CartDrawer from "./Component/CartDrawer";

function LayOut() {
  const { pathname } = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navber />
      <main style={{ flex: 1 }}>
        <div className="fade-in" key={pathname}>
          <Outlet />
        </div>
      </main>
      <Fotter />
      <CartDrawer />
    </div>
  );
}

export default LayOut;
