import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import ScoreIcon from '@mui/icons-material/Score';
import ChatIcon from '@mui/icons-material/Chat';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

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

const StudentLeftSideBar = () => {
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
          className="w-40 h-40 rounded-full shadow-xl"
          src="/images/eduLogo.jpg"
          alt="logo"
        />
        <p className="capitalize text-[#5945d7]">Edu Quest</p>
        <p className="font-semibold text-xl text-[#7561f7]">Student page</p>
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
          onClick={() => handleOnClick(1, '/student')}
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
          <ListItemText primary="Tests" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 3}
          onClick={() => handleOnClick(3, 'practice')}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Practices" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 4}
          onClick={() => handleOnClick(4, 'score')}
        >
          <ListItemIcon>
            <ScoreIcon />
          </ListItemIcon>
          <ListItemText primary="Scores" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 5}
          onClick={() => handleOnClick(5, 'chat')}
        >
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Chat" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 6}
          onClick={() => handleOnClick(6, 'practice/result')}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Practice Result" />
        </ListItemButton>

        <ListItemButton
          sx={style1}
          selected={selectedIndex === 7}
          onClick={() => handleOnClick(7, 'notification')}
        >
          <ListItemIcon>
            <FontAwesomeIcon icon={faBell} />
          </ListItemIcon>
          <ListItemText primary="Notification" />
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
export default StudentLeftSideBar;
