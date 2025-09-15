import { Link } from "react-router-dom";
import dayjs from "dayjs";
function OrderTracking({ orderInfo, productId }) {
  const product = orderInfo.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs =
    product.estimatedDeliveryTimeMs - orderInfo.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - orderInfo.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          Arriving on{" "}
          {dayjs(product.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
        </div>

        <div className="product-info">{product.product.name}</div>

        <div className="product-info">Quantity: {product.quantity}</div>

        <img className="product-image" src={product.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && "current-status"}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && "current-status"}`}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && "current-status"}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${deliveryPercent}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default OrderTracking;
