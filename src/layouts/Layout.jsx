import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {
  return (
    <>
      <div className='flex'>
        <div className=' hidden lg:block'>
          <Sidebar />
        </div>
        <div className='flex-1 bg-gray-200 h-wull'>
          <Navbar />
        </div>
      </div>
    </>
  );
}

export default Layout;
