import { Routes, Route } from "react-router-dom";
import MainLayout from './features/share/layouts/MainLayout';
import Banner from './features/dashboard/components/Banner';
import ProductsCard from './features/products/pages/ProductsCard';
import ContactPage from './features/Contacto/pages/ContactPages';
import ProfilePage from './features/profile/pages/ProfilePage';
import AboutPage from './features/nosotros/pages/AboutPage';
import LoginPage from './features/auth/pages/LoginPage';
import CheckoutPage from './features/checkout/pages/CheckoutPage';
import WishlistPage from './features/wishlist/pages/WishlistPage';
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import './App.css';
import './Components/ProductsCard.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('shop-stev-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('shop-stev-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shop-stev-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('shop-stev-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shop-stev-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      ));
      toast.info(`Cantidad actualizada de ${product.name} 📦`, { autoClose: 2000 });
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success(`${product.name} agregado al carrito 🛒`, { autoClose: 2000 });
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    toast.info("Producto eliminado del carrito ❌", { autoClose: 2000 });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cartItems];
    newCart[index].quantity = newQuantity;
    setCartItems(newCart);
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(fav => fav.id === product.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== product.id));
      toast.info(`${product.name} eliminado de favoritos 💔`, { autoClose: 2000 });
    } else {
      setFavorites([...favorites, product]);
      toast.success(`${product.name} agregado a favoritos ❤️`, { autoClose: 2000 });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Carrito vaciado 🗑️", { autoClose: 2000 });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    toast.success(`¡Bienvenido ${userData.name}! 👋`, { autoClose: 2000 });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('shop-stev-user');
    toast.info("Sesión cerrada 👋", { autoClose: 2000 });
  };

  const handleOrderComplete = () => {
    clearCart();
    toast.success("¡Pedido realizado con éxito! 🎉", { autoClose: 3000 });
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  return (
    <>
      <MainLayout 
        cartItems={cartItems} 
        removeFromCart={removeFromCart} 
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        onSearch={setSearchQuery}
        user={user}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <ProductsCard 
                addToCart={addToCart} 
                searchQuery={searchQuery}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </>
          } />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/perfil" element={<ProfilePage favorites={favorites} />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} total={total} onOrderComplete={handleOrderComplete} />} />
          <Route path="/wishlist" element={<WishlistPage favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />} />
        </Routes>
      </MainLayout>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
