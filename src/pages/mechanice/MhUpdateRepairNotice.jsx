import React from "react";
import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function MhUpdateRepairNotice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const date = dayjs().format("YYYY/MM/DD");
  const { user } = useSelector((state) => ({ ...state }));
  const [repairData, setRepairData] = useState({
    building: "",
    list: "",
    quantity: "",
    unit: "",
    malfunction: "",
    area: "",
    repair_status: "",
    mechanice_detail: "",
  });

  console.log("Repairdata =======================> ", repairData);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/repair-notice-mechanice/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Response =======================> ", response.data);
        setRepairData({
          building: response.data.result[0].building,
          list: response.data.result[0].repair_list,
          quantity: response.data.result[0].quantity,
          unit: response.data.result[0].unit,
          malfunction: response.data.result[0].malfunction,
          area: response.data.result[0].area,
          repair_status: response.data.result[0].repair_status,
          mechanice_detail: response.data.result[0].mechanice_detail,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const initialValueRepairNotice = {
    building: repairData.building,
    list: repairData.list,
    quantity: repairData.quantity,
    unit: repairData.unit,
    malfunction: repairData.malfunction,
    area: repairData.area,
    mechanice_date: date,
    mechanic_id: user.user.id,
    repair_status: repairData.repair_status,
    mechanice_detail: repairData.mechanice_detail,
  };

  const repairNoticeSchema = yup.object().shape({
    repair_status: yup.string().required("กรุณาเลือกอาคาร"),
    mechanice_detail: yup.string().required("กรุณากรอกข้อมูล"),
  });

  const handleFormSubmit = async (values) => {
    const { mechanice_date, mechanic_id, mechanice_detail, repair_status } =
      values;
    await axios
      .put(
        `http://localhost:5000/api/repair-mechanice-update/${id}`,
        { mechanice_date, mechanic_id, mechanice_detail, repair_status },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        Swal.fire("อัพเดตการดำเนินงานสำเร็จ", " ", "success");
        navigate("/view-repair-mechanice");
      })
      .catch(() => {
        Swal.fire("อัพเดตการดำเนินงานไม่สำเร็จ", "", "error");
      });
  };

  const comfirmCancle = () => {
    Swal.fire({
      title: "คุณต้องการยกเลิกอัพเดตการดำเนินการหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // กดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        navigate("/view-repair-mechanice");
      }
    });
  };

  return (
    <div className='h-full py-5 border-2 border-gray-50 flex justify-center items-center'>
      <div className='m-10'>
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
                className='bg-white p-10 rounded-lg shadow-lg border-2 border-gray-50 min-w-full'
              >
                <h1 className='text-center text-2xl mb-6 text-gray-600 font-bold font-sans'>
                  การดำเนินการ
                </h1>
                <h4 className='text-sm mb-6 text-gray-500 font-bold font-sans'>
                  มีความประสงค์ขอให้งานพัสดุ ดำเนอนการซ่อมแซม ปรับปรุง
                  แก้ไขความชำรุดของวัสดุ อุปกรณ์ และครุภัณฑ์ประกอบอาคาร ดังนี้
                </h4>
                <div className=' gap-5 items-center lg:w-full '>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    อาคาร
                  </label>
                  <input
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg `}
                    name='building'
                    value={values.building}
                    disabled={true}
                  />
                </div>
                <div className='lg:flex lg:justify-between gap-2'>
                  <div className='lg:w-96'>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      รายการที่ชำรุด
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  `}
                      type='text'
                      name='list'
                      value={values.list}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      จำนวน
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  `}
                      type='number'
                      name='quantity'
                      value={values.quantity}
                      disabled={true}
                    />
                  </div>
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      หน่วย
                    </label>
                    <input
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  `}
                      type='text'
                      name='unit'
                      value={values.unit}
                      disabled={true}
                    />
                  </div>
                </div>

                <div>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    อาการที่ชำรุด (ตามสภาพเบื้องต้น)
                  </label>
                  <textarea
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg  `}
                    name='malfunction'
                    rows='4'
                    cols='50'
                    value={values.malfunction}
                    disabled={true}
                  ></textarea>
                </div>
                <div>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    ตำแหน่งที่ชำรุด / หมายเลขห้อง
                  </label>
                  <textarea
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg  `}
                    name='area'
                    rows='4'
                    cols='50'
                    value={values.area}
                    disabled={true}
                  ></textarea>
                </div>
                <div className=' gap-5 items-center lg:w-full '>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    สถานะการซ่อม
                  </label>
                  <select
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg   ${
                      touched.repair_status && Boolean(errors.repair_status)
                        ? "border-2 border-rose-600"
                        : ""
                    }`}
                    name='repair_status'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.repair_status}
                  >
                    <option>สถานะการดำเนินการ</option>
                    <option value='ดำเนินการเรียบร้อย'>
                      ดำเนินการเรียบร้อย
                    </option>
                    <option value='ต้องแจ้งผู้มีอาชีพเข้ามาดำเนินการ'>
                      ต้องแจ้งผู้มีอาชีพเข้ามาดำเนินการ
                    </option>
                    <option value='ซ่อมได้แต่ต้องจัดหาอุปกรณ์เพิ่ม'>
                      ซ่อมได้แต่ต้องจัดหาอุปกรณ์เพิ่ม
                    </option>
                    <option value='ไม่สามารถซ่อมแซมได้'>
                      ไม่สามารถซ่อมแซมได้
                    </option>
                  </select>
                  <ErrorMessage
                    component='div'
                    name='repair_status'
                    className='text-red-500 tex-sm pt-1'
                  />
                  <div>
                    <label className='text-gray-800 font-semibold block my-3 text-md'>
                      สาเหตุ/ข้อสังเกตุจากการดำเนินการ/แก้ไขโดยวิธี
                    </label>
                    <textarea
                      className={`w-full bg-gray-200 px-4 py-2 rounded-lg  ${
                        touched.mechanice_detail &&
                        Boolean(errors.mechanice_detail)
                          ? "border-2 border-rose-600"
                          : ""
                      }`}
                      name='mechanice_detail'
                      rows='4'
                      cols='50'
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mechanice_detail}
                      placeholder='สาเหตุ/ข้อสังเกตุจากการดำเนินการ/แก้ไขโดยวิธี'
                    ></textarea>
                    <ErrorMessage
                      component='div'
                      name='mechanice_detail'
                      className='text-red-500 tex-sm pt-1'
                    />
                  </div>
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
export default MhUpdateRepairNotice;
