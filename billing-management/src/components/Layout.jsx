import { Outlet } from "react-router-dom";
import { observer } from "mobx-react";

import Sidebar from "./Sidebar";

const Layout = observer(() => {
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
});

export default Layout;
