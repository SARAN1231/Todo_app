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

  return (
    <Authcontext.Provider value={contextvalues}>
      {children}
    </Authcontext.Provider>
  );
};
export const useAuth = () => {
  return useContext(Authcontext);
};
export default ContextProvider;
