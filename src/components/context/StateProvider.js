import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
};

// creating a function to get the data so that we can use it anywhere
// orelse use useContext in required components like below
export const useStateValue = () => useContext(StateContext);
