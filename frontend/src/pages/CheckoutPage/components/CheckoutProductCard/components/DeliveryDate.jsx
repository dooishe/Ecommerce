import dayjs from "dayjs";
function DeliveryDate({ selectedOptionDays }) {
  function calculateDeliveryDate() {
    const time = dayjs();
    const deliveryDate = time.add(selectedOptionDays, "days");
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
