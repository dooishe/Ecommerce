import dayjs from "dayjs";
import { convertCentsToDollars } from "@/utils/money.js";
function DeliveryOptions({
  deliveryOption,
  cartProduct,
  selectedOptionDays,
  setSelectedOptionDays,
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
  return (
    <>
      <div className="delivery-option">
        <input
          type="radio"
          checked={deliveryOption.deliveryDays === selectedOptionDays}
          className="delivery-option-input"
          name={`delivery-option-${cartProduct.productId}`}
          onChange={() => {
            setSelectedOptionDays(deliveryOption.deliveryDays);
          }}
        />
        <div>
          <div className="delivery-option-date">{calculateDeliveryDate()}</div>
          <div className="delivery-option-price">
            {calculatedeliveryMessage()}
          </div>
        </div>
      </div>
    </>
  );
}
export default DeliveryOptions;
