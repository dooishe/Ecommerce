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
  const loadCart = async function fetchCartProducts() {
    const { data } = await axios.get("/api/cart-items?expand=product");
    setCartProducts(data);
  };
  useEffect(() => {
    try {
      loadCart();
    } catch (er) {
      console.log("something went wrong");
      console.log(er);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              loadCart={loadCart}
              cartProducts={cartProducts}
              setCartProducts={setCartProducts}
            />
          }
        />
        <Route
          path="checkout"
          element={
            <CheckoutPage cartProducts={cartProducts} loadCart={loadCart} />
          }
        />
        <Route
          path="orders"
          element={
            <OrdersPage cartProducts={cartProducts} loadCart={loadCart} />
          }
        />
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cartProducts={cartProducts} />}
        />
        <Route
          path="*"
          element={<NotFoundPage cartProducts={cartProducts} />}
        />
      </Routes>
    </>
  );
}
export default AppRoutes;
