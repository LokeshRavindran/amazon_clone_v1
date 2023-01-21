import React from "react";

import "./Home.css";

import heroBanner from "../../../public/amazon_hero_banner.jpg";
import { testProductDataHomepage } from "../../testData";

import ProductItem from "../productItem/ProductItem";

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src={heroBanner}
          alt="amazon hero banner"
        />

        <div className="home__productGridContainer">
          {/* Harding coding the values now*/}
          {testProductDataHomepage.map((product) => {
            return (
              <ProductItem
                id={product.id}
                styles={product.styles}
                title={product.title}
                image={product.image}
                price={product.price}
                rating={product.rating}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
