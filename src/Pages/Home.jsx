import React from "react";
import Banner from "../Component/Banner";
import FlashSalesProduct from "../Component/FlashSalesProduct";
import Category from "../Component/Category";
import SellingProducts from "../Component/SellingProducts";
import MusicSection from "../Component/MusicSection";
import OurProducts from "../Component/OurProducts";
import New from "../Component/New";
import Delevery from "../Component/Delevery";

function Home() {
  return (
    <div>
      <Banner />
      <FlashSalesProduct />
      <Category />
      <SellingProducts />
      <MusicSection />
      <OurProducts />
      <New />
      <Delevery />
    </div>
  );
}

export default Home;
