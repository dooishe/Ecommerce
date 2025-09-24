import { useState } from "react";
import DeliveryDate from "./components/DeliveryDate";
import CartItemDetails from "./components/CartItemDetails";
function CheckoutProductCard({
  deliveryOptions,
  cartProduct,
  loadCart,
  fetchPaymentSummary,
}) {
  const [selectedOptionId, setSelectedOptionId] = useState(
    cartProduct.deliveryOptionId
  );

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
