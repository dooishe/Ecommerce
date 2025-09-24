import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import buyAgain from "@/assets/icons/buy-again.png";
function OrderProduct({ product, orderInfo, loadCart }) {
  async function addToCart() {
    try {
      await axios.post("/api/cart-items", {
        productId: product.productId,
        quantity: 1,
      });
      loadCart();
    } catch (error) {
      console.log("something went wrong", error);
    }
  }
  return (
    <>
      <div className="product-image-container">
        <img src={product.product.image} />
      </div>
      <div className="product-details">
        <div className="product-name">{product.product.name}</div>
        <div className="product-delivery-date">
          Arriving on:
          {" " + dayjs(product.estimatedDeliveryTimeMs).format("MMMM DD")}
        </div>
        <div className="product-quantity">Quantity: {product.quantity}</div>
        <button className="buy-again-button button-primary">
          <img className="buy-again-icon" src={buyAgain} />
          <span className="buy-again-message" onClick={addToCart}>
            Add to Cart
          </span>
        </button>
      </div>

      <div className="product-actions">
        <Link to={`/tracking/${orderInfo.id}/${product.productId}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </>
  );
}

export default OrderProduct;
