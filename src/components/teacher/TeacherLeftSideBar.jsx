import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HelpIcon from '@mui/icons-material/Help';
import ScoreIcon from '@mui/icons-material/Score';
import ClassIcon from '@mui/icons-material/Class';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
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

  const handleListItemClick = (index) => {
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
        <p className="font-semibold text-xl">Teacher page</p>
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
          <ListSubheader component="div" id="nested-list-subheader"></ListSubheader>
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
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Test" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 3}
          onClick={() => handleOnClick(3, 'question')}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Questions" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 4}
          onClick={() => handleOnClick(4, 'score')}
        >
          <ListItemIcon>
            <ScoreIcon />
          </ListItemIcon>
          <ListItemText primary="Score list" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 5}
          onClick={() => handleOnClick(5, 'class')}
        >
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Class" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 6}
          onClick={() => handleOnClick(6, 'sendNofitication')}
        >
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Send Notification" />
        </ListItemButton>
        <ListItemButton
          sx={style1}
          selected={selectedIndex === 7}
          onClick={() => handleOnClick(7, '/contact')}
        >
          <ListItemIcon>
            <ContactMailIcon />
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
