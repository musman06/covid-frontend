import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/login" />;
};
export default ProtectedRoutes;
