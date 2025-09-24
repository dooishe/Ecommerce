import OrderHeader from "./OrderHeader";
import OrderProduct from "./OrderProduct";
function Order({ orderInfo, loadCart }) {
  return (
    <>
      <div className="order-container">
        <OrderHeader orderInfo={orderInfo} />
        <div className="order-details-grid">
          {orderInfo.products.map((product) => {
            return (
              <OrderProduct
                key={product.productId}
                product={product}
                orderInfo={orderInfo}
                loadCart={loadCart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Order;
