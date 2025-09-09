import React, { useState, useEffect } from "react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

const ProductsCard = ({ addToCart, searchQuery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData || []);
  }, []);

  const filteredProducts = products.filter((prod) =>
    (prod.nombre || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextSlide = () => {
    if (currentIndex < filteredProducts.length - 3) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (!filteredProducts.length) return <p>No se encontraron productos...</p>;

  return (
    <div className="catalog-container" id="catalogo">
      <h1>📦 Catálogo</h1>
      <div className="carousel">
        <button className="arrow left" onClick={prevSlide}>❮</button>
        <div className="carousel-track">
          {filteredProducts.slice(currentIndex, currentIndex + 3).map((prod) => {
            const product = {
              image: prod.imagen || "",
              title: prod.nombre || "Sin título",
              category: prod.categoria || "Sin categoría",
              description: prod.descripcion || "Sin descripción",
              price: prod.precio || 0,
              rating: { rate: 0, count: 0 },
            };
            return (
              <ProductCard
                key={prod.id}
                {...product}
                addToCart={addToCart}
              />
            );
          })}
        </div>
        <button className="arrow right" onClick={nextSlide}>❯</button>
      </div>
    </div>
  );
};

export default ProductsCard;
