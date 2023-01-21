import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import "./Login.css";

import { auth } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log("Sign In Successful");
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log("Success - New user created", auth);
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2014px-Amazon_logo.svg.png"
        />
      </Link>
      <div className="login__container">
        <h1>Sign In</h1>
        <form className="login__form">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={signInHandler}
          >
            Sign In
          </button>
        </form>
        <p>
          By continuing, you agree to Amazon's clone{" "}
          <strong> Conditions of Use</strong> and{" "}
          <strong>Privacy Notice</strong>.
        </p>
        <button className="login__registerButton" onClick={registerHandler}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
