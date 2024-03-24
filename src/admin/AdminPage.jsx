import * as React from 'react';

import { SvgIcon } from '@mui/material';
import { Button } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import LayersIcon from '@mui/icons-material/Layers';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

export function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const Card = ({ icon = <PersonIcon />, quantity = 3, label = 'Học sinh' }) => {
  return (
    <div className="flex gap-4 border-2 rounded-lg border-base justify-between">
      <Button sx={{ backgroundColor: '#836FFF' }}>{icon}</Button>
      <div className="flex flex-col justify-center items-center mx-auto">
        <p className="text-xl font-semibold text-base">{quantity}</p>
        <p className="text-base">{label}</p>
      </div>
    </div>
  );
};
function AdminPage() {
  return (
    <div className="grid grid-cols-3 px-4 gap-4 pt-4">
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={3}
        label="Quản trị viên"
      />
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={12}
        label="Trưởng bộ môn"
      />
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={11}
        label="Giáo viên"
      />
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={66}
        label="Học sinh"
      />
      <Card icon={<LayersIcon fontSize="large" />} quantity={3} label="Khối" />
      <Card icon={<LayersIcon fontSize="large" />} quantity={7} label="Lớp" />
      <Card icon={<LayersIcon fontSize="large" />} quantity={7} label="Lớp" />
      <Card
        icon={<MenuBookOutlinedIcon fontSize="large" />}
        quantity={10}
        label="Môn học"
      />
      <Card
        icon={<HelpOutlineOutlinedIcon fontSize="large" />}
        quantity={659}
        label="Câu hỏi"
      />
      <Card
        icon={<TrendingUpOutlinedIcon fontSize="large" />}
        quantity={1}
        label="Thống kê"
      />
    </div>
  );
}

export default AdminPage;
