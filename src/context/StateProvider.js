import React, { useReducer, createContext, useContext } from "react";

export const stateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <stateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </stateContext.Provider>
);

export const useStateValue = () => useContext(stateContext);
