import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/userSlice";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const jsonData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    const { username, password } = jsonData;

    await axios
      .post(
        `http://localhost:5000/api/login`,
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (res.data.message === "ไม่พบผู้ใช้") {
          Swal.fire("ไม่พบบัญชีผู้ใช้งาน", "", "error");
        } else if (res.data.message === "รหัสผ่านไม่ถูกต้อง") {
          Swal.fire("รหัสผ่านไม่ถูกต้อง", "", "error");
        } else {
          sessionStorage.setItem("token", JSON.stringify(res.data.token));
          dispatch(
            userLogin({
              id: res.data.payload.id,
              name: res.data.payload.name,
              role: res.data.payload.role,
              position: res.data.payload.position,
              token: res.data.token,
            })
          );
          roleRedirects(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const roleRedirects = (res) => {
    if (res.data.payload.role === "แอดมิน") {
      navigate("/manage-users");
    } else {
      navigate("/view-repair-notice");
    }
  };

  return (
    <div className='h-screen bg-indigo-100 flex justify-center items-center'>
      <div className='lg:w-2/5 md:w-1/2 w-2/3'>
        <form
          className='bg-white p-10 rounded-lg shadow-lg min-w-full'
          onSubmit={handlesubmit}
        >
          <div className='flex items-center justify-center'>
            <div className='text-6xl'>
              <PiUserCircleLight />
            </div>
          </div>
          <h1 className='text-center text-2xl mb-6 text-gray-600 font-bold font-sans'>
            เข้าสู่ระบบ
          </h1>
          <div className='mb-8'>
            <input
              className='w-full bg-gray-100 px-4 py-2 rounded-lg hover:bg-slate-200 border-2'
              type='text'
              name='username'
              placeholder='ชื่อผู้ใช้'
            />
          </div>
          <div>
            <input
              className='w-full bg-gray-100 px-4 py-2 rounded-lg hover:bg-slate-200 border-2'
              type='password'
              name='password'
              placeholder='รหัสผ่าน'
            />
          </div>
          <button
            type='submit'
            className='w-full mt-6 btn btn-success rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans hover:bg-green-800'
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
