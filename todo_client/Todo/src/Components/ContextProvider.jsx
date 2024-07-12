// ContextProvider.js
import React, { createContext, useContext, useState } from "react";

export const Authcontext = createContext(null);

const ContextProvider = ({ children }) => {
  const initialauthuser = localStorage.getItem("users");
  const [authuser, setauthuser] = useState(
    initialauthuser ? JSON.parse(initialauthuser) : null
  );

  const contextvalues = {
    authuser,
    setauthuser,
  };
console.log(authuser)
  return (
    <Authcontext.Provider value={contextvalues}>
      {children}
    </Authcontext.Provider>
  );
};

export default ContextProvider;
