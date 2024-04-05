import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DehazeIcon from '@mui/icons-material/Dehaze';
import MessageIcon from '@mui/icons-material/Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { HomeIcon } from './AdminPage';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
const style = {
  pl: 4,
  '&.Mui-selected': {
    backgroundColor: grey[400],
  },
  '&.Mui-focusVisible': {
    backgroundColor: grey[300],
  },

  ':hover': {
    backgroundColor: grey[300],
  },
};
const style1 = {
  '&.Mui-selected': {
    backgroundColor: grey[400],
  },
  '&.Mui-focusVisible': {
    backgroundColor: grey[300],
  },

  ':hover': {
    backgroundColor: grey[300],
  },
};

const AdminLeftSideBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = index => {
    setSelectedIndex(index);
  };
  const handleOnClick = (i, to) => {
    handleListItemClick(i);
    navigate(to);
  };

  const handleClick = () => {
    setOpen(!open);
    setSelectedIndex(12);
  };
  return (
    <div className="basis-1/4 w-full flex flex-col min-h-full border-r-2 border-edu">
      <div className="flex flex-col justify-center items-center py-4">
        <img
          className="w-20 h-20 rounded-full"
          src="/images/logo_eduquest.jpg"
          alt="logo"
        />
        <p className="capitalize">Edu Quest</p>
        <p className="font-semibold text-xl">Admin page</p>
      </div>
      <List
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: 'background.paper',
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 1}
          onClick={() => handleOnClick(1, '/')}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: '#6b6465' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 12}
          onClick={handleClick}
        >
          <ListItemIcon>
            <DehazeIcon />
          </ListItemIcon>
          <ListItemText primary="Menu" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 2}
              onClick={() => handleOnClick(2, 'admin')}
            >
              <ListItemText primary="Quản lý Admin" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 3}
              onClick={() => handleOnClick(3, 'head')}
            >
              <ListItemText primary="Quản lý Trưởng bộ môn" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 4}
              onClick={() => handleOnClick(4, 'teacher')}
            >
              <ListItemText primary="Quản lý Giáo viên" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 5}
              onClick={() => handleOnClick(5, 'class')}
            >
              <ListItemText primary="Quản lý Lớp" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 6}
              onClick={() => handleOnClick(6, 'student')}
            >
              <ListItemText primary="Quản lý Học sinh" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 7}
              onClick={() => handleOnClick(7, 'question')}
            >
              <ListItemText primary="Quản lý Câu hỏi" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 8}
              onClick={() => handleOnClick(8, 'exam')}
            >
              <ListItemText primary="Quản lý Đề thi" />
            </ListItemButton>
            <ListItemButton
              sx={style}
              selected={selectedIndex === 9}
              onClick={() => handleOnClick(9, 'statistic')}
            >
              <ListItemText primary="Thống kê" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 10}
          onClick={() => handleOnClick(10, '/chat')}
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 11}
          onClick={() => handleOnClick(11, '/contact')}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>

      <List>
        <ListItemButton
          sx={{
            borderTop: '1px solid #c6c6c6',
            width: '100%',
          }}
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );
};
export default AdminLeftSideBar;
