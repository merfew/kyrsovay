import React, { createContext, useContext } from "react";

const AuthContext = createContext('cookies');

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
