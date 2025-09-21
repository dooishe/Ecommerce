import { useState, useEffect } from "react";
import axios from "axios";
import DeliveryDate from "./components/DeliveryDate";
import CartItemDetails from "./components/CartItemDetails";
function CheckoutProductCard({ cartProduct, loadCart, fetchPaymentSummary }) {
  const [deliveryOptions, setDeliveryOptions] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(
    cartProduct.deliveryOptionId
  );
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
        {deliveryOptions && (
          <DeliveryDate
            selectedOptionId={selectedOptionId}
            deliveryOptions={deliveryOptions}
          />
        )}

        <CartItemDetails
          cartProduct={cartProduct}
          deliveryOptions={deliveryOptions}
          selectedOptionId={selectedOptionId}
          setSelectedOptionId={setSelectedOptionId}
          loadCart={loadCart}
          fetchPaymentSummary={fetchPaymentSummary}
        />
      </div>
    </>
  );
}

export default CheckoutProductCard;
