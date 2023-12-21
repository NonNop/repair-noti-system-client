import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import DataTable from "react-data-table-component";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsClipboardData } from "react-icons/bs";
import PcDetailRepair from "../../components/modal/parcel/PcDetailRepair";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RepairNotification from "../../components/pdf/RepairNotification";

function PcRepairApprove() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs().tz("Asia/Bangkok");
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);
  const [repairId, setRepairId] = useState("");

  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    axios
      .post(
        `http://localhost:5000/api/repair-list-approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === "สามารถดูข้อมูลใบแจ้งซ่อมได้") {
          setInitialData(res.data.result);
          setData(res.data.result);
        } else {
          alert("ไม่สามารถยืนยันตัวตนได้");
          localStorage.removeItem("token");
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
    // eslint-di  sable-next-line
  }, []);

  function handleFilter(e) {
    const filterValue = e.target.value.toLowerCase();
    const newData = initialData.filter(
      (row) =>
        row.repair_list.toLowerCase().includes(filterValue) ||
        row.area.toLowerCase().includes(filterValue) ||
        row.building.toLowerCase().includes(filterValue) ||
        dayjs(row.repair_order_date)
          .format("DD/MM/YYYY HH:mm ")
          .includes(filterValue)
    );
    setData(newData);
  }

  const columns = [
    {
      name: <div className='font-bold'>ลำดับ</div>,
      selector: (row, index) => index + 1,
    },
    {
      name: <div className='font-bold'>วันที่แจ้งซ่อม</div>,
      selector: (row) =>
        dayjs(row.repair_order_date).format("DD/MM/YYYY HH:mm "),
      sortable: true,
    },
    {
      name: <div className='font-bold'>อาคาร</div>,
      selector: (row) => row.building,
    },
    {
      name: <div className='font-bold'>รายการที่ชำรุด</div>,
      selector: (row) => row.repair_list,
    },
    {
      name: <div className='font-bold'>ตำแหน่งที่ชำรุด</div>,
      selector: (row) => row.area,
    },
    {
      button: true,
      ignoreRowClick: true,
      allowOverflow: true,
      cell: (row) => (
        <div className='inline-flex gap-1'>
          <button
            className='bg-green-400 hover:bg-green-200 text-gray-800 font-bold py-2 px-4 rounded'
            onClick={() => {
              document.getElementById("my_modal_1").showModal();
              setRepairId(row.id); // อัปเดตค่า repairId ด้วย row.id
            }}
          >
            <BsClipboardData />
          </button>
          <PDFDownloadLink
            className='bg-orange-500 hover:bg-yellow-200 text-gray-800 font-bold py-2 px-4 rounded'
            fileName='ใบแจ้งซ่อม'
            document={<RepairNotification data={row} />}
          >
            <HiOutlineDocumentReport />
          </PDFDownloadLink>
        </div>
      ),
    },
  ];

  return (
    <main>
      <div className='mx-5 mt-10'>
        <h1 className='text-3xl font-bold'>ออกรายงานผลการดำเนินการ</h1>
      </div>
      <div className='bg-white rounded-sm lg:border-2 lg:border-gray-100 shadow-xl lg:p-5 mt-5 mx-4'>
        <div className='my-5'>
          <input
            type='text'
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight bg-white lg:bg-gray-200'
            onChange={handleFilter}
            placeholder='ค้นหาวันที่ อุปกรณ์ อาคาร หรือตำแหน่งที่แจ้งซ่อม'
          />
        </div>
        <div className='hidden lg:block'>
          <DataTable columns={columns} data={data} pagination />
        </div>
        <dialog id='my_modal_1' className='modal'>
          <PcDetailRepair repairId={repairId} />
        </dialog>
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
                      วันที่แจ้งซ่อม
                    </th>
                    <td className='w-4/5'>
                      {dayjs(repairData.repair_date).format(
                        "DD/MM/YYYY เวลา HH:mm "
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>อาคาร</th>
                    <td>{repairData.building}</td>
                  </tr>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>
                      รายการที่ชำรุด
                    </th>
                    <td>{repairData.repair_list}</td>
                  </tr>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>
                      อาการที่ชำรุด
                    </th>
                    <td>{repairData.malfunction}</td>
                  </tr>
                  <tr>
                    <th className='w-1/4 border-r-2 border-gray-600'>
                      ตำแหน่งที่ชำรุด
                    </th>
                    <td>{repairData.area}</td>
                  </tr>
                </tbody>
              </table>
              <div className='card-actions justify-end mr-4 mb-4'>
                <button
                  className='bg-green-400 hover:bg-green-200 text-gray-800 font-bold py-2 px-4 rounded'
                  onClick={() => {
                    document.getElementById("my_modal_1").showModal();
                    setRepairId(repairData.id); // อัปเดตค่า repairId ด้วย row.id
                  }}
                >
                  <BsClipboardData />
                </button>
                <PDFDownloadLink
                  className='bg-orange-500 hover:bg-yellow-200 text-gray-800 font-bold py-2 px-4 rounded'
                  fileName='ใบแจ้งซ่อม'
                  document={<RepairNotification data={data} />}
                >
                  <HiOutlineDocumentReport />
                </PDFDownloadLink>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default PcRepairApprove;
