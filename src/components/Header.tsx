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
import { useState } from "react";

const menuItems = [
  { icon: <AddBox />, label: "Tạo dự án" },
  { icon: <ListAlt />, label: "Danh sách dự án" },
  { icon: <RecordVoiceOver />, label: "Cấu hình giọng nói" },
  { icon: <Settings />, label: "Cài đặt tài khoản" },
];

const Sidebar = ({ isOpen, onToggle }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // dưới 600px

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    if (isMobile) setMobileOpen(false); // auto đóng drawer trên mobile
  };
  const handleMenuChange = (index) => {
    setSelectedIndex(index);
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
              onClick={() => handleListItemClick(index)}
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

const menuItemsMobile = [
  { icon: <AddBox />, label: "Tạo dự án" },
  { icon: <ListAlt />, label: "Dự án" },
  { icon: <RecordVoiceOver />, label: " Giọng nói" },
  { icon: <Settings />, label: "Tài khoản" },
];
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
      }}
      elevation={3}>
      <BottomNavigation
        showLabels
        value={selectedIndex}
        onChange={(e, newValue) => onChange(newValue)}
        sx={{ bgcolor: "#1e1b3a", color: "white", py: 0.5 }}>
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
