import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
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

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    // Bạn có thể điều hướng hoặc thực hiện hành động ở đây
  };
  return (
    <Drawer
      variant='permanent'
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
              <img width={129} height={36} src={icon1} />
            </Box>
          )}
          <IconButton onClick={onToggle} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <Tooltip
              key={index}
              title={isOpen ? "" : item.label}
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
                {isOpen && (
                  <ListItemText
                    sx={{
                      span: {
                        fontWeight:
                          selectedIndex === index ? "500 !important" : "100",
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
    </Drawer>
  );
};

export default Sidebar;
