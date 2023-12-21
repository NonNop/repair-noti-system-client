import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

function UpdateRepairNotice() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/repairnotice/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setRepairData({
          building: response.data.result[0].building,
          list: response.data.result[0].repair_list,
          quantity: response.data.result[0].quantity,
          unit: response.data.result[0].unit,
          malfunction: response.data.result[0].malfunction,
          area: response.data.result[0].area,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [repairData, setRepairData] = useState({
    building: "",
    list: "",
    quantity: "",
    unit: "",
    malfunction: "",
    area: "",
  });

  const initialValueRepairNotice = {
    building: repairData.building,
    list: repairData.list,
    quantity: repairData.quantity,
    unit: repairData.unit,
    malfunction: repairData.malfunction,
    area: repairData.area,
  };

  const repairNoticeSchema = yup.object().shape({
    building: yup.string().required("กรุณาเลือกอาคาร"),
    list: yup.string().required("กรุณากรอกข้อมูล"),
    quantity: yup
      .number()
      .min(1, "จำนวนไม่น้อยกว่า 1!")
      .required("กรุณากรอกข้อมูล"),
    unit: yup.string().required("กรุณากรอกข้อมูล"),
    malfunction: yup.string().required("กรุณากรอกข้อมูล"),
    area: yup.string().required("กรุณากรอกข้อมูล"),
  });

  const handleFormSubmit = async (values) => {
    const { building, list, quantity, unit, malfunction, area } = values;
    await axios
      .put(
        `http://localhost:5000/api/updaterepairnotice/${id}`,
        { building, list, quantity, unit, malfunction, area },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        Swal.fire("แก้ไขใบแจ้งซ่อมสำเร็จ", " ", "success");
        navigate("/view-repair-notice");
      })
      .catch(() => {
        Swal.fire("แก้ไขใบแจ้งซ่อมไม่สำเร็จ", "", "error");
      });
  };

  const comfirmCancle = () => {
    Swal.fire({
      title: "คุณต้องการยกเลิกการแก้ไขใบแจ้งซ่อมหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // กดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        navigate("/view-repair-notice");
      }
    });
  };

  // const Cancle = () => {
  //   navigate("/view-repair-notice");
  // };

  return (
    <div className='h-full py-5 flex justify-center items-center'>
      <div className='m-10 bg-white'>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValueRepairNotice}
          validationSchema={repairNoticeSchema}
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
              <form
                onSubmit={handleSubmit}
                className='p-10 rounded-lg shadow-lg border-2 border-gray-50 min-w-full'
              >
                <h1 className='text-center text-2xl mb-6 text-gray-600 font-bold font-sans'>
                  แก้ไขข้อมูลการแจ้งซ่อม
                </h1>
                <h4 className='text-sm mb-6 text-gray-500 font-bold font-sans'>
                  มีความประสงค์ขอให้งานพัสดุ ดำเนอนการซ่อมแซม ปรับปรุง
                  แก้ไขความชำรุดของวัสดุ อุปกรณ์ และครุภัณฑ์ประกอบอาคาร ดังนี้
                </h4>
                <div className=' gap-5 items-center lg:w-full'>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    อาคาร
                  </label>
                  <select
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                      touched.building && Boolean(errors.building)
                        ? "border-2 border-rose-600"
                        : ""
                    }`}
                    // as='select'
                    name='building'
                    value={values.building}
                  >
                    <option>เลือกอาคาร</option>
                    <option value='อาคารที่ทำการศาล'>อาคารที่ทำการศาล</option>
                    <option value='อาคารชุดตุลาการฯ A'>
                      อาคารชุดตุลาการฯ A
                    </option>
                    <option value='อาคารชุดตุลาการฯ B'>
                      อาคารชุดตุลาการฯ B
                    </option>
                    <option value='อาคารชุดธุรการ'>อาคารชุดธุรการ</option>
                  </select>
                  <ErrorMessage
                    component='div'
                    name='building'
                    className='text-red-500 tex-sm pt-1'
                  />
                </div>
                <div className='lg:flex lg:justify-between gap-2'>
                  <div className='lg:w-96'>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      รายการที่ชำรุด
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                        touched.list && Boolean(errors.list)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='text'
                      name='list'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.list}
                      placeholder='วัสดุ-อุปกรณ์ที่ชำรุด'
                    />
                    <ErrorMessage
                      component='div'
                      name='list'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      จำนวน
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                        touched.quantity && Boolean(errors.quantity)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='number'
                      min='1'
                      name='quantity'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.quantity}
                      placeholder='จำนวนวัสดุ-อุปกรณ์'
                    />
                    <ErrorMessage
                      component='div'
                      name='quantity'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      หน่วย
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                        touched.unit && Boolean(errors.unit)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      type='text'
                      name='unit'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.unit}
                      placeholder='หน่วยของวัสดุ-อุปกรณ์'
                    />
                    <ErrorMessage
                      component='div'
                      name='unit'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
                </div>
                <div>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    อาการที่ชำรุด (ตามสภาพเบื้องต้น)
                  </label>
                  <textarea
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                      touched.malfunction && Boolean(errors.malfunction)
                        ? "border-2 border-rose-600"
                        : ""
                    }`}
                    name='malfunction'
                    rows='4'
                    cols='50'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.malfunction}
                    placeholder='อาการที่ชำรุดของวัสดุ-อุปกรณ์'
                  ></textarea>
                  <ErrorMessage
                    component='div'
                    name='malfunction'
                    className='text-red-500 tex-sm pt-1'
                  />
                </div>
                <div>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    ตำแหน่งที่ชำรุด / หมายเลขห้อง
                  </label>
                  <textarea
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                      touched.area && Boolean(errors.area)
                        ? "border-2 border-rose-600"
                        : ""
                    }`}
                    name='area'
                    rows='4'
                    cols='50'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.area}
                    placeholder='อาการที่ชำรุดของวัสดุ-อุปกรณ์'
                  ></textarea>
                  <ErrorMessage
                    component='div'
                    name='area'
                    className='text-red-500 tex-sm pt-1'
                  />
                </div>
                <div className='lg:flex lg:justify-center'>
                  <button
                    type='submit'
                    className='w-full lg:w-28 mr-5 mt-6  rounded-lg px-4 py-2  text-white tracking-wide font-semibold font-sans bg-green-500 hover:bg-green-300'
                  >
                    ยืนยัน
                  </button>
                  <button
                    type='button'
                    className='w-full lg:w-28 mt-6 rounded-lg px-4 py-2  text-white tracking-wide font-semibold font-sans bg-red-500 hover:bg-red-300'
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
  );
}

export default UpdateRepairNotice;
