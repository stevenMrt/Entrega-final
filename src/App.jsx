import { Routes, Route } from "react-router-dom";
import MainLayout from './features/share/layouts/MainLayout';
import Banner from './features/dashboard/components/Banner';
import ProductsCard from './features/products/pages/ProductsCard';
import ContactPage from './features/Contacto/pages/ContactPages';
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import './App.css';
import './Components/ProductsCard.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    toast.success(`${product.name} agregado al carrito 🛒`, { autoClose: 2000 });
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    toast.info("Producto eliminado del carrito ❌", { autoClose: 2000 });
  };

  return (
    <>
      <MainLayout cartItems={cartItems} removeFromCart={removeFromCart} onSearch={setSearchQuery}>
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <ProductsCard addToCart={addToCart} searchQuery={searchQuery} />
            </>
          } />
          <Route path="/contacto" element={<ContactPage />} />
        </Routes>
      </MainLayout>
      <ToastContainer />
    </>
  );
}

export default App;
