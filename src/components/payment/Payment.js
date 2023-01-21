import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { collection, setDoc, doc } from "firebase/firestore";

import "./Payment.css";

import { useStateValue } from "../context/StateProvider";
import { getBasketTotal } from "../reducer/reducer";
import CheckoutProduct from "../checkoutProduct/CheckoutProduct";
import { db } from "../../firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  let navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      await fetch(
        `http://127.0.0.1:5001/v1-1b592/us-central1/api/payments/create?total=${getBasketTotal(
          basket
        )}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => console.log("error", error.message));
    };
    getClientSecret();
  }, [basket]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setProcessing(true);

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(async ({ paymentIntent }) => {
        // const colRef = collection(db, "users");
        // const docRef = doc(colRef, user?.uid);
        // const colRef2 = collection(docRef, "orders");
        // const docRef2 = doc(colRef2, paymentIntent.id);
        // await setDoc(docRef2, {
        //   basket: basket,
        //   amount: paymentIntent.amount,
        //   created: paymentIntent.created,
        // });

        const docRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        await setDoc(docRef, {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", { replace: true });
      })
      .catch((err) => {
        console.log("err", err);
        navigate("/", { replace: true });
      });
  };

  const cardChangeHandler = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout ({<Link to="/checkout">{basket?.length} items</Link>})</h1>
        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* Payment section - Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((product) => {
              return (
                <CheckoutProduct
                  id={product.id}
                  styles={""}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  rating={product.rating}
                />
              );
            })}
          </div>
        </div>
        {/* Payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={formSubmitHandler}>
              <CardElement onChange={cardChangeHandler} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
