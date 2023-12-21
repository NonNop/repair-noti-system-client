import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsPersonAdd } from "react-icons/bs";
import Swal from "sweetalert2";

function ManageUsers() {
  const navigate = useNavigate();

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = async () => {
    await axios
      .get(`http://localhost:5000/api/users`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setInitialData(res.data.result);
        setData(res.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const comfirmDelete = (id) => {
    Swal.fire({
      title: "คุณต้องการลบบัญชีผู้ใช้งานหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // กดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        deleteUser(id);
      }
    });
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`http://localhost:5000/api/delete/${id}`)
      .then(() => {
        Swal.fire("ลบบัญชีผู้ใช้งานสำเร็จ", " ", "success");
        UserGet();
      })
      .catch((error) => {
        Swal.fire("ลบบัญชีผู้ใช้งานไม่สำเร็จ", "", "error");
      });
  };

  const updateUser = async (id) => {
    navigate(`/update-user/${id}`);
  };

  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  function handleFilter(e) {
    const filterValue = e.target.value.toLowerCase();
    const newData = initialData.filter((row) =>
      row.name.toLowerCase().includes(filterValue)
    );
    setData(newData);
  }

  const columns = [
    {
      name: <div className='font-bold'>ลำดับ</div>,
      selector: (row, index) => index + 1,
    },
    {
      name: <div className='font-bold'>ชื่อ - นามสกุล</div>,
      selector: (row) => row.name,
    },
    {
      name: <div className='font-bold'>สถานะ</div>,
      selector: (row) => row.role_name,
    },
    {
      name: <div className='font-bold'>ตำแหน่ง</div>,
      selector: (row) => row.user_position,
    },
    {
      button: true,
      ignoreRowClick: true,
      allowOverflow: true,
      cell: (row) => (
        <div className='inline-flex gap-1'>
          <button
            className='bg-yellow-400 hover:bg-yellow-200 text-gray-800 font-bold py-2 px-4 rounded'
            onClick={() => updateUser(row.id)}
          >
            <AiOutlineEdit />
          </button>
          <button
            className='bg-red-400 hover:bg-red-200 text-gray-800 font-bold py-2 px-4 rounded'
            onClick={() => comfirmDelete(row.id)}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className='mx-5 mt-10'>
        <h1 className='text-3xl font-bold mb-5'>จัดการบัญชีผู้ใช้งาน</h1>
        <Link to='/register-user'>
          <button className='w-full lg:w-auto btn btn-md border-green-500 bg-green-500 hover:bg-green-300'>
            <BsPersonAdd className='text-lg' />
            เพิ่มบัญชีผู้ใช้งาน
          </button>
        </Link>
      </div>
      <div className='bg-white rounded-sm lg:border-2 lg:border-gray-100 shadow-xl lg:p-5 my-5 mx-4'>
        <div className='my-5'>
          <input
            type='text'
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight bg-white'
            onChange={handleFilter}
            placeholder='ค้นหาชื่อ - นามสกุล'
          />
        </div>
        {/* ตารางข้อมูล */}
        <div className='hidden lg:block'>
          <DataTable
            columns={columns}
            data={data}
            pagination
            className='hidden lg:block'
          />
        </div>
      </div>
      {/* หน้าจอโทรศัพท์ */}
      <div className='lg:hidden mx-5 mt-10'>
        {data.map((repairData, idx) => {
          return (
            <div
              className='card rounded-sm bg-white shadow-xl mb-6 border-2'
              key={idx}
            >
              <table className='table mt-4'>
                <tbody>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>
                      ชื่อ - นามสกุล
                    </th>
                    <td>{repairData.name}</td>
                  </tr>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>สถานะ</th>
                    <td>{repairData.role_name}</td>
                  </tr>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>
                      ตำแหน่ง
                    </th>
                    <td>{repairData.user_position}</td>
                  </tr>
                </tbody>
              </table>
              <div className='card-actions justify-end mr-4 mb-4'>
                <button
                  className='bg-yellow-400 hover:bg-yellow-200 text-gray-800 font-bold py-2 px-4 rounded'
                  onClick={() => updateUser(repairData.id)}
                >
                  <AiOutlineEdit />
                </button>
                <button
                  className='bg-red-400 hover:bg-red-200 text-gray-800 font-bold py-2 px-4 rounded'
                  onClick={() => comfirmDelete(repairData.id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default ManageUsers;
