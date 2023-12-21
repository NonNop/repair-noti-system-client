// ดึงข้อมูล token
export const getToken = () => {
  if (window !== "undefined") {
    // ทำการเช็ค session Storage ว่ามีการสร้าง key ชื่อว่า token หรือไม่
    if (sessionStorage.getItem("token")) {
      // ทำการแปลงจาก string เป็น JSON Object
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

// ดึงข้อมูล user
export const getUser = () => {
  if (window !== "undefined") {
    // ทำการเช็ค session Storage ว่ามีการสร้าง key ชื่อว่า user หรือไม่
    if (sessionStorage.getItem("token")) {
      // ทำการแปลงจาก string เป็น JSON Object
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};
