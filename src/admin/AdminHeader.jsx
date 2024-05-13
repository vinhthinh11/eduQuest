import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/joy';
import { HomeIcon } from './AdminPage';

const AdminHeader = () => {
  return (
    <div className="w-full border-b-2 border-edu">
      <div className="w-full  h-14 flex justify-between items-center px-4">
        <HomeIcon fontSize="large" sx={{ color: '#836FFF' }} />
        <div className="flex gap-3 items-center bg-base rounded-lg px-3 py-1">
          <p className="text-white">Le Minh Quang</p>
          <Avatar alt="user image" src="/images/avatar/1.jpg" />
        </div>
      </div>
      <div className="w-full bg-slate-200 h-14">
        <Button
          sx={{
            backgroundColor: '#836FFF',
            marginBottom: '10px',
            marginTop: '10px',
            marginLeft: '40px',
          }}
          onClick={() => {
            window.location.href = '/admin';
          }}
        >
          Trang chủ
        </Button>
      </div>
    </div>
  );
};
export default AdminHeader;
