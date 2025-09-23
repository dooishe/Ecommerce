import { useEffect, useState } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import CheckoutHeader from "./components/CheckoutHeader/CheckoutHeader";
import CheckoutProductCard from "./components/CheckoutProductCard/CheckoutProductCard";
import PaymentSummary from "./components/PaymentSummary";
import "./CheckoutPage.css";

function CheckoutPage({ cartProducts, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState(null);
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
    async function fetchDeliveryOptions() {
      try {
        const { data } = await axios.get("/api/delivery-options");
        setDeliveryOptions(data);
      } catch (error) {
        console.error("something went wrong:", error);
      }
    }
    fetchDeliveryOptions();
  }, []);
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
                  deliveryOptions={deliveryOptions}
                  key={cartProduct.productId}
                  cartProduct={cartProduct}
                  loadCart={loadCart}
                  fetchPaymentSummary={fetchPaymentSummary}
                />
              );
            })}
          </div>
          <div className="payment-summary">
            {paymentSummary && (
              <PaymentSummary
                paymentSummary={paymentSummary}
                loadCart={loadCart}
                cartProducts={cartProducts}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
