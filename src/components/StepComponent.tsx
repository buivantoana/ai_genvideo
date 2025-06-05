import React from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const linkStep = ['idea','script','create-image',"create-video",'narrator']
const StepComponent = ({ steps = [] }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const navigate = useNavigate()
  return (
    <Box
      display='flex'
      alignItems={{ xs: "start", md: "center" }}
      justifyContent={"center"}
      mb={2}
      mt={{ xs: 2, md: 0 }}
      bgcolor='#0D0C2B'
      sx={{cursor:"pointer"}}
      width={"100%"}>
      {steps.map((step, index) => (
        <Box key={index} display='flex' alignItems='top'>
          <Box
            onClick={step.status === "completed"? ()=>navigate(`/${linkStep[index]}?id=${id}`) :undefined}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}>
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
                height: { xs: 11, md: 22 },
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
