import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // adjust path

const ProtectedRoute = ({ children }) => {
  const { isAdminLoggedIn } = useContext(AuthContext);
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
