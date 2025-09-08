import { useState, useEffect } from "react";
import axios from "axios";
import { useFavicon, useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header";
import Order from "./components/Order";
import "./OrdersPage.css";

function OrdersPage({ cartProducts }) {
  const [ordersInfo, setOrdersInfo] = useState(null);
  useTitle("Orders");
  useFavicon("/favicons/orders-favicon.png");
  useEffect(() => {
    async function fetchOrdersInfo() {
      try {
        const { data } = await axios.get("/api/orders?expand=products");
        setOrdersInfo(data);
      } catch (error) {
        console.log("something went wrong: ", error);
      }
    }
    fetchOrdersInfo();
  }, []);
  return (
    <>
      <Header cartProducts={cartProducts} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid">
          {ordersInfo?.map((orderInfo) => {
            return <Order key={orderInfo.id} orderInfo={orderInfo} />;
          })}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
