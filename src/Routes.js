import React from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Home from "./components/home/Home";
import CheckoutPage from "./components/checkoutPage/CheckoutPage";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Payment from "./components/payment/Payment";
import Orders from "./components/ordersPage/Orders";

const PageRoutes = () => {
  const promise = loadStripe(
    "pk_test_51KnQp1SBJvny6lvWzKzxWCZzfB9kLpCEDvAsuqtB7qi0IYeln4pqhYchKjhlhRAhNeSZPMlEXOyVQbSQHe41jNaP004Netx2B6"
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
          </>
        }
      />
      <Route
        path="/checkout"
        element={
          <>
            <Header />
            <CheckoutPage />
          </>
        }
      />
      <Route
        path="/payment"
        element={
          <>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </>
        }
      />
      <Route
        path="/orders"
        element={
          <>
            <Header />
            <Orders />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default PageRoutes;
