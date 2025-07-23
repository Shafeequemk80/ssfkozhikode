import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem("isAdminLoggedIn") === "true";
  });

  useEffect(() => {
    if (isAdminLoggedIn) {
      localStorage.setItem("isAdminLoggedIn", "true");
    } else {
      localStorage.removeItem("isAdminLoggedIn");
    }
  }, [isAdminLoggedIn]);

  return (
    <AuthContext.Provider value={{ isAdminLoggedIn, setIsAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
