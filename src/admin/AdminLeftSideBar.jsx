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

const AdminLeftSideBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpen(!open);
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
          maxWidth: 360,
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
          sx={{ borderBottom: '1px solid #c6c6c6  ' }}
          onClick={() => {
            navigate('/');
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: '#6b6465' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          sx={{ borderBottom: '1px solid #c6c6c6  ' }}
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
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('admin');
              }}
            >
              <ListItemText primary="Quản lý Admin" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('head');
              }}
            >
              <ListItemText primary="Quản lý Trưởng bộ môn" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('teacher');
              }}
            >
              <ListItemText primary="Quản lý Giáo viên" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('class');
              }}
            >
              <ListItemText primary="Quản lý Lớp" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('student');
              }}
            >
              <ListItemText primary="Quản lý Học sinh" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('question');
              }}
            >
              <ListItemText primary="Quản lý Câu hỏi" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('exam');
              }}
            >
              <ListItemText primary="Quản lý Đề thi" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate('statitic');
              }}
            >
              <ListItemText primary="Thống kê" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton sx={{ borderBottom: '1px solid #c6c6c6  ' }}>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>

      <List>
        <ListItemButton sx={{ borderTop: '1px solid #c6c6c6  ' }}>
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
