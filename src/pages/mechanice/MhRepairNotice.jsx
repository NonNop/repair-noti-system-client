import React, { useState } from "react";
import TabMhList from "../../components/tab/mechanice/TabMhList";
import TabMhAdd from "../../components/tab/mechanice/TabMhAdd";
import TabMhPro from "../../components/tab/mechanice/TabMhPro";
import TabMhUnsucces from "../../components/tab/mechanice/TabMhUnsucces";
import TabMhSucces from "../../components/tab/mechanice/TabMhSucces";

function MhRepairNotice() {
  const [openTab, setOpenTab] = useState(1);

  return (
    <div className='m-5'>
      <div className='mt-5'>
        <h1 className='text-3xl font-bold'>การดำเนินการ</h1>
      </div>
      <div className='w-full'>
        <ul
          className='lg:flex w-full list-none pt-5 pb-4 flex-row'
          role='tablist'
        >
          <li className='mr-2 mb-3 lg:last:mr-0 lg:flex-auto text-center '>
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
              รายการแจ้งซ่อม
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
              ดำเนินการเรียบร้อย
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
              ต้องแจ้งผู้มีอาชีพเข้ามาดำเนินการ
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
              ซ่อมได้แต่ต้องจัดหาอุปกรณ์เพิ่ม
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
              ไม่สามารถซ่อมแซมได้
            </a>
          </li>
        </ul>
        <div className='relative flex flex-col bg-white mb-6 shadow-lg rounded border-2 border-gray-100'>
          <div className='px-4 py-5 flex-auto'>
            <div className={openTab === 1 ? "block" : "hidden"} id='link1'>
              <TabMhList />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"} id='link2'>
              <TabMhSucces />
            </div>
            <div className={openTab === 3 ? "block" : "hidden"} id='link3'>
              <TabMhPro />
            </div>
            <div className={openTab === 4 ? "block" : "hidden"} id='link4'>
              <TabMhAdd />
            </div>
            <div className={openTab === 5 ? "block" : "hidden"} id='link5'>
              <TabMhUnsucces />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MhRepairNotice;
