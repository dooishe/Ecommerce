import axios from "axios";
import { convertCentsToDollars } from "@/utils/money.js";
import DeliveryOption from "./DeliveryOption";
import { useState } from "react";
function CartItemDetails({
  cartProduct,
  deliveryOptions,
  selectedOptionDays,
  setSelectedOptionDays,
  loadCart,
}) {
  const [isEditing, setEditing] = useState(false);
  async function deleteCartProduct() {
    await axios.delete(`/api/cart-items/${cartProduct.productId}`);
    loadCart();
  }
  function isNumeric(value) {
    return !isNaN(value) && value.trim() !== "";
  }
  async function updateQuantity(quantity) {
    await axios.put(`/api/cart-items/${cartProduct.productId}`, {
      quantity,
      deliveryOptionId: "1",
    });
    await loadCart();
    setEditing(false);
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
                  onKeyDown={(event) => {
                    const value = event.target.value;
                    if (event.key === "Enter" && isNumeric(value)) {
                      updateQuantity(Number(value));
                    }
                  }}
                ></input>
              ) : (
                <span className="quantity-label">{cartProduct.quantity}</span>
              )}
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={() => {
                setEditing(true);
              }}
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
                selectedOptionDays={selectedOptionDays}
                setSelectedOptionDays={setSelectedOptionDays}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CartItemDetails;
