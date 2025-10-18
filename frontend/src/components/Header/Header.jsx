import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import searchIcon from "@/assets/icons/search-icon.png";
import cartIcon from "@/assets/icons/cart-icon.png";
import logoWhite from "@/assets/logos/logo-white.png";
import mobileLogoWhite from "@/assets/logos/mobile-logo-white.png";
function Header({ cartProducts }) {
  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("search_query") || "";
  });
  const navigate = useNavigate();
  function calculateCartQuantity() {
    if (cartProducts === null) return 0;
    let totalQuantity = 0;
    cartProducts.forEach((cartProduct) => {
      totalQuantity += cartProduct.quantity;
    });

    return totalQuantity;
  }
  function searchProducts() {
    const trimmedSearch = search.trim();
    if (trimmedSearch) {
      navigate(`/?search_query=${encodeURIComponent(trimmedSearch)}`);
    } else {
      navigate(`/`);
    }
  }
  function updateSearch(event) {
    setSearch(event.target.value);
  }
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={logoWhite} />
            <img className="mobile-logo" src={mobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            value={search}
            onChange={updateSearch}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                searchProducts();
              }
            }}
            type="text"
            placeholder="Search"
          />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src={searchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink
            className={({ isActive }) =>
              "orders-link header-link" + (isActive ? " active-link" : "")
            }
            to="/orders"
          >
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity" data-testid="cart-quantity">
              {calculateCartQuantity()}
            </div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
