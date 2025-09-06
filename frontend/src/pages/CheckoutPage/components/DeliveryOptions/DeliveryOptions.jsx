import dayjs from "dayjs";
function DeliveryOptions({
  deliveryOption,
  cartProduct,
  selectedOption,
  setSelectedOption,
}) {
  function calculateDeliveryDate() {
    const time = dayjs();
    const deliveryDate = time.add(deliveryOption.deliveryDays, "days");
    return deliveryDate.format("dddd, MMMM D");
  }
  function calculatedeliveryMessage() {
    const deliveryDays = deliveryOption.deliveryDays;
    let deliveryMessage = "";
    if (deliveryDays === 1) {
      deliveryMessage = "$9.99 - Shipping";
    } else if (deliveryDays === 3) {
      deliveryMessage = "$4.99 - Shipping";
    } else if (deliveryDays === 7) {
      deliveryMessage = "FREE Shipping";
    }
    return deliveryMessage;
  }
  function handleClick(e) {
    setSelectedOption(Number(e.target.value));
  }
  return (
    <>
      <div className="delivery-option">
        <input
          type="radio"
          value={deliveryOption.deliveryDays}
          checked={deliveryOption.deliveryDays === selectedOption}
          className="delivery-option-input"
          name={`delivery-option-${cartProduct.productId}`}
          onChange={handleClick}
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
