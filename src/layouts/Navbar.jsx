import { Link, Outlet, useNavigate } from "react-router-dom";
import { GiAutoRepair } from "react-icons/gi";
import { BsClipboardData, BsFillDiagram3Fill } from "react-icons/bs";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { BiSolidUserCircle } from "react-icons/bi";
import logo2 from "../assets/logo2.png";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/userSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <div className='drawer'>
      <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col'>
        {/* Navbar */}
        <div className='w-full navbar bg-blue-500 border-r shadow-md '>
          <div className='flex-none lg:hidden'>
            <label
              htmlFor='my-drawer-3'
              aria-label='open sidebar'
              className='btn btn-square btn-ghost'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block w-6 h-6 stroke-white'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </label>
          </div>
          <div className='flex-1 px-2 mx-2 hidden lg:block'>
            <div className='flex justify-between items-center text-white'>
              <div className='flex items-center gap-1 cursor-default'>
                <label className='text-xl'>
                  <BsFillDiagram3Fill />
                </label>
                {user.user.position}
              </div>
              <div className='flex items-center gap-1 cursor-default'>
                <label className='text-xl'>
                  <BiSolidUserCircle />
                </label>
                {user.user.name}
              </div>
            </div>
          </div>
          <div className='flex-1 lg:hidden'>
            <img src={logo2} alt='logo' className='w-7' />
          </div>
        </div>

        {/* Page content here */}
        <div className='h-full'>
          <Outlet />
        </div>
      </div>

      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='drawer-overlay '
        ></label>
        <ul className='menu p-4 w-80 min-h-full bg-base-200 gap-3'>
          {/* Sidebar content here */}
          <li>
            <Link to='#'>
              <label className='text-xl'>
                <BiSolidUserCircle />
              </label>
              {user.user.name}
            </Link>
          </li>
          <li className='border-b-2 border-indigo-400 pb-2 '>
            <Link to='#'>
              <label className='text-xl'>
                <BsFillDiagram3Fill />
              </label>
              {user.user.position}
            </Link>
          </li>
          {user.user.role === "แอดมิน" && (
            <>
              <h4 className='text-gray-400'>บัญชีผู้ใช้งาน</h4>
              <li>
                <Link
                  to='/manage-users'
                  className='flex items-center text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
                >
                  <label className='text-xl'>
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
              to='/repair-notice'
              className='text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
            >
              <label className='text-xl'>
                <GiAutoRepair />
              </label>
              <p className='text-sm'>แจ้งซ่อม</p>
            </Link>
          </li>
          <li>
            <Link
              to='/view-repair-notice'
              className='text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
            >
              <label className='text-xl'>
                <BsClipboardData />
              </label>
              <p className='text-sm'>ข้อมูลการแจ้งซ่อม</p>
            </Link>
          </li>
          <h4 className='text-gray-400'>การใช้งาน</h4>
          <li>
            <button
              className='text-sm text-gray-900 rounded-lg hover:bg-blue-100 hover:text-blue-400'
              onClick={() => handleLogout()}
            >
              <label className='text-xl'>
                <IoLogOutOutline />
              </label>
              ออกจากระบบ
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
