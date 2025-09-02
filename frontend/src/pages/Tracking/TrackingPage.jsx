import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./TrackingPage.css";
function TrackingPage() {
  useEffect(() => {
    document.title = "TrackingPage";
  }, []);
  return (
    <>
      <div class="header">
        <div class="left-section">
          <Link to="/" class="header-link">
            <img class="logo" src="images/logo-white.png" />
            <img class="mobile-logo" src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div class="middle-section">
          <input class="search-bar" type="text" placeholder="Search" />

          <button class="search-button">
            <img class="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div class="right-section">
          <Link class="orders-link header-link" to="/orders">
            <span class="orders-text">Orders</span>
          </Link>

          <Link class="cart-link header-link" to="/checkout">
            <img class="cart-icon" src="images/icons/cart-icon.png" />
            <div class="cart-quantity">3</div>
            <div class="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div class="tracking-page">
        <div class="order-tracking">
          <Link class="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div class="delivery-date">Arriving on Monday, June 13</div>

          <div class="product-info">
            Black and Gray Athletic Cotton Socks - 6 Pairs
          </div>

          <div class="product-info">Quantity: 1</div>

          <img
            class="product-image"
            src="images/products/athletic-cotton-socks-6-pairs.jpg"
          />

          <div class="progress-labels-container">
            <div class="progress-label">Preparing</div>
            <div class="progress-label current-status">Shipped</div>
            <div class="progress-label">Delivered</div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
