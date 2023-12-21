import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminCheck = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const token = JSON.parse(sessionStorage.getItem("token"));

  if (user && token && user.user.role === "แอดมิน") {
    // ถ้าเข้าสู่ระบบแล้วให้แสดงเนื้อหาที่เป็น children
    return children;
  }
  // ถ้ายังไม่ได้เข้าสู่ระบบ ให้ redirect ไปที่หน้า 404-NotFound
  return <Navigate to='/' />;
};

export default AdminCheck;
