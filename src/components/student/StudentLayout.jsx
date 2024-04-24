import { Outlet } from 'react-router-dom';
import AdminHeader from '../../admin/AdminHeader.jsx';
import StudentLeftSideBar from './StudentLeftSideBar.jsx';

function TeacherLayout() {
  return (
    <div className="flex w-full min-h-full">
      <StudentLeftSideBar />
      <div className="basis-3/4 w-full min-h-full flex flex-col">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherLayout;
