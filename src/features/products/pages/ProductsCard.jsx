import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const ProductsCard = ({ addToCart, searchQuery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(`No se pudieron cargar los productos. Intenta nuevamente. (${err.message})`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) =>
    (prod.title || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextSlide = () => {
    if (currentIndex < filteredProducts.length - 3)
      setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;
  if (!filteredProducts.length) return <p>No se encontraron productos...</p>;

  return (
    <div className="catalog-container" id="catalogo">
      <h1>Catálogo</h1>
      <div className="carousel">
        <button className="arrow left" onClick={prevSlide}>
          {"<"}
        </button>
        <div className="carousel-track">
          {filteredProducts
            .slice(currentIndex, currentIndex + 3)
            .map((prod) => {
              const product = {
                image: prod.image || "",
                title: prod.title || "Sin título",
                category: prod.category || "Sin categoría",
                description: prod.description || "Sin descripción",
                price: prod.price || 0,
                rating: prod.rating || { rate: 0, count: 0 },
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
        <button className="arrow right" onClick={nextSlide}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
