import { useEffect, useState } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header";
import HomeProductCard from "./components/homeProductCard/homeProductCard";
import "./HomePage.css";

function HomePage() {
  const [products, setProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  useTitle("Home");
  useFavicon("/favicons/home-favicon.png");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const [res1, res2] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/cart-items"),
        ]);
        setProducts(res1.data);
        setCartProducts(res2.data);
      } catch (error) {
        console.log("something went wrong: ", error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <Header cartProducts={cartProducts} />
      <div className="home-page">
        <div className="products-grid">
          {products?.map((product) => {
            return <HomeProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
