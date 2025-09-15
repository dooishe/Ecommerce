import { convertCentsToDollars } from "@/utils/money.js";
import DeliveryOptions from "./DeliveryOptions";
function CartItemDetails({
  cartProduct,
  deliveryOptions,
  selectedOptionDays,
  setSelectedOptionDays,
}) {
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
              <span className="quantity-label">{cartProduct.quantity}</span>
            </span>
            <span className="update-quantity-link link-primary">Update</span>
            <span className="delete-quantity-link link-primary">Delete</span>
          </div>
        </div>

        <div className="delivery-options">
          <div className="delivery-options-title">
            Choose a delivery option:
          </div>
          {deliveryOptions?.map((Option) => {
            return (
              <DeliveryOptions
                key={Option.id}
                deliveryOption={Option}
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
