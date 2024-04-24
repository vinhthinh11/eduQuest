import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageIcon from '@mui/icons-material/Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { HomeIcon } from '../../admin/AdminPage';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';

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

const TeacherLeftSideBar = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = index => {
    setSelectedIndex(index);
  };
  const handleOnClick = (i, to) => {
    handleListItemClick(i);
    navigate(to);
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
          onClick={() => handleOnClick(1, '/teacher')}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: '#6b6465' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 2}
          onClick={() => handleOnClick(2, 'test')}
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Test" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 3}
          onClick={() => handleOnClick(3, 'question')}
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 4}
          onClick={() => handleOnClick(4, 'student')}
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 5}
          onClick={() => handleOnClick(5, 'class')}
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Class" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 6}
          onClick={() => handleOnClick(6, '/chat')}
        >
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 7}
          onClick={() => handleOnClick(7, '/contact')}
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
export default TeacherLeftSideBar;
