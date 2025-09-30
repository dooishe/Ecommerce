import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header";
import HomeProduct from "./components/HomeProduct";
import "./HomePage.css";

function HomePage({ cartProducts, loadCart }) {
  const [products, setProducts] = useState(null);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");
  useTitle("Home");
  useFavicon("/favicons/home-favicon.png");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const urlRequest = query
          ? `/api/products?search=${query}`
          : "/api/products";
        const { data } = await axios.get(urlRequest);
        setProducts(data);
      } catch (error) {
        console.log("something went wrong: ", error);
      }
    }
    fetchProducts();
  }, [query]);
  return (
    <>
      <Header cartProducts={cartProducts} />
      <div className="home-page">
        <div className="products-grid">
          {products?.map((product) => {
            return (
              <HomeProduct
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
