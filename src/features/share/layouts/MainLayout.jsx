import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children, cartItems, removeFromCart, onSearch }) {
  return (
    <>
      <Navbar 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        onSearch={onSearch} 
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
