import './App.css';
import './Components/ProductsCard.css';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from './features/share/components/Navbar';
import Banner from './features/dashboard/components/Banner';
import ProductsCard from './features/products/pages/ProductsCard';
import Footer from './features/share/components/Footer';
import MainLayout from './features/share/layouts/MainLayout';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success(`${product.name} agregado al carrito 🛒`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    toast.info("Producto eliminado del carrito ❌", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <MainLayout 
      cartItems={cartItems} 
      removeFromCart={removeFromCart} 
      onSearch={setSearchQuery}
    >
      <Banner />
      <ProductsCard addToCart={addToCart} searchQuery={searchQuery} />
      <ToastContainer />
    </MainLayout>
  );
}

export default App;
