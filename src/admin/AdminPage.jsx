import * as React from "react";

import { SvgIcon } from "@mui/material";
import { Button } from "@mui/joy";
import PersonIcon from "@mui/icons-material/Person";
import LayersIcon from "@mui/icons-material/Layers";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { Link } from "react-router-dom";
export function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}
const Card = ({ icon = <PersonIcon />, quantity = 3, label = "Học sinh" }) => {
  return (
    <div className="flex gap-4 border-2 rounded-lg border-base justify-between">
      <Button sx={{ backgroundColor: "#836FFF" }}>{icon}</Button>
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
      <Link to="/admin/admin">
        <Card
          icon={<PersonIcon fontSize="large" />}
          quantity={3}
          label="Quản trị viên"
        />
      </Link>
      <Link to="/admin/subject-head">
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={12}
        label="Trưởng bộ môn"
      />
       </Link>
       <Link to="/admin/teacher">
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={11}
        label="Giáo viên"
      />
      </Link>
      <Link to="/admin/class">
      <Card
        icon={<PersonIcon fontSize="large" />}
        quantity={66}
        label="Học sinh"
      />
      </Link>
      
      <Card icon={<LayersIcon fontSize="large" />} quantity={3} label="Khối" />
      <Link to="/admin/class"><Card icon={<LayersIcon fontSize="large" />} quantity={7} label="Lớp" />  </Link>
      <Link to="/admin/subject">
      <Card
        icon={<MenuBookOutlinedIcon fontSize="large" />}
        quantity={10}
        label="Môn học"
      />
      </Link>
      <Link to="/admin/question">
      <Card
        icon={<HelpOutlineOutlinedIcon fontSize="large" />}
        quantity={659}
        label="Câu hỏi"
      />
      </Link>
      <Link to="/admin/question">
        <Card
          icon={<TrendingUpOutlinedIcon fontSize="large" />}
          quantity={1}
          label="Thống kê"
        />
      </Link>
     
    </div>
  );
}

export default AdminPage;
