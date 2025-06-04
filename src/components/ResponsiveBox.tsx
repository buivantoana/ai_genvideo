import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

/**
 * @param {Object} props
 * @param {Array<string>} props.tabs - Danh sách các tab
 * @param {number} props.selectedTab - Chỉ số tab đang chọn
 * @param {(index: number) => void} props.onTabChange - Hàm gọi khi chọn tab mới
 */
const ResponsiveBox = ({ selectedTab = 0, onTabChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tabs = ["Tạo video img - img", "Tạo video img - video"];
  return (
    <Box display='flex' justifyContent='center' px={{ xs: 1, sm: 0 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          bgcolor: "#1A1836",
          width: "max-content",
          w: "100%",
          p: { xs: 2, sm: 1.5 },
          borderRadius: 2,
          gap: 2,
          justifyContent: { xs: "center", sm: "flex-start" },
        }}>
        {tabs.map((label, i) => {
          const isActive = selectedTab === i;
          return (
            <Box
              key={i}
              onClick={() => onTabChange(i)}
              sx={{
                cursor: "pointer",
                bgcolor: isActive ? "#2A274B" : "transparent",
                px: { xs: 1, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: isMobile ? "start" : "center",
                minWidth: { xs: "100%", sm: 150 },
                transition: "0.3s",
                "&:hover": {
                  bgcolor: isActive ? "#2A274B" : "#2A274B44",
                },
              }}>
              <Box
                sx={{
                  width: 22,
                  height: 22,
                  bgcolor: isActive ? "#fff" : "#A6A6C2",
                  borderRadius: 0.5,
                }}
              />
              <Typography
                sx={{
                  fontSize: { xs: 14, sm: 16 },
                  color: isActive ? "#fff" : "#A6A6C2",
                  fontWeight: 600,
                }}>
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ResponsiveBox;
