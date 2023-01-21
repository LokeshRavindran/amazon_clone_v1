import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

import "./Orders.css";

import { db } from "../../firebase";
import { useStateValue } from "../context/StateProvider";
import Order from "../order/Order";

const Orders = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const colRef = collection(db, "users", user?.uid, "orders");
      const sortedData = query(colRef, orderBy("created", "desc"));
      onSnapshot(sortedData, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => {
          return <Order order={order} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
