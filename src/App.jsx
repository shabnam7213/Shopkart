import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LayOut from "./LayOut";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import ShopNow from "./Pages/ShopNow";
import Card from "./Pages/Card";
import CheckOut from "./Pages/CheckOut";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Login/LoginPage";
import CreateAccount from "./Login/CreateAccount";
import Account from "./MyAccount/Account";
import Wishlist from "./ProductsPage/Wishlist";
import CategorySection from "./ProductsPage/CategorySection";
import ByNowPage from "./ProductsPage/ByNowPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="shop" element={<ShopNow />} />
          <Route path="cart" element={<Card />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<CreateAccount />} />
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="category/:cat" element={<CategorySection />} />
          <Route path="buy-now" element={<ByNowPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
