import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header.jsx";
import "./TrackingPage.css";
function TrackingPage() {
  const [cartProducts, setCartProducts] = useState(null);
  useTitle("Tracking");
  useFavicon("/favicons/tracking-favicon.png");
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/cart-items"
        );
        setCartProducts(data);
      } catch (error) {
        console.log("something went wrong: ", error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <>
      <Header cartProducts={cartProducts} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">Arriving on Monday, June 13</div>

          <div className="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div className="product-info">Quantity: 1</div>

          <img
            className="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
