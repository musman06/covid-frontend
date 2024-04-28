import React, { createContext, useState } from "react";

const AuthContext = createContext();

const usersData = [
  { name: "usman", email: "usman@example.com", password: "12345" },
  { name: "arshad", email: "arshad@example.com", password: "12345" },
  { name: "waris", email: "waris@example.com", password: "12345" },
];

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userInfo")
  );

  const login = (email, password) => {
    try {
      const userData = usersData?.find(
        (item) => item?.password === password && item?.email === email
      );
      if (userData) {
        localStorage.setItem("userInfo", JSON.stringify(userData));
        setIsLoggedIn(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Authentication failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
  };

  const user = () => JSON.parse(localStorage.getItem("userInfo"));

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
