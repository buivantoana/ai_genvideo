import React from "react";
import { Box, Typography } from "@mui/material";

const steps = [
  { label: "Ý tưởng", status: "completed" },
  { label: "Tạo kịch bản", status: "active" },
  { label: "Tạo ảnh", status: "pending" },
  { label: "Tạo Video", status: "pending" },
  { label: "Voice", status: "pending" },
];

const StepComponent = () => {
  return (
    <Box
      display='flex'
      alignItems={{ xs: "start", md: "center" }}
      justifyContent={"center"}
      mb={2}
      mt={{ xs: 2, md: 0 }}
      bgcolor='#0D0C2B'
      width={"100%"}>
      {steps.map((step, index) => (
        <Box key={index} display='flex' alignItems='top'>
          {/* Step Box + Label */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}>
            {/* Step Box */}
            <Box
              sx={{
                width: { xs: 22, md: 44 },
                height: { xs: 22, md: 44 },
                borderRadius: "8px",
                background:
                  step.status === "completed"
                    ? "#00CE7C"
                    : step.status === "active"
                    ? "linear-gradient(135deg, #6E00FF 0%, #9D00FF 100%)"
                    : "#1A1B3A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",

                boxShadow:
                  step.status === "completed"
                    ? "0px 0px 0px 5px rgba(0, 206, 124, 0.2)"
                    : step.status === "active"
                    ? "0px 0px 0px 8px rgba(157, 0, 255, 0.2)"
                    : "none",
              }}>
              <Typography sx={{ fontSize: 16 }}>
                {step.status === "completed" ? "✓" : index + 1}
              </Typography>
            </Box>

            {/* Label */}
            <Typography
              sx={{
                color:
                  step.status === "completed"
                    ? "#00CE7C"
                    : step.status === "active"
                    ? "#FFFFFF"
                    : "#8F91A5",
                fontWeight: step.status === "active" ? 600 : 400,
                fontSize: { xs: 10, md: 13 },
              }}>
              {step.label}
            </Typography>
          </Box>

          {/* Line */}
          {index < steps.length - 1 && (
            <Box
              sx={{
                width: { xs: 22, md: 60 },
                height: 11,
                mx: { xs: 1, md: 2 },
                borderBottom:
                  steps[index + 1].status === "pending"
                    ? "2.3px dashed #4A4C6B"
                    : "2.3px solid #00CE7C",
              }}
            />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StepComponent;
