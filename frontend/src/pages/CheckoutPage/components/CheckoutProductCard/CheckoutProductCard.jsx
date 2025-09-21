import { useState, useEffect } from "react";
import axios from "axios";
import DeliveryDate from "./components/DeliveryDate";
import CartItemDetails from "./components/CartItemDetails";
function CheckoutProductCard({ cartProduct, loadCart, fetchPaymentSummary }) {
  const [deliveryOptions, setDeliveryOptions] = useState(null);
  const [selectedOptionDays, setSelectedOptionDays] = useState(7);
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
  return (
    <>
      <div className="cart-item-container">
        <DeliveryDate selectedOptionDays={selectedOptionDays} />
        <CartItemDetails
          cartProduct={cartProduct}
          deliveryOptions={deliveryOptions}
          selectedOptionDays={selectedOptionDays}
          setSelectedOptionDays={setSelectedOptionDays}
          loadCart={loadCart}
          fetchPaymentSummary={fetchPaymentSummary}
        />
      </div>
    </>
  );
}

export default CheckoutProductCard;
