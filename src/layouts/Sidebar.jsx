import logo2 from "../assets/logo2.png";
import { GiAutoRepair } from "react-icons/gi";
import { BsClipboardData } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/userSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <aside className='w-64 h-screen sticky top-0 hidden lg:block'>
      <div className='h-full px-3 py-4  border-r shadow-md '>
        <div className='p-4 pb-2 flex justify-center items-center'>
          <img src={logo2} className='w-20' alt='logo' />
        </div>
        <h3 className='text-2xl text-center font-bold border-b-2 pb-4 border-indigo-400'>
          ระบบแจ้งซ่อม
        </h3>
        <ul className='py-4 font-medium'>
          {user.user.role === "แอดมิน" && (
            <>
              <h4 className='text-gray-400'>บัญชีผู้ใช้งาน</h4>
              <li>
                <Link
                  to='/manage-users'
                  className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='flex items-center p-2'>
                    <MdOutlineManageAccounts />
                  </label>
                  <p className='text-sm'>จัดการบัญชีผู้ใช้งาน</p>
                </Link>
              </li>
            </>
          )}
          {user.user.role === "หัวหน้าฝ่ายพัสดุ" && (
            <>
              <h4 className='text-gray-400'>จัดการข้อมูลการแจ้งซ่อม</h4>
              <li>
                <Link
                  to='/list-repair-parcel'
                  className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='flex items-center p-2'>
                    <BsClipboardData />
                  </label>
                  <p className='text-sm'>ใบแจ้งซ่อมวัสดุ</p>
                </Link>
              </li>
              <li>
                <Link
                  to='/view-repair-parcel'
                  className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='flex items-center p-2'>
                    <BsClipboardData />
                  </label>
                  <p className='text-sm'>รายงานผลการดำเนินการ</p>
                </Link>
              </li>
              <li>
                <Link
                  to='/view-repair-approve'
                  className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='flex items-center p-2'>
                    <BsClipboardData />
                  </label>
                  <p className='text-sm'>ออกรายงานผลการดำเนินการ</p>
                </Link>
              </li>
            </>
          )}
          {user.user.role === "ช่างเทคนิค" && (
            <>
              <h4 className='text-gray-400'>จัดการข้อมูลการแจ้งซ่อม</h4>
              <li>
                <Link
                  to='/view-repair-mechanice'
                  className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='flex items-center p-2'>
                    <BsClipboardData />
                  </label>
                  <p className='text-sm'>การดำเนินการ</p>
                </Link>
              </li>
              <li>
                <Link
                  to='/view-repair-approve'
                  className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='flex items-center p-2'>
                    <BsClipboardData />
                  </label>
                  <p className='text-sm'>ออกรายงานผลการดำเนินการ</p>
                </Link>
              </li>
            </>
          )}
          <h4 className='text-gray-400'>การแจ้งซ่อม</h4>
          <li>
            <Link
              to='/view-repair-notice'
              className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
            >
              <label className='flex items-center p-2'>
                <BsClipboardData />
              </label>
              <p className='text-sm'>ข้อมูลการแจ้งซ่อม</p>
            </Link>
          </li>
          <li>
            <Link
              to='/repair-notice'
              className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
            >
              <label className='flex items-center p-2'>
                <GiAutoRepair />
              </label>
              <p className='text-sm'>แจ้งซ่อม</p>
            </Link>
          </li>
          <h4 className='text-gray-400'>การใช้งาน</h4>
          <li>
            <button
              className='w-full flex items-center p-2 rounded-lg hover:bg-blue-100 hover:text-blue-400'
              onClick={() => handleLogout()}
            >
              <label className='flex items-center p-2'>
                <IoLogOutOutline />
              </label>
              ออกจากระบบ
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
