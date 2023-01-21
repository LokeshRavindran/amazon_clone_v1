import React from "react";

import "./ProductItem.css";

import { useStateValue } from "../context/StateProvider";

const ProductItem = ({ id, styles, title, image, price, rating }) => {
  const [state, dispatch] = useStateValue();

  const addToBasketHandler = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });

    console.log("current basket >>> ", state.basket);
  };

  return (
    <div className={`${styles} productItem`}>
      <div className="productItem__info">
        <p className="productItem__title">{title}</p>
        <p className="productItem__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="productItem__rating">{rating}</div>
      </div>
      <img src={image} />
      <button onClick={addToBasketHandler}>Add to Basket</button>
    </div>
  );
};

export default ProductItem;
