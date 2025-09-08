import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.jsx";
import OrdersPage from "../pages/Orders/OrdersPage.jsx";
import TrackingPage from "../pages/Tracking/TrackingPage.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.jsx";
function AppRoutes() {
  const [cartProducts, setCartProducts] = useState(null);
  useEffect(() => {
    try {
      async function fetchCartProducts() {
        const { data } = await axios.get("/api/cart-items?expand=product");
        setCartProducts(data);
      }
      fetchCartProducts();
    } catch (er) {
      console.log("something went wrong");
      console.log(er);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage cartProducts={cartProducts} />} />
        <Route
          path="checkout"
          element={<CheckoutPage cartProducts={cartProducts} />}
        />
        <Route
          path="orders"
          element={<OrdersPage cartProducts={cartProducts} />}
        />
        <Route
          path="tracking"
          element={<TrackingPage cartProducts={cartProducts} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
export default AppRoutes;
