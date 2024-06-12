import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className='page-wrapper'>
        <main className='page-content'>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
