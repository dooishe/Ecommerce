import { useFavicon, useTitle } from "../../hooks/usePageMeta";
import Header from "../../components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import "./HomePage.css";
import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
  const [productsList, setProductsList] = useState(null);
  useTitle("Home");
  useFavicon("/favicons/home-favicon.png");
  useEffect(() => {
    try {
      async function fetchProductList() {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        setProductsList(data);
      }
      fetchProductList();
    } catch (er) {
      console.log(er);
    }
  }, []);
  return (
    <>
      <Header />
      <div className="home-page">
        <div className="products-grid">
          {productsList?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
