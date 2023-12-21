import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function UserCheck({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const token = JSON.parse(sessionStorage.getItem("token"));

  return user && token ? children : <Navigate to='/' />;
}

export default UserCheck;
