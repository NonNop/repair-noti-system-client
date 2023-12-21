import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ParcelCheck({ children }) {
  const { user } = useSelector((state) => ({ ...state }));
  const token = JSON.parse(sessionStorage.getItem("token"));

  if (user && token && user.user.role === "หัวหน้าฝ่ายพัสดุ") {
    // ถ้ายังไม่ได้เข้าสู่ระบบ ให้ redirect ไปที่หน้า login
    return children;
  }
  // ถ้าเข้าสู่ระบบแล้วให้แสดงเนื้อหาที่เป็น children
  return <Navigate to='/' />;
}

export default ParcelCheck;
