import React, { useState } from "react";
import TabPcList from "../../components/tab/parcel/TabPcList";
import TabPcSucces from "../../components/tab/parcel/TabPcSucces";
import TabPcPro from "../../components/tab/parcel/TabPcPro";
import TabPcAdd from "../../components/tab/parcel/TabPcAdd";
import TabPcUnsucces from "../../components/tab/parcel/TabPcUnsucces";

function PcRepairNotice() {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className='m-5'>
      <div className='mt-5'>
        <h1 className='text-3xl font-bold'>รายงานผลการดำเนินการ</h1>
      </div>
      <div className='w-full'>
        <ul
          className='lg:flex w-full list-none pt-5 pb-4 flex-row'
          role='tablist'
        >
          <li className='mr-2 mb-3 lg:last:mr-0 lg:flex-auto text-center'>
            <a
              className={
                "font-bold px-5 py-3 shadow-lg border-2 border-gray-100 rounded block leading-normal " +
                (openTab === 1
                  ? "text-white bg-gray-600"
                  : "text-gray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle='tab'
              href='#link1'
              role='tablist'
            >
              ผลการดำเนินการ
            </a>
          </li>
          <li className='mr-2 mb-3 lg:last:mr-0 lg:flex-auto text-center'>
            <a
              className={
                "font-bold px-5 py-3 shadow-lg border-2 border-gray-100 rounded block leading-normal " +
                (openTab === 2
                  ? "text-white bg-gray-600"
                  : "text-gray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle='tab'
              href='#link2'
              role='tablist'
            >
              เพื่อโปรดทราบ
            </a>
          </li>
          <li className='mr-2 mb-3 lg:last:mr-0 lg:flex-auto text-center'>
            <a
              className={
                "font-bold px-5 py-3 shadow-lg rounded border-2 border-gray-100 block leading-normal " +
                (openTab === 3
                  ? "text-white bg-gray-600"
                  : "text-gray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle='tab'
              href='#link3'
              role='tablist'
            >
              เห็นควรแจ้งผู้มีอาชีพฯ
            </a>
          </li>
          <li className='mr-2 mb-3 lg:last:mr-0 lg:flex-auto text-center'>
            <a
              className={
                "font-bold px-5 py-3 shadow-lg rounded border-2 border-gray-100 block leading-normal " +
                (openTab === 4
                  ? "text-white bg-gray-600"
                  : "text-gray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(4);
              }}
              data-toggle='tab'
              href='#link4'
              role='tablist'
            >
              เห็นควรจัดหาอุปกรณ์เพิ่มเติม
            </a>
          </li>
          <li className='mr-2 lg:last:mr-0 lg:flex-auto text-center'>
            <a
              className={
                "font-bold px-5 py-3 shadow-lg rounded border-2 border-gray-100 block leading-normal " +
                (openTab === 5
                  ? "text-white bg-gray-600"
                  : "text-gray-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(5);
              }}
              data-toggle='tab'
              href='#link5'
              role='tablist'
            >
              เห็นควรจัดหาทดแทน
            </a>
          </li>
        </ul>
        <div className='relative flex flex-col bg-white mb-6 shadow-lg rounded border-2 border-gray-100'>
          <div className='px-4 py-5 flex-auto'>
            <div className={openTab === 1 ? "block" : "hidden"} id='link1'>
              <TabPcList />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id='link2'>
              <TabPcSucces />
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id='link3'>
              <TabPcPro />
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id='link4'>
              <TabPcAdd />
            </div>
            <div className={openTab === 5 ? "block" : "hidden"} id='link5'>
              <TabPcUnsucces />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PcRepairNotice;
