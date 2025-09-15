import dayjs from "dayjs";
import { convertCentsToDollars } from "@/utils/money.js";
function OrderHeader({ orderInfo }) {
  return (
    <>
      <div className="order-header">
        <div className="order-header-left-section">
          <div className="order-date">
            <div className="order-header-label">Order Placed:</div>
            <div>{dayjs(orderInfo.orderTimeMs).format("MMMM DD")}</div>
          </div>
          <div className="order-total">
            <div className="order-header-label">Total:</div>
            <div>${convertCentsToDollars(orderInfo.totalCostCents)}</div>
          </div>
        </div>

        <div className="order-header-right-section">
          <div className="order-header-label">Order ID:</div>
          <div>{orderInfo.id}</div>
        </div>
      </div>
    </>
  );
}

export default OrderHeader;
