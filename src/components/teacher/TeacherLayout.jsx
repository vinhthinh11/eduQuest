import { Outlet } from 'react-router-dom';
import AdminHeader from '../../admin/AdminHeader.jsx';
import TeacherLeftSideBar from './TeacherLeftSideBar.jsx';

function TeacherLayout() {
  return (
    <div className="flex w-full min-h-full">
      <TeacherLeftSideBar />
      <div className="basis-3/4 w-full min-h-full flex flex-col">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default TeacherLayout;
