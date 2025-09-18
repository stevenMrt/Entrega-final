import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar({ cartItems, removeFromCart, onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleCart = () => setIsOpen(!isOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const total = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Shop-Stev</div>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <li><Link to="/" className="navbar-link">Inicio</Link></li>
        <li><Link to="/" className="navbar-link">Catálogo</Link></li>
        <li><Link to="/contacto" className="navbar-link">Contacto</Link></li>
      </ul>

      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="navbar-search"
      />

      <div className="navbar-cart">
        <button onClick={toggleCart}>
          <FaShoppingCart /> ({cartItems.length})
        </button>
      </div>

      {isOpen && (
        <div className="cart-modal-overlay" onClick={toggleCart}>
          <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cart-close-btn" onClick={toggleCart}>Cerrar</button>
            <h3>Tu carrito</h3>

            <ul className="cart-list">
              {cartItems.length === 0 ? (
                <li>Carrito vacío...</li>
              ) : (
                cartItems.map((item, idx) => (
                  <li key={idx} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">${item.price}</span>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeFromCart(idx)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))
              )}
            </ul>

            {cartItems.length > 0 && (
              <div className="cart-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
