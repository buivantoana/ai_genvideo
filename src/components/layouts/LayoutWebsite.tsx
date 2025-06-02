import { ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

import { Box, Hidden } from "@mui/material";
import Footer from "../Footer";
import Sidebar from "../Header";
import icon1 from "../../images/Frame 25.png";
const LayoutWebsite = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box
     
      sx={{
        display: "flex",
        // height: "100vh",
        bgcolor: "#0f0e26",
        flexDirection:{xs:"column",md:"row"},
       
      }}>
       
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />
      <Box width={"100%"} className='hidden-add-voice'  sx={{ overflowY: "scroll",
        height: {xs:"90vh", md:"100vh"}}}>
           <Hidden smUp>
          <Box py={1} display={"flex"} justifyContent={"center"}>
            <img width={129} height={36} src={icon1} alt='logo' />
          </Box>
        </Hidden>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutWebsite;
