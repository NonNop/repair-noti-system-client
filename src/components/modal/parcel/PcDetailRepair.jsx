import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function PcDetailRepair({ repairId }) {
  const [repairData, setRepairData] = useState({
    repair_date: "",
    user_name: "",
    user_position: "",
    building: "",
    list: "",
    quantity: "",
    unit: "",
    malfunction: "",
    area: "",
    mechanice_date: "",
    mechanice_name: "",
    mechanice_posion: "",
    repair_status: "",
    mechanice_detail: "",
    parcel_date: "",
    parcel_name: "",
    parcel_status: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/repair-notice-parcel/${repairId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("ใบแจ้งซ่อม =============> ", response.data.result[0]);
        setRepairData({
          repair_date: response.data.result[0].repair_order_date,
          user_name: response.data.result[0].normalUser_name,
          user_position: response.data.result[0].user_position,
          building: response.data.result[0].building,
          list: response.data.result[0].repair_list,
          quantity: response.data.result[0].quantity,
          unit: response.data.result[0].unit,
          malfunction: response.data.result[0].malfunction,
          area: response.data.result[0].area,
          mechanice_date: response.data.result[0].mechanic_date,
          mechanice_name: response.data.result[0].mechanicUser_name,
          mechanice_position: response.data.result[0].mechanicUser_position,
          repair_status: response.data.result[0].repair_status,
          mechanice_detail: response.data.result[0].mechanice_detail,
          parcel_date: response.data.result[0].parcel_date,
          parcel_name: response.data.result[0].parcelUser_name,
          parcel_status: response.data.result[0].parcel_status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [repairId]);

  return (
    <div className='modal-box max-w-2xl'>
      <h3 className='font-bold text-lg text-center'>รายละเอียดการแจ้งซ่อม</h3>
      <div className='modal-action w-full'>
        <form method='dialog' className='w-full'>
          <div className='overflow-x-auto'>
            <table className='table'>
              <tr className='bg-blue-500 text-white'>
                <th className='py-2 px-4 text-center' colSpan='2'>
                  ข้อมูลผู้แจ้งซ่อม
                </th>
              </tr>
              <tbody>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200 w-4/12'>วันที่แจ้งซ่อม</th>
                  <td className='w-4/5'>
                    {dayjs(repairData.repair_date).format(
                      "DD/MM/YYYY เวลา HH:mm "
                    )}
                  </td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>ผู้แจ้งซ่อม</th>
                  <td>{repairData.user_name}</td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>ตำแหน่ง</th>
                  <td>{repairData.user_position}</td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>อาคาร</th>
                  <td>{repairData.building}</td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>รายการที่ชำรุด</th>
                  <td>{repairData.list}</td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>จำนวน</th>
                  <td>{repairData.quantity}</td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>หน่วย</th>
                  <td>{repairData.unit}</td>
                </tr>
                <tr className='border-b-2 border-gray-200 '>
                  <th className='bg-base-200'>อาการที่ชำรุด</th>
                  <td>{repairData.malfunction}</td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>ตำแหน่งที่ชำรุด</th>
                  <td>{repairData.area}</td>
                </tr>
                <tr className='bg-yellow-500 text-white '>
                  <th
                    className='py-2 px-4 text-center border-b-2 border-gray-200'
                    colSpan='2'
                  >
                    ข้อมูลผู้ดำเนินการ
                  </th>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>วันที่ทำการซ่อม</th>
                  <td>
                    {dayjs(repairData.mechanice_date).format("DD/MM/YYYY")}
                  </td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>ช่างที่ตรวจสอบ</th>
                  <td>{repairData.mechanice_name}</td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>ตำแหน่ง</th>
                  <td>{repairData.mechanice_position}</td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>สถานะ</th>
                  <td>{repairData.repair_status}</td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>แก้ไขโดยวิธี</th>
                  <td>{repairData.mechanice_detail}</td>
                </tr>
                <tr className='bg-green-500 text-white '>
                  <th
                    className='py-2 px-4 text-center border-b-2 border-gray-200'
                    colSpan='2'
                  >
                    รายงานผลการดำเนินการ
                  </th>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>วันที่</th>
                  <td>{dayjs(repairData.parcel_date).format("DD/MM/YYYY")}</td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>หัวหน้าพัสดุที่รายงานผล</th>
                  <td>{repairData.parcel_name}</td>
                </tr>
                <tr className='border-b-2 border-gray-200'>
                  <th className='bg-base-200'>สถานะ</th>
                  <td>{repairData.parcel_status}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button className='btn btn-error w-full mt-5 text-white hover:bg-red-300'>
            <AiOutlineCloseCircle className='text-xl' />
            ปิด
          </button>
        </form>
      </div>
    </div>
  );
}

export default PcDetailRepair;
