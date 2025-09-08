import { useEffect, useState } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import CheckoutHeader from "./components/CheckoutHeader/CheckoutHeader.jsx";
import CheckoutProductCard from "./components/CheckoutProductCard/CheckoutProductCard.jsx";
import PaymentSummary from "./components/PaymentSummary/PaymentSummary.jsx";
import "./CheckoutPage.css";

function CheckoutPage({ cartProducts }) {
  const [deliveryOptions, setDeliveryOptions] = useState(null);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useTitle("Checkout");
  useFavicon("/favicons/cart-favicon.png");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deliveryRes, paymentRes] = await Promise.all([
          axios.get("/api/delivery-options"),
          axios.get("/api/payment-summary"),
        ]);

        const delivery = deliveryRes.data;
        const payment = paymentRes.data;

        setDeliveryOptions(delivery);
        setPaymentSummary(payment);
      } catch (er) {
        console.error("something went wrong:", er);
      }
    };

    fetchData();
  }, []);
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
                  deliveryOptions={deliveryOptions}
                />
              );
            })}
          </div>
          <div className="payment-summary">
            <PaymentSummary paymentSummary={paymentSummary} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
