import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
