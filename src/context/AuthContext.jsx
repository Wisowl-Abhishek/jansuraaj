"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wisowl.com/";


  return (
    <AuthContext.Provider
      value={{ appUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
