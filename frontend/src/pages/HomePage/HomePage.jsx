import { useEffect, useState } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "../../hooks/usePageMeta";
import Header from "../../components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import "./HomePage.css";

function HomePage() {
  const [products, setProductsList] = useState(null);
  useTitle("Home");
  useFavicon("/favicons/home-favicon.png");
  useEffect(() => {
    try {
      async function fetchProductList() {
        const { data } = await axios.get("http://localhost:3000/api/products");
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
          {products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
