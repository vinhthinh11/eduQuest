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
function HeadPage() {
  return (
    <div className="grid grid-cols-3 px-4 gap-4 pt-4">
      <Link to="/subject-head/test">
      <Card
        icon={<HelpOutlineOutlinedIcon fontSize="large" />}
        quantity={659}
        label="Câu hỏi"
      />
      </Link>
     
    </div>
  );
}

export default HeadPage;
