import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setName(response.data.result[0].name);
        setRole(response.data.result[0].role_id);
        setPosition(response.data.result[0].user_position);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [username, setName] = useState("");
  const [userrole, setRole] = useState("");
  const [userposition, setPosition] = useState("");

  const initialValueRegister = {
    name: username,
    role: userrole,
    position: userposition,
  };

  console.log(initialValueRegister);

  const RgisterSchema = yup.object().shape({
    name: yup.string().required("กรุณากรอกข้อมูล"),
    role: yup.string().required("กรุณากรอกข้อมูล"),
    position: yup.string().required("กรุณากรอกข้อมูล"),
  });

  const handleFormSubmit = async (values) => {
    const { name, role, position } = values;
    await axios
      .put(
        `http://localhost:5000/api/update/${id}`,
        { name, role, position },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        Swal.fire("แก้ไขบัญชีผู้ใช้งานสำเร็จ", "", "success");

        navigate("/manage-users");
      })
      .catch(() => {
        Swal.fire("แก้ไขบัญชีผู้ใช้งานไม่สำเร็จ", "", "error");
      });
  };

  const comfirmCancle = () => {
    Swal.fire({
      title: "คุณต้องการยกเลิกการแก้ไขบัญชีผู้ใข้งานหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // กดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        navigate("/manage-users");
      }
    });
  };

  return (
    <div className='h-screen border-2 border-gray-100 flex justify-center items-center'>
      <div className='w-full m-10'>
        <div className='bg-white p-10 rounded-sm shadow-lg min-w-full'>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValueRegister}
            validationSchema={RgisterSchema}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <h1 className='text-center text-2xl mb-6 text-gray-600 font-bold font-sans'>
                    แก้ไขข้อมูลบัญชีผู้ใช้งาน
                  </h1>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      ชื่อ - นามสกุล
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none ${
                        touched.name && Boolean(errors.name)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='text'
                      name='name'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      placeholder='ชื่อ - นามสกุล'
                    />
                    <ErrorMessage
                      component='div'
                      name='unit'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                  <div className=' gap-5 items-center lg:w-full'>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      สถานะ
                    </label>
                    <select
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none ${
                        touched.role && Boolean(errors.role)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      name='role'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.role}
                    >
                      <option>เลือกสถานะการใช้งาน</option>
                      <option value='1'>แอดมิน</option>
                      <option value='2'>หัวหน้าฝ่ายพัสดุ</option>
                      <option value='3'>ช่างเทคนิค</option>
                      <option value='4'>เจ้าหน้าที่</option>
                    </select>
                    <ErrorMessage
                      component='div'
                      name='role'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      ตำแหน่ง
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none ${
                        touched.position && Boolean(errors.position)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='text'
                      name='position'
                      rows='4'
                      cols='50'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.position}
                      placeholder='ตำแหน่ง'
                    ></input>
                    <ErrorMessage
                      component='div'
                      name='position'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                  <div className='lg:flex lg:justify-center'>
                    <button
                      type='submit'
                      className='w-full lg:w-28 mr-5 mt-6 bg-green-500 rounded-lg px-4 py-2  text-white tracking-wide font-semibold font-sans hover:bg-green-300'
                    >
                      ยืนยัน
                    </button>
                    <button
                      type='button'
                      className='w-full lg:w-28 mt-6 bg-red-500 rounded-lg px-4 py-2  text-white tracking-wide font-semibold font-sans hover:bg-red-300'
                      onClick={() => comfirmCancle()}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
