import { useState } from "react";
import axios from "axios";
import { convertCentsToDollars } from "@/utils/money.js";
import { isStringValidIntegerNumberGreaterZeroBelowOneHundred } from "@/utils/validationUtils";
import DeliveryOption from "./DeliveryOption";
function CartItemDetails({
  cartProduct,
  deliveryOptions,
  selectedOptionId,
  setSelectedOptionId,
  loadCart,
  fetchPaymentSummary,
}) {
  const [isEditing, setEditing] = useState(false);
  const [quantity, setQuantity] = useState(cartProduct.quantity);
  async function deleteCartProduct() {
    await axios.delete(`/api/cart-items/${cartProduct.productId}`);
    loadCart();
  }
  async function updateQuantityIfValid() {
    if (!isEditing) {
      setEditing(true);
    } else if (isStringValidIntegerNumberGreaterZeroBelowOneHundred(quantity)) {
      const newQuantity = Number(quantity);
      await axios.put(`/api/cart-items/${cartProduct.productId}`, {
        quantity: newQuantity,
      });
      await loadCart();
      setEditing(false);
    }
  }
  function updateQuantityInput(event) {
    setQuantity(event.target.value);
  }
  function handleInputOnKeyDown(event) {
    if (event.key === "Enter") {
      updateQuantityIfValid();
    } else if (event.key === "Escape") {
      setQuantity(cartProduct.quantity);
      setEditing(false);
      return;
    }
  }
  return (
    <>
      <div className="cart-item-details-grid">
        <img className="product-image" src={cartProduct.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartProduct.product.name}</div>
          <div className="product-price">
            ${convertCentsToDollars(cartProduct.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:
              {isEditing ? (
                <input
                  type="text"
                  value={quantity}
                  onChange={updateQuantityInput}
                  className="input-quantity"
                  onKeyDown={handleInputOnKeyDown}
                />
              ) : (
                <span className="quantity-label">{cartProduct.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateQuantityIfValid}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteCartProduct}
            >
              Delete
            </span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions?.map((option) => {
            return (
              <DeliveryOption
                key={option.id}
                deliveryOption={option}
                cartProduct={cartProduct}
                selectedOptionId={selectedOptionId}
                setSelectedOptionId={setSelectedOptionId}
                fetchPaymentSummary={fetchPaymentSummary}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
