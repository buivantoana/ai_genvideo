import { ReactNode, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";

import { Box } from "@mui/material";
import Footer from "../Footer";
import Sidebar from "../Header";

const LayoutWebsite = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f0e26" }}>
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setSidebarOpen(!isSidebarOpen)}
      />
      <Box component='main' sx={{ flexGrow: 2, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutWebsite;
