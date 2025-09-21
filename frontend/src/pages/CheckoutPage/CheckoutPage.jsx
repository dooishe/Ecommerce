import { useEffect, useState } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import CheckoutHeader from "./components/CheckoutHeader/CheckoutHeader";
import CheckoutProductCard from "./components/CheckoutProductCard/CheckoutProductCard";
import PaymentSummary from "./components/PaymentSummary";
import "./CheckoutPage.css";

function CheckoutPage({ cartProducts, loadCart }) {
  const [paymentSummary, setPaymentSummary] = useState(null);
  useTitle("Checkout");
  useFavicon("/favicons/cart-favicon.png");
  const fetchPaymentSummary = async () => {
    try {
      const { data } = await axios.get("/api/payment-summary");
      setPaymentSummary(data);
    } catch (error) {
      console.error("something went wrong:", error);
    }
  };
  useEffect(() => {
    fetchPaymentSummary();
  }, [cartProducts]);
  return (
    <>
      <CheckoutHeader cartProducts={cartProducts} />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>
        <div className="checkout-grid">
          <div className="order-summary">
            {cartProducts?.map((cartProduct) => {
              return (
                <CheckoutProductCard
                  key={cartProduct.productId}
                  cartProduct={cartProduct}
                  loadCart={loadCart}
                />
              );
            })}
          </div>
          <div className="payment-summary">
            {paymentSummary && (
              <PaymentSummary paymentSummary={paymentSummary} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
