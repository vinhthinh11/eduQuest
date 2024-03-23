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
import { SvgIcon } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/joy';
import LogoutIcon from '@mui/icons-material/Logout';

import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import { FileUpload } from '@mui/icons-material';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
function AdminsPanel() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="flex w-full min-h-full">
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
          <ListItemButton sx={{ borderBottom: '1px solid #c6c6c6  ' }}>
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
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Admin" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Trưởng bộ môn" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Giáo viên" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Lớp" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Học sinh" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Câu hỏi" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý Đề thi" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
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
      <div className="basis-3/4 w-full min-h-full flex flex-col">
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
            >
              Quản lý admin
            </Button>
          </div>
        </div>
        <div className="title-content">
        <span className="title">Quản Lý Thông Tin Admin</span>
        <div className="action hidden" id="select_action">
          <a className="waves-effect waves-light btn">Xóa
            <i className="material-icons right">delete</i>
          </a>
        </div>
      </div>
      
      <div className="block-content overflow scrollbar">
        <AdminTable />
        <AdminForm  />
        <FileUpload />
      </div>
      </div>
    </div>
  );
}


export default AdminsPanel;
