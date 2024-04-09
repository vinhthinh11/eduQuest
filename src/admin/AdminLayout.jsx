import { Outlet } from 'react-router-dom';
import AdminLeftSideBar from './AdminLeftSideBar.jsx';
import AdminHeader from './AdminHeader.jsx';
import { useParams } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex w-full min-h-full">
      <AdminLeftSideBar />
      <div className="basis-3/4 w-full min-h-full flex flex-col">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
