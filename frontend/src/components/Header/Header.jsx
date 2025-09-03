import { NavLink } from "react-router-dom";
import "./Header.css";
import searchIcon from "../../assets/icons/search-icon.png";
import cartIcon from "../../assets/icons/cart-icon.png";
import logoWhite from "../../assets/logos/logo-white.png";
import mobileLogoWhite from "../../assets/logos/mobile-logo-white.png";
function Header() {
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
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
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
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
