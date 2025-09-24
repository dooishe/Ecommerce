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
  async function updateQuantityIfValid(quantity) {
    if (isStringValidIntegerNumberGreaterZeroBelowOneHundred(quantity)) {
      quantity = Number(quantity);
      await axios.put(`/api/cart-items/${cartProduct.productId}`, {
        quantity,
      });
      await loadCart();
      setEditing(false);
    }
  }
  function handleInputOnKeyDown(event) {
    if (event.key === "Escape") {
      setEditing(false);
      return;
    }
    if (event.key !== "Enter") return;
    updateQuantityIfValid(quantity);
  }
  function handleUpdateButtonClick() {
    if (!isEditing) {
      setEditing(true);
    } else {
      updateQuantityIfValid(quantity);
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
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  className="input-quantity"
                  onKeyDown={handleInputOnKeyDown}
                />
              ) : (
                <span className="quantity-label">{cartProduct.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={handleUpdateButtonClick}
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
