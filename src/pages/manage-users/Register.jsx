import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function Register() {
  const navigate = useNavigate();

  const initialValueRegister = {
    username: "",
    password: "",
    name: "",
    role: "",
    position: "",
  };

  const RgisterSchema = yup.object().shape({
    username: yup.string().required("กรุณาเลือกอาคาร"),
    password: yup.string().required("กรุณากรอกข้อมูล"),
    name: yup.string().required("กรุณากรอกข้อมูล"),
    role: yup.string().required("กรุณาเลือกสถานะการใช้งาน"),
    position: yup.string().required("กรุณากรอกข้อมูล"),
  });

  const handleFormSubmit = async (values, event) => {
    const { username, password, name, role, position } = values;

    await axios
      .post(
        "http://localhost:5000/api/register",
        { username, password, name, role, position },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        Swal.fire("เพิ่มบัญชีผู้ใช้งานสำเร็จ", "", "success");
        // event.resetForm();
        navigate("/manage-users");
      })
      .catch(() => {
        Swal.fire("เพิ่มบัญชีผู้ใช้งานไม่สำเร็จ", "", "error");
      });
  };

  const comfirmCancle = () => {
    Swal.fire({
      title: "คุณต้องการยกเลิกการเพิ่มบัญชีผู้ใช้งานหรือไม่ ?",
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
    <div className='flex justify-center items-center'>
      <div className='lg:w-3/5 md:w-1/2 w-2/3  my-5 border-2 border-gray-50'>
        <div className='bg-white p-10 rounded-sm shadow-lg min-w-full'>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValueRegister}
            validationSchema={RgisterSchema}
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
                    เพิ่มบัญชีผู้ใช้งาน
                  </h1>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      ชื่อผู้ใช้
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg ${
                        touched.username && Boolean(errors.username)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='text'
                      name='username'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      placeholder='ชื่อผู้ใช้'
                    />
                    <ErrorMessage
                      component='div'
                      name='username'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>

                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      รหัสผ่าน
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg ${
                        touched.password && Boolean(errors.password)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='password'
                      min='1'
                      name='password'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      placeholder='รหัสผ่าน'
                    />
                    <ErrorMessage
                      component='div'
                      name='password'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      ชื่อ - นามสกุล
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg ${
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
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg ${
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
                      <option value='2'>ผู้อำนวยการศาลจังหวัดนครปฐม</option>
                      <option value='3'>หัวหน้าฝ่ายพัสดุ</option>
                      <option value='4'>ช่างเทคนิค</option>
                      <option value='5'>เจ้าหน้าที่</option>
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
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg ${
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

export default Register;
