import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

import "./Order.css";

import CheckoutProduct from "../checkoutProduct/CheckoutProduct";

const Order = ({ order }) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((product) => {
        return (
          <CheckoutProduct
            id={product.id}
            styles={""}
            title={product.title}
            image={product.image}
            price={product.price}
            rating={product.rating}
            hideButton={true}
          />
        );
      })}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
};

export default Order;
