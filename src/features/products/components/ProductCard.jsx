import React from "react";

function ProductCard({ image, title, category, description, price, rating, addToCart }) {
  const product = { 
    image: image || "",
    name: title || "Sin título",
    category: category || "Sin categoría",
    description: description || "Sin descripción",
    price: price || 0,
    rating: rating || { rate: 0, count: 0 }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="category">Categoría: {product.category}</p>
      <p className="description">{product.description}</p>
      <p className="price">${product.price}</p>
      <p>
        Valoración: {product.rating.rate} ⭐ ({product.rating.count} reseñas)
      </p>

      <button onClick={() => addToCart(product)}>AGREGAR AL CARRITO</button>
    </div>
  );
}

export default ProductCard;
