import { useFavicon, useTitle } from "../../hooks/usePageMeta";
import Header from "../../components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard.jsx";
import { products } from "../../../starting code/data/products.js";
import "./HomePage.css";

function HomePage() {
  useTitle("Home");
  useFavicon("/favicons/home-favicon.png");
  return (
    <>
      <Header />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
