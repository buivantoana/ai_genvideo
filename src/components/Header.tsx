import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AddBox,
  ListAlt,
  RecordVoiceOver,
  Settings,
} from "@mui/icons-material";
import icon1 from "../images/Frame 25.png";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { icon: <AddBox />, label: "Tạo dự án", path: "/" },
  { icon: <ListAlt />, label: "Danh sách dự án", path: "/project-manager" },
  // { icon: <RecordVoiceOver />, label: "Cấu hình giọng nói" },
  { icon: <Settings />, label: "Cài đặt tài khoản", path: "/account" },
];
const menuItemsMobile = [
  { icon: <AddBox />, label: "Tạo dự án", path: "/" },
  { icon: <ListAlt />, label: "Dự án", path: "/project-manager" },
  { icon: <RecordVoiceOver />, label: " Giọng nói" },
  { icon: <Settings />, label: "Tài khoản", path: "/account" },
];
const Sidebar = ({ isOpen, onToggle }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location && location.pathname) {
      switch (location.pathname) {
        case "/account":
          setSelectedIndex(3);
          break;
        case "/project-manager":
          setSelectedIndex(1);
          break;

        default:
          setSelectedIndex(0);
          break;
      }
    }
  }, [location.pathname]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // dưới 600px
  const navigate = useNavigate();
  const handleListItemClick = (item) => {
    navigate(item.path);
    // setSelectedIndex(index);
    if (isMobile) setMobileOpen(false); // auto đóng drawer trên mobile
  };
  const handleMenuChange = (item) => {
    let path: any = menuItemsMobile.find((ix, index) => index == item)?.path;
    navigate(path);
    // TODO: Điều hướng hoặc xử lý action tại đây
  };
  const drawerContent = (
    <Box sx={{ padding: "16px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          mb: "45px",
        }}>
        {isOpen && (
          <Box sx={{ fontWeight: "bold", ml: 1 }}>
            <img width={129} height={36} src={icon1} alt='logo' />
          </Box>
        )}
        <IconButton
          onClick={isMobile ? () => setMobileOpen(true) : onToggle}
          sx={{ color: "white" }}>
          <MenuIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <Tooltip
            key={index}
            title={isOpen || isMobile ? "" : item.label}
            placement='right'>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(item)}
              sx={{
                px: 2,
                height: 56,
                width: isOpen ? 262 : 60,
                mb: "10px",
                borderRadius: "16px",
                bgcolor:
                  selectedIndex === index
                    ? "#5932EA !important"
                    : "transparent",
                "&:hover": {
                  bgcolor: selectedIndex === index ? "#5b3dfc" : "#2a2550",
                },
              }}>
              <ListItemIcon
                sx={{
                  color: selectedIndex === index ? "white" : "#bfbbbb",
                  minWidth: "40px",
                }}>
                {item.icon}
              </ListItemIcon>
              {(isOpen || isMobile) && (
                <ListItemText
                  sx={{
                    span: {
                      fontWeight:
                        selectedIndex === index ? "600 !important" : "300",
                      color: selectedIndex === index ? "white" : "#F8F8F8",
                    },
                  }}
                  primary={item.label}
                />
              )}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <MobileSidebar
          selectedIndex={selectedIndex}
          onChange={handleMenuChange}
        />
      ) : (
        <Drawer
          variant='permanent'
          className='hidden-add-voice'
          sx={{
            width: isOpen ? 300 : 90,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isOpen ? 300 : 90,
              bgcolor: "#1e1b3a",
              color: "white",
              transition: "width 0.3s ease",
              overflowX: "hidden",
              padding: 0,
            },
          }}>
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

const MobileSidebar = ({ selectedIndex, onChange }) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
        p: 0,
        paddingBottom: "env(safe-area-inset-bottom)",
        backdropFilter: "none",
        height: "10vh",
      }}
      elevation={3}>
      <BottomNavigation
        showLabels
        value={selectedIndex}
        onChange={(e, newValue) => onChange(newValue)}
        sx={{ bgcolor: "#1e1b3a", color: "white", height: "100%" }}>
        {menuItemsMobile.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.label}
            icon={item.icon}
            sx={{
              color: selectedIndex === index ? "white" : "#aaa",
              "&.Mui-selected": {
                color: "white",
                fontSize: "10px",
              },
              "& .MuiBottomNavigationAction-label": {
                fontSize: "10px", // chỉnh font size label ở đây
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
