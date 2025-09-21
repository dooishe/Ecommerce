import axios from "axios";
import dayjs from "dayjs";
import { convertCentsToDollars } from "@/utils/money.js";
function DeliveryOptions({
  deliveryOption,
  cartProduct,
  selectedOptionId,
  setSelectedOptionId,
  fetchPaymentSummary,
}) {
  function calculateDeliveryDate() {
    const time = dayjs();
    const deliveryDate = time.add(deliveryOption.deliveryDays, "days");
    return deliveryDate.format("dddd, MMMM D");
  }
  function calculatedeliveryMessage() {
    let deliveryMessage = "FREE Shipping";
    if (deliveryOption.priceCents > 0) {
      deliveryMessage = `$${convertCentsToDollars(
        deliveryOption.priceCents
      )} - Shipping`;
    }
    return deliveryMessage;
  }
  async function updateDeliveryOption() {
    setSelectedOptionId(deliveryOption.id);
    await axios.put(`/api/cart-items/${cartProduct.productId}`, {
      deliveryOptionId: `${deliveryOption.id}`,
    });
    await fetchPaymentSummary();
  }
  console.log9;
  return (
    <>
      <label className="delivery-option">
        <input
          type="radio"
          checked={deliveryOption.id === selectedOptionId}
          className="delivery-option-input"
          name={`delivery-option-${cartProduct.productId}`}
          onChange={updateDeliveryOption}
        />
        <div>
          <div className="delivery-option-date">{calculateDeliveryDate()}</div>
          <div className="delivery-option-price">
            {calculatedeliveryMessage()}
          </div>
        </div>
      </label>
    </>
  );
}
export default DeliveryOptions;
