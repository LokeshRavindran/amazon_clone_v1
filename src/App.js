import React, { useEffect } from "react";

import "./App.css";

import PageRoutes from "./Routes";
import { auth } from "./firebase";
import { useStateValue } from "./components/context/StateProvider";

const App = () => {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <PageRoutes />
    </div>
  );
};

export default App;
