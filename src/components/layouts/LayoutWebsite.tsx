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
      pb={{ xs: "150px", md: 0 }}
      sx={{
        display: "flex",
        height: "100vh",
        bgcolor: "#0f0e26",
      }}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />
      <Box width={"100%"}>
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
