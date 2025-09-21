import dayjs from "dayjs";
function DeliveryDate({ deliveryOptions, selectedOptionId }) {
  const selectedOption = deliveryOptions.find((option) => {
    return option.id === selectedOptionId;
  });
  function calculateDeliveryDate() {
    const time = dayjs();
    const deliveryDate = time.add(selectedOption.deliveryDays, "days");
    return deliveryDate.format("dddd, MMMM D");
  }
  return (
    <>
      <div className="delivery-date">
        Delivery date: {calculateDeliveryDate()}
      </div>
    </>
  );
}
export default DeliveryDate;
