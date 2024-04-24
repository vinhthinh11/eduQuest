import { Outlet } from 'react-router-dom';
import AdminHeader from '../../admin/AdminHeader.jsx';
import SubjectHeadLeftSideBar from './SubjectHeadLeftSideBar.jsx';

function SubjectHeadLayout() {
  return (
    <div className="flex w-full min-h-full">
      <SubjectHeadLeftSideBar />
      <div className="basis-3/4 w-full min-h-full flex flex-col">
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default SubjectHeadLayout;
