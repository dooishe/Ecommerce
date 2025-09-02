import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage.jsx";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage.jsx";
import OrdersPage from "../pages/Orders/OrdersPage.jsx";
import TrackingPage from "../pages/Tracking/TrackingPage.jsx";
function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="tracking" element={<TrackingPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
