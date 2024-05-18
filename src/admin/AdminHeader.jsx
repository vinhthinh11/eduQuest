import * as React from 'react';
import { Avatar, Button, Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy';
import { HomeIcon } from './AdminPage';
import { useEffect } from 'react';
import { getMe } from '../services/apiUser.js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const AdminHeader = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const home = location.pathname.split('/')[1];
  function handleClick() {
    navigate('/profile');
  }
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getMe();
      setUser(data);
      console.log(data);
    };
    fetchUser();
  }, []);

  return (
    <div className="w-full border-b-2 border-edu">
      <div className="w-full h-14 flex justify-between items-center px-4 my-3">
        <HomeIcon fontSize="large" sx={{ color: '#836FFF' }} />
        <Dropdown>
          <MenuButton
            sx={{ bgcolor: '#836FFF', display: 'flex', gap: '10px' }}
            variant="solid"
          >
            <Avatar
              alt="user image"
              src={`http://127.0.0.1:8000${user?.avatar}`}
            />
            <p className="text-white">{user?.name}</p>
          </MenuButton>
          <Menu sx={{ width: '180px' }}>
            <MenuItem onClick={handleClick}>
              <AccountCircleIcon />
              Profile
            </MenuItem>
            <MenuItem>
              <LogoutIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
      <div className="w-full bg-slate-200 h-14">
        <Button
          sx={{
            backgroundColor: '#836FFF',
            marginBottom: '10px',
            marginTop: '10px',
            marginLeft: '40px',
          }}
          onClick={() => navigate(`/${home}`)}
        >
          Trang chủ
        </Button>
      </div>
    </div>
  );
};
export default AdminHeader;
