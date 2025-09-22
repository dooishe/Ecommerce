import { useState, useRef } from "react";
import axios from "axios";
import { convertCentsToDollars } from "@/utils/money.js";
import { isValidNumber } from "@/utils/validationUtils";
import DeliveryOption from "./DeliveryOption";
function CartItemDetails({
  cartProduct,
  deliveryOptions,
  selectedOptionId,
  setSelectedOptionId,
  loadCart,
  fetchPaymentSummary,
}) {
  const updateButtonRef = useRef(null);
  const [isEditing, setEditing] = useState(false);
  async function deleteCartProduct() {
    await axios.delete(`/api/cart-items/${cartProduct.productId}`);
    loadCart();
  }
  async function updateQuantity(quantity) {
    await axios.put(`/api/cart-items/${cartProduct.productId}`, {
      quantity,
    });
    await loadCart();
    setEditing(false);
  }
  function handleInputOnKeyDown(event) {
    const value = event.target.value;
    if (event.key === "Enter" && isValidNumber(value)) {
      updateQuantity(Number(value));
    }
  }
  function handleUpdateButtonClick() {
    if (!isEditing) {
      setEditing(true);
    } else {
      const value = updateButtonRef.current.value;
      if (isValidNumber(value)) {
        updateQuantity(Number(value));
      }
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
                  ref={updateButtonRef}
                  className="js-input-quantity"
                  onKeyDown={handleInputOnKeyDown}
                ></input>
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
