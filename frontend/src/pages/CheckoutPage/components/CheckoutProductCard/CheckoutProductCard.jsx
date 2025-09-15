import { useState } from "react";
import DeliveryDate from "./components/DeliveryDate";
import CartItemDetails from "./components/CartItemDetails";
function CheckoutProductCard({ cartProduct, deliveryOptions }) {
  const [selectedOptionDays, setSelectedOptionDays] = useState(7);
  return (
    <>
      <div className="cart-item-container">
        <DeliveryDate selectedOptionDays={selectedOptionDays} />
        <CartItemDetails
          cartProduct={cartProduct}
          deliveryOptions={deliveryOptions}
          selectedOptionDays={selectedOptionDays}
          setSelectedOptionDays={setSelectedOptionDays}
        />
      </div>
    </>
  );
}

export default CheckoutProductCard;
