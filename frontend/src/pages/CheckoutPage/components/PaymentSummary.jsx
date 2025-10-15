import { useNavigate } from "react-router-dom";
import axios from "axios";
import { convertCentsToDollars } from "@/utils/money";
function PaymentSummary({ paymentSummary, loadCart, cartProducts }) {
  const navigate = useNavigate();
  async function createOrder() {
    if (cartProducts.length === 0) return;
    await axios.post("/api/orders");
    await loadCart();
    navigate("/orders");
  }
  return (
    <>
      <div className="payment-summary-title">Payment Summary</div>
      {
        <>
          <div className="payment-summary-row">
            <div data-testid="total-items">
              Items ({paymentSummary.totalItems}
              ):
            </div>
            <div className="payment-summary-money" data-testid="product-cost">
              ${convertCentsToDollars(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money" data-testid="shipping-cost">
              ${convertCentsToDollars(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div
              className="payment-summary-money"
              data-testid="total-cost-before-tax"
            >
              ${convertCentsToDollars(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money" data-testid="tax">
              ${convertCentsToDollars(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money" data-testid="total-cost">
              ${convertCentsToDollars(paymentSummary.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            onClick={createOrder}
          >
            Place your order
          </button>
        </>
      }
    </>
  );
}

export default PaymentSummary;
