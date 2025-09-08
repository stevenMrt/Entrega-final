import './App.css';
import './Components/ProductsCard.css';
import { useState } from 'react';

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
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  return (
    <MainLayout 
      cartItems={cartItems} 
      removeFromCart={removeFromCart} 
      onSearch={setSearchQuery}
    >
      <Banner />
      <ProductsCard addToCart={addToCart} searchQuery={searchQuery} />
      
    </MainLayout>
  );
}

export default App;
