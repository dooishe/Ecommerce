import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header.jsx";
import OrderTracking from "./components/OrderTracking";
import "./TrackingPage.css";
function TrackingPage({ cartProducts }) {
  const [orderInfo, setOrderInfo] = useState(null);
  const { orderId, productId } = useParams();

  useTitle("Tracking");
  useFavicon("/favicons/tracking-favicon.png");
  useEffect(() => {
    async function fetchOrderDetails() {
      const { data } = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );

      setOrderInfo(data);
    }
    fetchOrderDetails();
  }, [orderId]);
  return (
    <>
      <Header cartProducts={cartProducts} />
      <div className="tracking-page">
        {orderInfo && (
          <OrderTracking orderInfo={orderInfo} productId={productId} />
        )}
      </div>
    </>
  );
}

export default TrackingPage;
