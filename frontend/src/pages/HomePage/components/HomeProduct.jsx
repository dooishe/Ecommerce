import { useEffect, useRef, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { convertCentsToDollars } from "../../../utils/money";
import checkmark from "@/assets/icons/checkmark.png";

function HomeProduct({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const timer = useRef();
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);
  const addToCart = async () => {
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
      });
      await loadCart();
      setShowMessage(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  function changeValue(event) {
    setQuantity(Number(event.target.value));
  }
  return (
    <>
      <div
        data-testid={"product-container"}
        key={product.id}
        className="product-container"
      >
        <div className="product-image-container">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-name limit-text-to-2-lines">{product.name}</div>

        <div className="product-rating-container">
          <img
            className="product-rating-stars"
            src={`images/ratings/rating-${product.rating.stars * 10}.png`}
            alt={"reviews"}
          />
          <div className="product-rating-count link-primary">
            {product.rating.count}
          </div>
        </div>

        <div className="product-price">
          ${convertCentsToDollars(product.priceCents)}
        </div>

        <div className="product-quantity-container">
          <select value={quantity} onChange={changeValue}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div className="product-spacer"></div>

        <div
          className={clsx("added-to-cart", { visible: showMessage })}
          data-testid="added-message"
        >
          <img src={checkmark} alt="Added to cart checkmark" />
          Added
        </div>

        <button
          className="add-to-cart-button button-primary"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default HomeProduct;
