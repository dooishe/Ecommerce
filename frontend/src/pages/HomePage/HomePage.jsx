import { useEffect, useState } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header";
import HomeProductCard from "./components/HomeProductCard";
import "./HomePage.css";

function HomePage({ cartProducts, loadCart }) {
  const [products, setProducts] = useState(null);
  useTitle("Home");
  useFavicon("/favicons/home-favicon.png");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
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
            return (
              <HomeProductCard
                key={product.id}
                product={product}
                loadCart={loadCart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
