import React from "react";

import "./CheckoutPage.css";
import checkoutBanner from "../../../public/checkout_banner.jpeg";

import Subtotal from "../subtotal/Subtotal";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import { useStateValue } from "../context/StateProvider";

const CheckoutPage = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__banner"
          src={checkoutBanner}
          alt="checkout banner"
        />
        <div>
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {basket.map((product) => (
            <CheckoutProduct
              id={product.id}
              styles={product.styles}
              title={product.title}
              image={product.image}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default CheckoutPage;
