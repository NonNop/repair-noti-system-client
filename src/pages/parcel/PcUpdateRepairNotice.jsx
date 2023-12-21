import React from "react";
import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function PcUpdateRepairNotice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const date = dayjs().format("YYYY/MM/DD");
  const { user } = useSelector((user) => ({ ...user }));

  const [repairData, setRepairData] = useState({
    building: "",
    list: "",
    quantity: "",
    unit: "",
    malfunction: "",
    area: "",
    repair_status: "",
    mechanice_detail: "",
    parcel_status: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/repair-notice-parcel-get/${id}`, {
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
          repair_status: response.data.result[0].repair_status,
          mechanice_detail: response.data.result[0].mechanice_detail,
          parcel_status: response.data.result[0].parcel_status,
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
    repair_status: repairData.repair_status,
    mechanice_detail: repairData.mechanice_detail,
    parcel_date: date,
    parcel_id: user.user.id,
    parcel_status: repairData.parcel_status,
  };

  const repairNoticeSchema = yup.object().shape({
    parcel_status: yup.string().required("กรุณาเลือกสถานะการอนุมัติ"),
  });

  const handleFormSubmit = async (values) => {
    const { parcel_id, parcel_status, parcel_date } = values;
    await axios
      .put(
        `http://localhost:5000/api/parcel-status/${id}`,
        { parcel_id, parcel_status, parcel_date },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(() => {
        Swal.fire("รายงานผลการดำเนินการใบแจ้งซ่อมสำเร็จ", " ", "success");
        navigate("/view-repair-parcel");
      })
      .catch(() => {
        Swal.fire("รายงานผลการดำเนินการใบแจ้งซ่อมไม่สำเร็จ", "", "error");
      });
  };

  const comfirmCancle = () => {
    Swal.fire({
      title: "คุณต้องการยกเลิกการรายงานผลการดำเนินการหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      // กดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        navigate("/view-repair-parcel");
      }
    });
  };

  return (
    <div className='h-full py-5 flex justify-center items-center'>
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
                className='bg-white p-10 rounded-lg shadow-lg border-2 border-white min-w-full'
              >
                <h1 className='text-center text-2xl mb-6 text-gray-600 font-bold font-sans'>
                  รายงานผลการดำเนินการ
                </h1>
                <h4 className='text-sm mb-6 text-gray-500 font-bold font-sans'>
                  มีความประสงค์ขอให้งานพัสดุ ดำเนอนการซ่อมแซม ปรับปรุง
                  แก้ไขความชำรุดของวัสดุ อุปกรณ์ และครุภัณฑ์ประกอบอาคาร ดังนี้
                </h4>
                <div className='gap-5 items-center lg:w-full '>
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
                <div className='gap-5 items-center lg:w-full '>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    สถานะการซ่อม
                  </label>
                  <input
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg `}
                    name='repair_status'
                    value={values.repair_status}
                    disabled={true}
                  />
                </div>
                <div>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    สาเหตุ/ข้อสังเกตุจากการดำเนินการ/แก้ไขโดยวิธี
                  </label>
                  <textarea
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-non`}
                    name='mechanice_detail'
                    rows='4'
                    cols='50'
                    value={values.mechanice_detail}
                    disabled={true}
                  ></textarea>
                </div>
                <div className='gap-5 items-center lg:w-full '>
                  <label className='text-gray-800 font-semibold block my-3 text-md'>
                    สถานะผลการดำเนินการ
                  </label>
                  <select
                    className={`w-full bg-gray-200 px-4 py-2 rounded-lg   ${
                      touched.parcel_status && Boolean(errors.parcel_status)
                        ? "border-2 border-rose-600"
                        : ""
                    }`}
                    name='parcel_status'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.parcel_status}
                  >
                    <option>เลือกรายงานผลการดำเนินการ</option>
                    <option value='เพื่อโปรดทราบ'>เพื่อโปรดทราบ</option>
                    <option value='เห็นควรแจ้งผู้มีอาชีพฯ'>
                      เห็นควรแจ้งผู้มีอาชีพฯ
                    </option>
                    <option value='เห็นควรจัดหาอุปกรณ์เพิ่มเติม'>
                      เห็นควรจัดหาอุปกรณ์เพิ่มเติม
                    </option>
                    <option value='เห็นควรจัดหาทดแทน'>เห็นควรจัดหาทดแทน</option>
                  </select>
                  <ErrorMessage
                    component='div'
                    name='parcel_status'
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
export default PcUpdateRepairNotice;
