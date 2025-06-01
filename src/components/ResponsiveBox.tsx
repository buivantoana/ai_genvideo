import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const ResponsiveBox = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            sx={{
              bgcolor: i === 0 ? "#2A274B" : "transparent",
              px: { xs: 1, sm: 4 },
              py: { xs: 1.5, sm: 2 },
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
              justifyContent: isMobile ? "start" : "center",
              minWidth: { xs: "100%", sm: 150 },
              // border: i !== 0 ? "1px solid #444" : "none",
            }}>
            <Box
              sx={{
                width: 22,
                height: 22,
                bgcolor: i === 0 ? "#fff" : "#A6A6C2",
                borderRadius: 0.5,
              }}
            />
            <Typography
              sx={{
                fontSize: { xs: 14, sm: 16 },
                color: i === 0 ? "#fff" : "#A6A6C2",
                fontWeight: 600,
              }}>
              {["Tạo video img - img", "Tạo video img - video", "Kiểu 04"][i]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ResponsiveBox;
